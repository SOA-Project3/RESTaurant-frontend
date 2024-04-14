import Links from "./links/Links";
import styles from "./navbar.module.css";
const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>REST-aurant</div>
      <Links />
    </div>
  );
};

export default Navbar;
