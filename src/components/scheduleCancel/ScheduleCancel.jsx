import styles from "./scheduleCancel.module.css";

const ScheduleCancel = ({ appointments }) => {
  return (
    <div className={styles.scheduleContainer}>
      <ul className={styles.scheduleList}>
        {appointments.map((appointment) => (
          <li key={appointment.Id} className={styles.appointmentItem}>
            <div className={styles.appointmentDetails}>
              <div>Date: {new Date(appointment.Date).toLocaleDateString()}</div>
              <div>Time: {new Date(appointment.Time).toLocaleTimeString()}</div>
              <div>People Quantity: {appointment.PeopleQuantity}</div>
            </div>
            <button className={styles.deleteButton}>Cancel</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleCancel;


