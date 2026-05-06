import React, { useState } from 'react';

const CategorizeFailures = () => {
  const [failures, setFailures] = useState([]);
  const [newFailure, setNewFailure] = useState('');
  const [newType, setNewType] = useState('');

  const handleAddFailure = () => {
    if (newFailure && newType) {
      setFailures([...failures, { failure: newFailure, type: newType }]);
      setNewFailure('');
      setNewType('');
    }
  };

  const categorizedFailures = failures.reduce((acc, failure) => {
    if (!acc[failure.type]) {
      acc[failure.type] = [];
    }
    acc[failure.type].push(failure.failure);
    return acc;
  }, {});

  return (
    <div>
      <h2>Categorize Failures by Type</h2>
      <div>
        <input
          type="text"
          value={newFailure}
          onChange={(e) => setNewFailure(e.target.value)}
          placeholder="Enter failure"
        />
        <input
          type="text"
          value={newType}
          onChange={(e) => setNewType(e.target.value)}
          placeholder="Enter type"
        />
        <button onClick={handleAddFailure}>Add Failure</button>
      </div>
      <div>
        <h3>Categorized Failures</h3>
        {Object.keys(categorizedFailures).map((type) => (
          <div key={type}>
            <h4>{type}</h4>
            <ul>
              {categorizedFailures[type].map((failure, index) => (
                <li key={index}>{failure}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorizeFailures;