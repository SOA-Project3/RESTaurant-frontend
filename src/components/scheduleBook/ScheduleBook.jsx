import styles from "./scheduleBook.module.css";

const ScheduleBook = ({ appointments, onBook }) => {
  const handleBook = (id) => {
    onBook(id);
  };
  
  return (
    <div className={styles.scheduleContainer}>
      <ul className={styles.scheduleList}>
        {Array.isArray(appointments.message) && appointments.message.map((appointment) => (
          <li key={appointment.Id} className={styles.appointmentItem}>
            <div className={styles.appointmentDetails}>
              <div>Date: {new Date(appointment.DateTime).toISOString().slice(0, 10)}</div>
              <div>Time: {new Date(appointment.DateTime).toISOString().slice(11, 19)}</div>
            </div>
            <button className={styles.bookButton} onClick={() => handleBook(appointment.Id)}>Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleBook;

