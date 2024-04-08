import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>CE-5505</div>
      <div className={styles.text}>II Semestre - 2024</div>
    </div>
  );
};

export default Footer;
