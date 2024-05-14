import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from "./scheduleForm.module.css";

const ScheduleForm = ({ onSubmit }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !isValidDate(date)) {
      alert('Please select a valid date.');
      return;
    }
    if (!isValidTime(time)) {
      alert('Please enter a valid time in HH:MM format.');
      return;
    }
    const newDate = new Date(date);
    onSubmit(newDate, time);
    // Reset the form fields
    setDate(new Date());
    setTime('');
  };
  

  const isValidDate = (date) => {
    return !isNaN(date.getTime());
  };

  const isValidTime = (time) => {
    const regex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.h2Margin}>Add Slot</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Date:</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            className={styles.datePicker}
            dateFormat="MM/dd/yyyy"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className={styles.timePicker}
          />
        </div>
        <div className={styles.formGroup}>
          <button type="submit" className={styles.addButton}>Add</button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleForm;
