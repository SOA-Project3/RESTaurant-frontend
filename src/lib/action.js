"use server";

import {
  postRegister,
  getUser,
  resetPassword,
  deleteUser,
  setPassword,
} from "@/services";
import bcrypt from "bcryptjs";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

// set session options to be saved in cookies
const sessionOptions = {
  password: process.env.SECRET_KEY,
  cookieName: "rest-aurant-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};

/**
 * return user session saved in cookies
 * @returns {Object}
 */
export const getSession = async () => {
  const session = await getIronSession(cookies(), sessionOptions);
  if (Object.keys(session).length === 0) return { isLoggedIn: false };
  return { ...session, isLoggedIn: true };
};

/**
 * Create new user session if credentials are valid
 * @param {*} prevState
 * @param {Object} formData
 * @returns
 */
export const login = async (prevState, formData) => {
  try {
    // get form data
    const { email, password } = Object.fromEntries(formData);

    // form inputs validation
    if (!email) return { error: "Email is required!" };
    if (!password) return { error: "Password is required!" };

    // get user data by email
    const user = await getUser(email);

    // compare password with hashed
    const isPasswordCorrect = await bcrypt.compare(password, user.Password);

    // validate password
    if (!isPasswordCorrect) return { error: "Incorrect password" };

    // get current session
    const session = await getIronSession(cookies(), sessionOptions);

    // set session properties
    session.userId = user.Id;
    session.name = user.Fullname;
    session.password = user.Password;
    session.isLoggedIn = true;
    session.isAdmin = user.Rol === "Admin";

    // save new session
    await session.save();
  } catch (err) {
    console.log(err);
    return { error: err.toString() };
  }
};

/**
 * Register new user
 * @param {*} previousState
 * @param {Object} formData
 * @returns
 */
export const registerUser = async (previousState, formData) => {
  // get form data
  const { name, email, password, passwordRepeat } =
    Object.fromEntries(formData);

  // form validations
  if (!name) return { error: "Name is required!" };
  if (!email) return { error: "Email is required!" };
  if (!password) return { error: "Password is required!" };
  if (password !== passwordRepeat) return { error: "Passwords do not match!" };

  try {
    //encrypt password
    const hashedPassword = await encryptPassword(password);

    // register new user
    console.log("Registering user: ", name, email, hashedPassword);
    await postRegister(name, email, hashedPassword, "User");
    console.log("User registered successfully...");

    return { success: true };
  } catch (err) {
    console.log(err);
    // show error in UI
    return { error: err.toString() };
  }
};

/**
 * Register new admin user
 * @param {*} previousState
 * @param {Object} formData
 * @returns
 */
export const registerAdmin = async (previousState, formData) => {
  // get form data
  const { name, email, password, passwordRepeat } =
    Object.fromEntries(formData);

  // form validations
  if (!name) return { error: "Name is required!" };
  if (!email) return { error: "Email is required!" };
  if (!password) return { error: "Password is required!" };
  if (password !== passwordRepeat) return { error: "Passwords do not match!" };

  try {
    //encrypt password
    const hashedPassword = await encryptPassword(password);

    // register new user
    console.log("Registering admin: ", name, email, hashedPassword);
    await postRegister(name, email, hashedPassword, "Admin");
    console.log("Admin registered successfully...");

    return { success: true };
  } catch (err) {
    console.log(err);
    // show error in UI
    return { error: err.toString() };
  }
};

/**
 * Destroy session to logout user
 */
export const handleLogout = async () => {
  const session = await getIronSession(cookies(), sessionOptions);
  session.destroy();
};

/**
 * Encrypt password using hash algorithm with salt
 * @param {string} password
 * @returns
 */
async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}

/**
 * Triggers password recovery function that sends an email with temp password
 */
export const handleForgot = async (previousState, formData) => {
  // get form data
  const { email } = Object.fromEntries(formData);

  // email validation
  if (!email) return { error: "Email is required!" };
  try {
    // create new password and send it via email
    await resetPassword(email);

    return { success: true };
  } catch (err) {
    console.log(err);
    // show error in UI
    return { error: err.toString() };
  }
};

/**
 * Set new password
 * @param {*} previousState
 * @param {*} formData
 * @returns
 */
export const updatePassword = async (previousState, formData) => {
  // get form data
  const { oldPassword, newPassword } = Object.fromEntries(formData);

  // form validations
  if (!oldPassword) return { error: "Old password is required!" };
  if (!newPassword) return { error: "New password is required!" };

  try {
    //get current session
    const session = await getIronSession(cookies(), sessionOptions);

    // compare password with hashed
    const isPasswordCorrect = await bcrypt.compare(
      oldPassword,
      session.password
    );

    if (!isPasswordCorrect) return { error: "Incorrect password" };

    //encrypt password
    const hashedPassword = await encryptPassword(newPassword);

    // update user's password
    await setPassword(session.userId, hashedPassword);

    //update session password
    session.password = hashedPassword;
    await session.save();

    return { success: true };
  } catch (err) {
    console.log(err);
    // show error in UI
    return { error: err.toString() };
  }
};

/**
 * Delete the user's account
 */
export const deleteAccount = async () => {
  try {
    // get user email
    const session = await getIronSession(cookies(), sessionOptions);
    const email = session.userId;

    try {
      // delete account service
      await deleteUser(email);

      // remove session
      session.destroy();
      return { success: true };
    } catch (err) {
      console.log(err);
      // show error in UI
      return { error: err.toString() };
    }
  } catch (error) {}
};
