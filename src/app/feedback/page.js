"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./feedback.module.css";
const basePath = process.env.basePath;

const Feedback = () => {
  const [feedback, setFeedback] = useState("");

  const handleInputChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submit action (page reload)
    console.log(feedback); // Logs the current value of the feedback state to the console
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image
          src={`${basePath}/pizza.png`}
          alt=""
          fill
          className={styles.img}
        />
      </div>
      <div className={styles.formContainer}>
        <div className={styles.titleContainer}>How was your food?</div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <textarea
            name="comment"
            id="comment"
            cols="30"
            rows="3"
            placeholder="Tell us about your experience..."
            value={feedback}
            onChange={handleInputChange}
          ></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Feedback;
