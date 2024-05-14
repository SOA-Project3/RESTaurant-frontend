"use client";

import { login } from "@/lib/action";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import Link from "next/link";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="Email" name="email" />
      <input type="password" placeholder="Password" name="password" />
      <div className={styles.forgotWrapper}>
        <Link className={styles.forgot} href="/forgot">
          Forgot your password?
        </Link>
      </div>
      <button>Login</button>
      {<p className={styles.error}>{state?.error}</p>}
      <Link href="/register">
        {"Don't have an account?"} <b>Register</b>
      </Link>
    </form>
  );
};

export default LoginForm;
