"use client";

import { registerUser } from "@/lib/action";
import styles from "./registerForm.module.css";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
  const [state, formAction] = useFormState(registerUser, undefined);

  const router = useRouter();

  useEffect(() => {
    state?.success && router.push("/login");
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
      {state?.error}
      <Link href="/login">
        Already have an account? <b>Login</b>
      </Link>
    </form>
  );
};

export default RegisterForm;
