import Links from "./links/Links";
import styles from "./navbar.module.css";
const Navbar = () => {
  const links = [
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
    <div className={styles.container}>
      <div className={styles.logo}>Logo</div>
      <Links />
    </div>
  );
};

export default Navbar;
