import React, { useState } from 'react';

const ReportForPBNoCommsAlerts = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [alerts, setAlerts] = useState([]);

    const fetchAlerts = async () => {
        // Fetch alerts from the API based on the date range
        const response = await fetch(`/api/alerts?start_date=${startDate}&end_date=${endDate}`);
        const data = await response.json();
        setAlerts(data);
    };

    return (
        <div>
            <h1>Report for PB No Comms Alerts</h1>
            <div>
                <label>Start Date:</label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
                <label>End Date:</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <button onClick={fetchAlerts}>Generate Report</button>
            <div>
                <h2>Number of PB No Comms Alerts: {alerts.length}</h2>
                <h2>Trend of PB No Comms Alerts over time</h2>
                <ul>
                    {alerts.map((alert, index) => (
                        <li key={index}>{alert.date} - {alert.description}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ReportForPBNoCommsAlerts;