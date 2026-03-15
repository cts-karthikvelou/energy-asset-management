import React, { useState } from 'react';

const EscalateUnresolvedFailures = () => {
  const [failures, setFailures] = useState([]);
  const [escalatedFailures, setEscalatedFailures] = useState([]);

  const handleEscalate = (failure) => {
    setEscalatedFailures([...escalatedFailures, failure]);
    setFailures(failures.filter(f => f.id!== failure.id));
  };

  return (
    <div>
      <h2>Escalate Unresolved Failures</h2>
      <div>
        <h3>Unresolved Failures</h3>
        <ul>
          {failures.map(failure => (
            <li key={failure.id}>
              {failure.description}
              <button onClick={() => handleEscalate(failure)}>Escalate</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Escalated Failures</h3>
        <ul>
          {escalatedFailures.map(failure => (
            <li key={failure.id}>
              {failure.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EscalateUnresolvedFailures;