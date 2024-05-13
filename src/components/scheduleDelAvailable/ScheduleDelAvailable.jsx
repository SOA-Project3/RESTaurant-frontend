import styles from "./scheduleDelAvailable.module.css";

const ScheduleDelAvailable = ({ appointments, onDelete }) => {
  const handleDelete = (id) => {
    onDelete(id);
  };

  return (
    <div className={styles.scheduleContainer}>
      <ul className={styles.scheduleList}>
        {appointments.map((appointment) => (
          <li key={appointment.Id} className={styles.appointmentItem}>
            <div className={styles.appointmentDetails}>
              <div>Date: {new Date(appointment.Date).toLocaleDateString()}</div>
              <div>Time: {new Date(appointment.Time).toLocaleTimeString()}</div>
            </div>
            <button className={styles.deleteButton} onClick={() => handleDelete(appointment.Id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleDelAvailable;
