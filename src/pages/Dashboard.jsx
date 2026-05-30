import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API or other sources
    const fetchData = async () => {
      const response = await fetch('/api/pb-no-comms-alerts');
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      <h1>PB No Comms Alerts Dashboard</h1>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="alerts" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Dashboard;