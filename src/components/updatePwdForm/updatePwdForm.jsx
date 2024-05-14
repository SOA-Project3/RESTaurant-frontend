"use client";
import { useFormState } from "react-dom";
import { updatePassword } from "@/lib/action";
import styles from "./updatePwdForm.module.css";
import { useState, useEffect } from "react";

const UpdatePwdForm = () => {
  const [state, formAction] = useFormState(updatePassword, undefined);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!!state?.success) setSuccess(true);
  }, [state]);

  return (
    <>
      <form className={styles.form} action={formAction}>
        <input
          className={styles.input}
          type="password"
          name="oldPassword"
          placeholder="Type old password"
        />
        <input
          className={styles.input}
          type="password"
          name="newPassword"
          placeholder="Type new password"
        />
        <button className={styles.updateBtn}>Update password</button>
      </form>
      {<p className={styles.error}>{state?.error}</p>}
      {!!success && <p>Password updated successfully!</p>}
    </>
  );
};

export default UpdatePwdForm;
