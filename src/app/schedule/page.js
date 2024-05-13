"use client";
import { useAppContext } from "@/context";
import { useEffect, useState } from "react";
import { getAvailableSchedules, getBookedSchedules, deleteScheduleSlot } from "@/services";
import ScheduleDelBooked from "@/components/scheduleDelBooked/ScheduleDelBooked";
import ScheduleDelAvailable from "@/components/scheduleDelAvailable/ScheduleDelAvailable";
import ScheduleForm from "@/components/scheduleForm/ScheduleForm";
import styles from "./schedule.module.css";
const basePath = process.env.basePath;
import Image from "next/image";


const Schedule = () => {
  const [scheduleAvailableData, setScheduleAvailableData] = useState(null);
  const [scheduleBookedData, setScheduleBookedData] = useState(null);
  const { showAlert } = useAppContext();

  const handleAddAppointment = (newAppointment) => {
    setScheduleAvailableData([...scheduleAvailableData, newAppointment]);
  };

  const handleDeleteAppointment = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this appointment?");
    if (isConfirmed) {
      try {
        await deleteScheduleSlot(id);
        console.log("Booked appointment with ID:", id, "deleted successfully.");
      } catch (error) {
        console.error("Failed to delete booked appointment with ID:", id, error);
      }
    }
  };
  

  const handleDeleteBookedAppointment = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this appointment?");
    if (isConfirmed) {
      try {
        await deleteScheduleSlot(id);
        console.log("Booked appointment with ID:", id, "deleted successfully.");
      } catch (error) {
        console.error("Failed to delete booked appointment with ID:", id, error);
      }
    }
  };
  
  useEffect(() => {
    const fetchScheduleAvailable = async () => {
      try {
        const data = await getAvailableSchedules();
        setScheduleAvailableData(data); // Update state with fetched data
      } catch (error) {
        console.error("Available Schedule fetch error:", error.message);
      }
    };

    const fetchScheduleBooked = async () => {
      try {
        const data = await getBookedSchedules();
        setScheduleBookedData(data); // Update state with fetched data
      } catch (error) {
        console.error("Booked Schedule fetch error:", error.message);
      }
    }

    fetchScheduleAvailable();
    fetchScheduleBooked();
  }, []);

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
            <ScheduleDelBooked appointments={scheduleBookedData} onDelete={handleDeleteBookedAppointment} />
          </div>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.scheduleContainer}>
          <h2>Available Slots</h2>
          <div className={styles.scrollableContainer}>
            <ScheduleDelAvailable appointments={scheduleAvailableData} onDelete={handleDeleteAppointment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
