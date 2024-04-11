"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./reservations.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const basePath = process.env.basePath;
import { getReservation } from "@/services";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Reservations = () => {
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [response, setResponse] = useState("");

  const handleResponse = (res) => {
    if (!res.available) setResponse(`${res.message}: ${res.time}`);
    else setResponse(res.message);
  };

  useEffect(() => {
    if (!!day && !!hour) setIsDisabled(false);
  }, [date]);

  const btnTitle = isSending ? "Sending..." : "Send";

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    try {
      const result = await getReservation(day, hour);
      handleResponse(result);
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show an error message)
    }
    setIsSending(false);
  };

  const handleDateChange = (date) => {
    setDate(date);
    setDay(days[date.getDay()]);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`;
    setHour(time);
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
          Do you want to make a reservation?
        </div>
        <DatePicker
          selected={date}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat="Pp"
        />
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

export default Reservations;
