import React from "react";
import Image from "next/image";
import styles from "./reservations.module.css";
import { getSession } from "@/lib/action";
import ReservationForm from "@/components/reservationForm/reservationForm";
import { redirect } from "next/navigation";

const Reservations = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src={"/timer.svg"} alt="" fill className={styles.img} />
      </div>
      <ReservationForm />
    </div>
  );
};

export default Reservations;
