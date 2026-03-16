import React, { useState } from 'react';
import axios from 'axios';

const SendFailureNotification = () => {
  const [failureDetails, setFailureDetails] = useState('');
  const [email, setEmail] = useState('');

  const handleSendNotification = async () => {
    try {
      const response = await axios.post('/api/send-failure-notification', {
        failureDetails,
        email,
      });
      if (response.status === 200) {
        alert('Failure notification sent successfully.');
      }
    } catch (error) {
      console.error('Error sending failure notification:', error);
    }
  };

  return (
    <div>
      <h2>Send Failure Notification via Email</h2>
      <label>
        Failure Details:
        <input
          type="text"
          value={failureDetails}
          onChange={(e) => setFailureDetails(e.target.value)}
        />
      </label>
      <br />
      <label>
        Email Address:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <button onClick={handleSendNotification}>Send Notification</button>
    </div>
  );
};

export default SendFailureNotification;
