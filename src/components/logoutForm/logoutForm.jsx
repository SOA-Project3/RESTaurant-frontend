import styles from "./logoutForm.module.css";
const LogoutForm = () => {
  return (
    <form>
      <button className={styles.logout}>Logout</button>
    </form>
  );
};

export default LogoutForm;
