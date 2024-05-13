import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the styles for the datepicker
import styles from "./scheduleForm.module.css";

const ScheduleForm = ({ onSubmit }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAppointment = {
      Date: date,
      Time: time
    };
    onSubmit(newAppointment);
    // Reset the form fields
    setDate(new Date());
    setTime('');
  };

  return (
    <div className={styles.formContainer}>
      <h2>Add Slot</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Date:</label>
          <DatePicker selected={date} onChange={(date) => setDate(date)} />
        </div>
        <div className={styles.formGroup}>
          <label>Time:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <button type="submit" className={styles.addButton}>Add</button>
      </form>
    </div>
  );
};

export default ScheduleForm;
