"use server";

import { revalidatePath } from "next/cache";
import { postRegister, postLogin } from "@/services";
import bcrypt from "bcryptjs";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
    const session = await getIronSession(cookies(), sessionOptions);
    const { email, password } = Object.fromEntries(formData);
    console.log("Logging in user: ", email, password);
    const user = await postLogin(email, password);
    console.log(user);

    // set session properties
    session.userId = user.id;
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
  if (password !== passwordRepeat) return { error: "Passwords do not match!" };

  try {
    console.log("Registering user: ", name, email, password);
    await postRegister(name, email, password, "User");
    console.log("User registered successfully...");
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: err.toString() };
  }
};

export const handleLogout = async () => {
  //TODO
  console.log("logout");
};

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
