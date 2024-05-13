import { handleLogout } from "@/lib/action";
import styles from "./logoutForm.module.css";

const LogoutForm = () => {
  return (
    <form action={handleLogout}>
      <button className={styles.logout}>Logout</button>
    </form>
  );
};

export default LogoutForm;
