import { getSession } from "@/lib/action";
import { redirect } from "next/navigation";
import { deleteAccount } from "@/lib/action";
import styles from "./profile.module.css";
import UpdatePwdForm from "@/components/updatePwdForm/updatePwdForm";

const page = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }

  return (
    <div>
      <p className={styles.title}>
        Welcome, <b>{session.name}</b>!
      </p>
      <span>
        You are a<b>{session.isAdmin ? "n admin" : " regular"}</b> user
      </span>
      <UpdatePwdForm />
      <form className={styles.form} action={deleteAccount}>
        <button className={styles.deleteBtn}>Delete account</button>
      </form>
    </div>
  );
};

export default page;
