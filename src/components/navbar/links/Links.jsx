import Link from "next/link";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import LogoutForm from "@/components/logoutForm/logoutForm";

const Links = ({ session }) => {
  const defaultLinks = [
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
  ];

  const loggedInLinks = [
    {
      title: "Reservations",
      path: "/reservations",
    },
  ];

  const adminLinks = [
    {
      title: "Schedule",
      path: "/schedule",
    },
  ];

  return (
    <div className={styles.links}>
      {defaultLinks.map((link) => (
        <NavLink item={link} key={link.title} />
      ))}
      {session?.isLoggedIn ? (
        <>
          {!session.isAdmin &&
            loggedInLinks.map((link) => (
              <NavLink item={link} key={link.title} />
            ))}
          {session.isAdmin &&
            adminLinks.map((link) => <NavLink item={link} key={link.title} />)}
          <NavLink item={{ title: "Profile", path: "/profile" }} />
          <LogoutForm />
        </>
      ) : (
        <NavLink item={{ title: "Login", path: "/login" }} />
      )}
    </div>
  );
};

export default Links;
