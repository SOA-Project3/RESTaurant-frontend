import styles from "./scheduleDelAvailable.module.css";

const ScheduleDelAvailable = ({ appointments, onDelete, branch }) => {
  const handleDelete = (id) => {
    onDelete(id);
  };

  return (
    <div className={styles.scheduleContainer}>
      <ul className={styles.scheduleList}>
        {Array.isArray(appointments.message) &&
          appointments.message.map(
            (appointment) =>
              branch == appointment.Branch && (
                <li key={appointment.Id} className={styles.appointmentItem}>
                  <div className={styles.appointmentDetails}>
                    <div>
                      Date:{" "}
                      {new Date(appointment.DateTime)
                        .toISOString()
                        .slice(0, 10)}
                    </div>
                    <div>
                      Time:{" "}
                      {new Date(appointment.DateTime)
                        .toISOString()
                        .slice(11, 19)}
                    </div>
                    <div>Branch: {appointment.Branch}</div>
                  </div>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(appointment.Id)}
                  >
                    Delete
                  </button>
                </li>
              )
          )}
      </ul>
    </div>
  );
};

export default ScheduleDelAvailable;
