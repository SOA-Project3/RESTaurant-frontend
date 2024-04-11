"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./recommendations.module.css";
const basePath = process.env.basePath;

const Recommendations = () => {
  const [isSending, setIsSending] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [response, setResponse] = useState("");

  const btnTitle = isSending ? "Sending..." : "Send";

  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src={`${basePath}/pizza.svg`}
          alt=""
          fill
          className={styles.img}
        />
      </div>
      <div className={styles.formContainer}>
        <div className={styles.titleContainer}>
          Choose one or two items to receive a recommendation.
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          {!isDisabled && <button type="submit">{btnTitle}</button>}
        </form>
        {!!response && (
          <div className={styles.responseContainer}>{response}</div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
