"use server";

import {
  postRegister,
  postLogin,
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

    // login user
    const res = await postLogin(email, password);
    if (res.error) return { error: res.error };
    console.log(res);

    // get current session
    const session = await getIronSession(cookies(), sessionOptions);

    // set session properties
    session.userId = res.user.UserId;
    session.name = res.user.Fullname;
    session.isLoggedIn = true;
    session.isAdmin = res.user.Rol === "Admin";
    session.branch = res.user.BranchId;
    session.jwt = res.jwt;

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
    // register new user
    console.log("Registering user: ", name, email, password);
    await postRegister(name, email, password, "User");
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
    // register new user
    console.log("Registering admin: ", name, email, password);
    await postRegister(name, email, password, "Admin");
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
    const jwt = session.jwt;

    try {
      // delete account service
      await deleteUser(email, jwt);

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
