import React, { useState } from 'react';

const CategorizeFailures-new-feat = () => {
  const [status, setStatus] = useState('To Do');
  const [priority, setPriority] = useState('Medium');

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  return (
    <div>
      <h2>Categorize failures by type-new-ft</h2>
      <p>Ticket has a status: {status}</p>
      <select value={status} onChange={handleStatusChange}>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <p>Priority: {priority}</p>
      <select value={priority} onChange={handlePriorityChange}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
};

export default CategorizeFailures-new-feat;
