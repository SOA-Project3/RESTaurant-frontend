"use server";

import { revalidatePath } from "next/cache";
import { postRegister } from "@/services";
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
    const hashedPassword = await encryptPassword(password);
    console.log(email, hashedPassword);
  } catch (err) {
    console.log(err);

    if (err.message.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};

export const registerUser = async (previousState, formData) => {
  const { name, email, password, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    const hashedPassword = await encryptPassword(password);
    console.log("Registering user: ", name, email, hashedPassword);
    await postRegister(name, email, hashedPassword, "User");
    console.log("User registered successfully...");
    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "An error ocurred, please try again later..." };
  }
};

export const handleLogout = async () => {
  //TODO
  console.log("lougout");
};

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}
