"use client";
import { useAppContext } from "@/context";
import { useEffect, useState } from "react";
import {
  getAvailableSchedules,
  getBookedSchedules,
  deleteScheduleSlot,
  createScheduleSlot,
} from "@/services";
import ScheduleDelBooked from "@/components/scheduleDelBooked/ScheduleDelBooked";
import ScheduleDelAvailable from "@/components/scheduleDelAvailable/ScheduleDelAvailable";
import ScheduleForm from "@/components/scheduleForm/ScheduleForm";
import styles from "./schedule.module.css";

const Schedule = () => {
  const [scheduleAvailableData, setScheduleAvailableData] = useState(null);
  const [scheduleBookedData, setScheduleBookedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const availableData = await getAvailableSchedules();
        const bookedData = await getBookedSchedules();
        setScheduleAvailableData(availableData);
        setScheduleBookedData(bookedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching schedule data:", error.message);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddAppointment = async (date, time) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to add this available slot?"
    );
    if (isConfirmed) {
      try {
        const datetime = `${date.toISOString().slice(0, 10)}T${time}:00`;
        await createScheduleSlot(datetime);
        console.log("Appointment added successfully.");
        setTimeout(async () => {
          const updateAvailableData = await getAvailableSchedules();
          const updateBookedData = await getBookedSchedules();
          setScheduleAvailableData(updateAvailableData);
          setScheduleBookedData(updateBookedData);
        }, 6000);
      } catch (error) {
        console.error("Failed to add appointment:", error);
      }
    }
  };
  
  const handleDeleteAppointment = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this available slot?"
    );
    if (isConfirmed) {
      try {
        await deleteScheduleSlot(id);
        console.log("Available slot with ID:", id, "deleted successfully.");
        setTimeout(async () => {
          const updateAvailableData = await getAvailableSchedules();
          const updateBookedData = await getBookedSchedules();
          setScheduleAvailableData(updateAvailableData);
          setScheduleBookedData(updateBookedData);
        }, 6000); 
      } catch (error) {
        console.error("Failed to delete available slot with ID:", id, error);
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
  if (!scheduleAvailableData || !scheduleBookedData) return null;

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <ScheduleForm onSubmit={handleAddAppointment} />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.scheduleContainer}>
          <h2>Booked Slots</h2>
          <div className={styles.scrollableContainer}>
            <ScheduleDelBooked
              appointments={scheduleBookedData}
              onDelete={handleDeleteAppointment}
            />
          </div>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.scheduleContainer}>
          <h2>Available Slots</h2>
          <div className={styles.scrollableContainer}>
            <ScheduleDelAvailable
              appointments={scheduleAvailableData}
              onDelete={handleDeleteAppointment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
