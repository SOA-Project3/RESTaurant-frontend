import Link from "next/link";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";

const Links = () => {
  const links = [
    {
      title: "Inicio",
      path: "/",
    },
    {
      title: "Recomendaciones",
      path: "/recommendations",
    },
    {
      title: "Reservas",
      path: "/reservations",
    },
    {
      title: "Comentarios",
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
