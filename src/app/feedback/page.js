import React from "react";
import Image from "next/image";
import styles from "./feedback.module.css";
import FeedbackForm from "@/components/feedbackForm/feedbackForm";
const basePath = process.env.basePath;
import { redirect } from "next/navigation";
import { getSession } from "@/lib/action";

const Feedback = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }
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
      <FeedbackForm />
    </div>
  );
};

export default Feedback;
