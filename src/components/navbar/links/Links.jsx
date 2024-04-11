import Link from "next/link";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";

const Links = () => {
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
  ];

  return (
    <div className={styles.links}>
      {links.map((link) => (
        <NavLink item={link} key={link.title} />
      ))}
    </div>
  );
};

export default Links;
