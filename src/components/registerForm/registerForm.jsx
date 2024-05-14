"use client";

import styles from "./registerForm.module.css";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = ({ registerAction, redirect }) => {
  const [state, formAction] = useFormState(registerAction, undefined);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (state?.success && !!redirect) router.push("/login");
    if (state?.success) setShowSuccess(true);
  }, [state?.success, router]);

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="Name" name="name" />
      <input type="email" placeholder="Email" name="email" />
      <input type="password" placeholder="Password" name="password" />
      <input
        type="password"
        placeholder="Repeat password"
        name="passwordRepeat"
      />
      <button>Register</button>
      {<p className={styles.error}>{state?.error}</p>}
      {!!showSuccess && <p>New account registered successfully</p>}
    </form>
  );
};

export default RegisterForm;
