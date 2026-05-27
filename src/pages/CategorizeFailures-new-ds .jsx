import React, { useState } from 'react';

const CategorizeFailures-new-ds = () => {
  const [priority, setPriority] = useState('');

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (priority) {
      // Add logic to categorize failures by type
      console.log('Failures categorized by type:', priority);
    } else {
      console.log('Please select a valid priority.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Select Priority:
        <select value={priority} onChange={handlePriorityChange}>
          <option value="">Select</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <button type="submit">Categorize Failures</button>
    </form>
  );
};

export default CategorizeFailures-new-ds;
