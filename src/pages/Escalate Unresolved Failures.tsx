import React, { useState } from 'react';

const EscalateUnresolvedFailures = () => {
  const [ticket, setTicket] = useState({
    summary: '',
    priority: '',
    status: '',
    resolutionTime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prevTicket) => ({
     ...prevTicket,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to escalate unresolved failures
    console.log('Escalating unresolved failures:', ticket);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Summary:
        <input
          type="text"
          name="summary"
          value={ticket.summary}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Priority:
        <input
          type="text"
          name="priority"
          value={ticket.priority}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Status:
        <input
          type="text"
          name="status"
          value={ticket.status}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Resolution Time:
        <input
          type="text"
          name="resolutionTime"
          value={ticket.resolutionTime}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Escalate Unresolved Failures</button>
    </form>
  );
};

export default EscalateUnresolvedFailures;
