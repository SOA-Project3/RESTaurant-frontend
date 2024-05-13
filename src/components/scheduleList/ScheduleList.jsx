import styles from "./scheduleList.module.css";

const ScheduleList = ({ appointments }) => {
  return (
    <div className={styles.scheduleContainer}>
      <ul className={styles.scheduleList}>
        {appointments.map((appointment) => (
          <li key={appointment.Id} className={styles.appointmentItem}>
            <div className={styles.appointmentDetails}>
              <div>Date: {new Date(appointment.Date).toLocaleDateString()}</div>
              <div>Time: {new Date(appointment.Time).toLocaleTimeString()}</div>
              <div>Is Booked: {appointment.IsBooked}</div>
              <div>People Quantity: {appointment.PeopleQuantity}</div>
              <div>User ID: {appointment.UserId}</div>
            </div>
            <button className={styles.deleteButton}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleList;


