"use server";

import { revalidatePath } from "next/cache";
import { postRegister, getUser } from "@/services";
import bcrypt from "bcryptjs";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

const sessionOptions = {
  password: process.env.SECRET_KEY,
  cookieName: "rest-aurant-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};

export const getSession = async () => {
  const session = await getIronSession(cookies(), sessionOptions);
  if (Object.keys(session).length === 0) return { isLoggedIn: false };
  return { ...session, isLoggedIn: true };
};

export const login = async (prevState, formData) => {
  try {
    const { email, password } = Object.fromEntries(formData);

    if (!email) return { error: "Email is required!" };
    if (!password) return { error: "Password is required!" };

    const session = await getIronSession(cookies(), sessionOptions);
    console.log("Logging in user: ", email, password);
    const user = await getUser(email);

    const isPasswordCorrect = await bcrypt.compare(password, user.Password);

    if (!isPasswordCorrect) return { error: "Incorrect password" };
    console.log(user);

    // set session properties
    session.userId = user.id;
    session.name = user.name;
    session.isLoggedIn = true;
    await session.save();
  } catch (err) {
    console.log(err);
    return { error: err.toString() };
  }
};

export const registerUser = async (previousState, formData) => {
  const { name, email, password, passwordRepeat } =
    Object.fromEntries(formData);

  if (!name) return { error: "Name is required!" };
  if (!email) return { error: "Email is required!" };
  if (!password) return { error: "Password is required!" };
  if (password !== passwordRepeat) return { error: "Passwords do not match!" };

  try {
    const hashedPassword = await encryptPassword(password);
    console.log("Registering user: ", name, email, hashedPassword);
    await postRegister(name, email, hashedPassword, "User");
    console.log("User registered successfully...");
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: err.toString() };
  }
};

export const handleLogout = async () => {
  //TODO
  const session = await getIronSession(cookies(), sessionOptions);
  session.destroy();
};

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
