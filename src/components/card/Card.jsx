import React from "react";
import styles from "./card.module.css";

const Card = ({ title, description, footer }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>{title}</div>
      <div className={styles.cardBody}>{description}</div>
      <div className={styles.cardFooter}>{footer}</div>
    </div>
  );
};

export default Card;
