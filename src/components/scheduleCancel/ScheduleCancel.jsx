import styles from "./scheduleCancel.module.css";

const ScheduleCancel = ({ appointments, onCancel, onEdit }) => {
  const handleCancel = (id, userid) => {
    onCancel(id, userid);
  };

  const handleEdit = (id, userid) => {
    onEdit(id, userid);
  };

  return (
    <div className={styles.scheduleContainer}>
      <ul className={styles.scheduleList}>
        {Array.isArray(appointments.message) &&
          appointments.message.map((appointment) => (
            <li key={appointment.Id} className={styles.appointmentItem}>
              <div className={styles.appointmentDetails}>
                <div>
                  Date:{" "}
                  {new Date(appointment.DateTime).toISOString().slice(0, 10)}
                </div>
                <div>
                  Time:{" "}
                  {new Date(appointment.DateTime).toISOString().slice(11, 19)}
                </div>
                <div>People Quantity: {appointment.PeopleQuantity}</div>
                <div>Branch: {appointment.Branch}</div>
              </div>
              <div className={styles.buttonGroup}>
                <button
                  className={styles.editButton}
                  onClick={() => handleEdit(appointment.Id, appointment.UserId)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() =>
                    handleCancel(appointment.Id, appointment.UserId)
                  }
                >
                  Cancel
                </button>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ScheduleCancel;
