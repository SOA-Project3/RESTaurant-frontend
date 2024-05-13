import styles from "./scheduleBook.module.css";

const ScheduleBook = ({ appointments }) => {
  return (
    <div className={styles.scheduleContainer}>
      <ul className={styles.scheduleList}>
        {appointments.map((appointment) => (
          <li key={appointment.Id} className={styles.appointmentItem}>
            <div className={styles.appointmentDetails}>
              <div>Date: {new Date(appointment.Date).toLocaleDateString()}</div>
              <div>Time: {new Date(appointment.Time).toLocaleTimeString()}</div>
            </div>
            <button className={styles.bookButton}>Book</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleBook;


