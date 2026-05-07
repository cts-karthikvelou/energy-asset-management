import React, { useState } from 'react';

const CategorizeFailuresType = () => {
  const [ticketSummary, setTicketSummary] = useState('');

  const handleSummaryChange = (event) => {
    setTicketSummary(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle ticket submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Ticket Summary:
        <input type="text" value={ticketSummary} onChange={handleSummaryChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CategorizeFailuresType;
