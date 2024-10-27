import React, { useState, useEffect } from 'react';
import styles from './timer.module.css';

const Timer = () => {
    const [alarms, setAlarms] = useState(() => JSON.parse(localStorage.getItem("alarms")) || []);
    const [alarmCount, setAlarmCount] = useState(alarms.length);
    const [time, setTime] = useState('');
    const [label, setLabel] = useState('');
    const [color, setColor] = useState('#ffffff');
    const [latestAlarm, setLatestAlarm] = useState('');

    const getCurrentTime = () => {
        const now = new Date();
        return now.toTimeString().slice(0, 5);
    };

    const saveAlarms = () => {
        localStorage.setItem("alarms", JSON.stringify(alarms));
    };

    const addOrUpdateAlarm = () => {
        const newAlarm = { id: alarmCount + 1, time, label, color, isOn: true };
        setAlarms([...alarms, newAlarm]);
        setAlarmCount(alarmCount + 1);
        setTime('');
        setLabel('');
        setColor('#ffffff');
    };

    const toggleAlarm = (id) => {
        setAlarms(alarms.map(alarm => alarm.id === id ? { ...alarm, isOn: !alarm.isOn } : alarm));
    };

    const deleteAlarm = (id) => {
        setAlarms(alarms.filter(alarm => alarm.id !== id));
    };

    const sortAndDisplayAlarms = () => {
        const currentTime = getCurrentTime();
        const upcomingAlarms = alarms
            .filter(alarm => alarm.time >= currentTime)
            .sort((a, b) => a.time.localeCompare(b.time));

        if (upcomingAlarms.length > 0) {
            const earliestAlarm = upcomingAlarms[0];
            setLatestAlarm(`Medicine: At ${earliestAlarm.time} - ${earliestAlarm.label}`);
        } else {
            setLatestAlarm("No upcoming medicine alarms.");
        }
    };

    useEffect(() => {
        saveAlarms();
        sortAndDisplayAlarms();
    }, [alarms]);

    return (
        <div className={styles.app}>
            <div style={{ display: latestAlarm.includes("No upcoming") ? 'none' : 'block' }} className={styles.latestAlarmContainer}>
                <h2>Medicine Time!</h2>
                <div className={styles.latestAlarm}>{latestAlarm}</div>
            </div>
            <div className={styles.alarmContainer}>
                <h2>Add Medicine</h2>
                <form onSubmit={(e) => { e.preventDefault(); addOrUpdateAlarm(); }}>
                    <div className={styles.formGroup}>
                        <label htmlFor="alarmTime">Time:</label>
                        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="alarmLabel">Label:</label>
                        <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Medicine name" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="alarmColor">Color:</label>
                        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} required />
                    </div>
                    <button type="submit" className={styles.submitButton}>Add Medicine</button>
                </form>
            </div>
            <div className={styles.activeAlarms}>
                {alarms.map(alarm => (
                    <div key={alarm.id} className={`${styles.activeAlarm} ${alarm.isOn ? styles.alarmOn : styles.alarmOff}`} style={{ backgroundColor: alarm.color }}>
                        <span>At {alarm.time} - {alarm.label}</span><br />
                        <button className={styles.actionButton} onClick={() => toggleAlarm(alarm.id)}>
                            {alarm.isOn ? "Turn Off" : "Turn On"}
                        </button>
                        <button className={`${styles.actionButton} ${styles.edit}`} onClick={() => deleteAlarm(alarm.id)}>Edit</button>
                        <button className={`${styles.actionButton} ${styles.delete}`} onClick={() => deleteAlarm(alarm.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timer;
