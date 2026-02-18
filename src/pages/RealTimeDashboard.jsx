import React, { useState, useEffect } from 'react';

const RealTimeDashboard = () => {
  const [communicationFailures, setCommunicationFailures] = useState([]);

  useEffect(() => {
    // Simulate fetching real-time data
    const fetchData = async () => {
      const response = await fetch('/api/communication-failures');
      const data = await response.json();
      setCommunicationFailures(data);
    };

    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div>
      <h1>Real-Time Dashboard for Communication Failures</h1>
      <ul>
        {communicationFailures.map((failure, index) => (
          <li key={index}>
            {failure.timestamp} - {failure.asset} - {failure.duration} seconds
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RealTimeDashboard;