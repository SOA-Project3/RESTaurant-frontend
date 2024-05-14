import styles from "./new-admins.module.css";
import { registerAdmin } from "@/lib/action";
import RegisterForm from "@/components/registerForm/registerForm";
import { getSession } from "@/lib/action";
import { redirect } from "next/navigation";

const NewAdmins = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.title}>Create a new admin account:</p>
        <RegisterForm registerAction={registerAdmin} redirect={false} />
      </div>
    </div>
  );
};

export default NewAdmins;
