import { getSession } from "@/lib/action";
import Links from "./links/Links";
import styles from "./navbar.module.css";

const Navbar = async () => {
  const session = await getSession();

  return (
    <div className={styles.container}>
      <div className={styles.logo}>REST-aurant</div>
      <Links session={session} />
    </div>
  );
};

export default Navbar;
