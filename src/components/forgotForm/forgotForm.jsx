"use client";
import styles from "./forgotForm.module.css";
import { handleForgot } from "@/lib/action";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { redirect } from "next/navigation";

const ForgotForm = () => {
  const [state, formAction] = useFormState(handleForgot, undefined);

  useEffect(() => {
    if (!!state?.success) redirect("/login");
  }, [state]);

  return (
    <form className={styles.form} action={formAction}>
      <input type="text" placeholder="Type your email" name="email" />
      {<p className={styles.error}>{state?.error}</p>}
      <button>Send email</button>
    </form>
  );
};

export default ForgotForm;
