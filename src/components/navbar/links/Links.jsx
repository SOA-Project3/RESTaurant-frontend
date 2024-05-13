import Link from "next/link";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import { handleLogout } from "@/lib/action";

const Links = ({ session }) => {
  const links = [
    {
      title: "Meals",
      path: "/",
    },
    {
      title: "Drinks",
      path: "/drinks",
    },
    {
      title: "Desserts",
      path: "/desserts",
    },
    {
      title: "Recomendations",
      path: "/recommendations",
    },
    {
      title: "Reservations",
      path: "/reservations",
    },
    {
      title: "Give Feedback",
      path: "/feedback",
    },
    {
      title: "Schedule",
      path: "/schedule",
    },
  ];

  return (
    <div className={styles.links}>
      {links.map((link) => (
        <NavLink item={link} key={link.title} />
      ))}
      {session?.user ? (
        <>
          {session.user?.isAdmin && (
            <NavLink item={{ title: "Admin", path: "/admin" }} />
          )}
          <form action={handleLogout}>
            <button className={styles.logout}>Logout</button>
          </form>
        </>
      ) : (
        <NavLink item={{ title: "Login", path: "/login" }} />
      )}
    </div>
  );
};

export default Links;
