"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./feedback.module.css";
import { postFeedback } from "@/services";
const basePath = process.env.basePath;

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [response, setResponse] = useState("");

  const btnTitle = isSending ? "Sending..." : "Send";

  const handleInputChange = (event) => {
    setFeedback(event.target.value);
    setIsDisabled(event.target.value.length == 0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submit action (page reload)
    setIsSending(true);
    try {
      const result = await postFeedback(feedback);
      setResponse(result);
    } catch (error) {
      console.error(error);
      setResponse("An error occurred. Please try again later.");

      // Handle error (e.g., show an error message)
    }
    setIsSending(false);
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
          {!isDisabled && <button type="submit">{btnTitle}</button>}
        </form>
        {!!response && (
          <div className={styles.responseContainer}>{response}</div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
