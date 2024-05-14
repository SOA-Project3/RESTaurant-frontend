"use client";
import { getSession } from "@/lib/action";
import { useEffect, useState } from "react";
import {
  getAvailableSchedules,
  getUserSchedules,
  cancelScheduleSlot,
  bookScheduleSlot,
  updateScheduleSlotQuantity,
} from "@/services";
import ScheduleBook from "@/components/scheduleBook/ScheduleBook";
import ScheduleCancel from "@/components/scheduleCancel/ScheduleCancel";
import styles from "./reservations.module.css";

const Reservations = () => {
  const [session, setSession] = useState(null);
  const [scheduleBookData, setScheduleBookData] = useState(null);
  const [scheduleCancelData, setScheduleCancelData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get current user session
        const sess = await getSession();
        setSession(sess); //set state to handle session

        const bookData = await getAvailableSchedules();
        const cancelData = await getUserSchedules(sess.userId);
        setScheduleBookData(bookData);
        setScheduleCancelData(cancelData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching schedule data:", error.message);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();;
  }, []);

  const handleBookAppointment = async (id) => {
    try {
      const peopleQuantity = parseInt(
        prompt("Please enter the number of people for the reservation:", "1"),
        10
      );
  
      if (isNaN(peopleQuantity) || peopleQuantity <= 0) {
        alert("Please enter a valid number of people.");
        return;
      }
  
      const isConfirmed = window.confirm(
        "Are you sure you want to book this reservation?"
      );
  
      if (isConfirmed) {
        await bookScheduleSlot(session.userId, id, peopleQuantity);
        console.log("Booked reservation with ID:", id);
        setTimeout(async () => {
          const updatedBookData = await getAvailableSchedules();
          const updatedCancelData = await getUserSchedules(session.userId);
          setScheduleBookData(updatedBookData);
          setScheduleCancelData(updatedCancelData);
        }, 2000); // 2 seconds delay
      }
    } catch (error) {
      console.error("Failed to book reservation with ID:", id, error);
    }
  };
  
  const handleEditAppointment = async (id, userid) => {
    try {
      const newQuantity = parseInt(
        prompt("Please enter the new quantity for the appointment:", "1"),
        10
      );
  
      if (isNaN(newQuantity) || newQuantity <= 0) {
        alert("Please enter a valid number for the new quantity.");
        return;
      }
  
      const isConfirmed = window.confirm(
        "Are you sure you want to update the quantity for this appointment?"
      );
  
      if (isConfirmed) {
        await updateScheduleSlotQuantity(id, newQuantity, userid);
        console.log("Appointment with ID:", id, "updated successfully.");
        setTimeout(async () => {
          const updatedBookData = await getAvailableSchedules();
          const updatedCancelData = await getUserSchedules(session.userId);
          setScheduleBookData(updatedBookData);
          setScheduleCancelData(updatedCancelData);
        }, 2000); // 2 seconds delay
      }
    } catch (error) {
      console.error("Failed to update appointment with ID:", id, error);
    }
  };
  
  const handleCancelAppointment = async (id, userid) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel this reservation?"
    );
    if (isConfirmed) {
      try {
        await cancelScheduleSlot(id, userid);
        console.log(
          "Booked reservation with ID:",
          id,
          "and user ID:",
          userid,
          "cancelled successfully."
        );
        setTimeout(async () => {
          const updatedBookData = await getAvailableSchedules();
          const updatedCancelData = await getUserSchedules(session.userId);
          setScheduleBookData(updatedBookData);
          setScheduleCancelData(updatedCancelData);
        }, 2000); // 2 seconds delay
      } catch (error) {
        console.error("Failed to cancel booked reservation with ID:", id, error);
      }
    }
  };
  

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    fetchData();
  };

  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (error)
    return (
      <div>
        Error: {error}
        <button onClick={handleRetry}>Retry</button>
      </div>
    );
  if (!scheduleBookData || !scheduleCancelData) return null;

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <div className={styles.scheduleContainer}>
          <h2>Available Slots</h2>
          <div className={styles.scrollableContainer}>
            <ScheduleBook
              appointments={scheduleBookData}
              onBook={handleBookAppointment}
            />
          </div>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.scheduleContainer}>
          <h2>Reserved Slots</h2>
          <div className={styles.scrollableContainer}>
            <ScheduleCancel
              appointments={scheduleCancelData}
              onCancel={handleCancelAppointment}
              onEdit={handleEditAppointment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
