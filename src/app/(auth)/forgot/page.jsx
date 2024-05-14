import ForgotForm from "@/components/forgotForm/forgotForm";

import styles from "./forgot.module.css";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/action";

const ForgotPassword = async () => {
  const session = await getSession();

  if (session.isLoggedIn) {
    redirect("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          Type your account email to recover your password:
        </div>
        <ForgotForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
