import React, { useState } from 'react';

const EAM33Component = () => {
    const [data, setData] = useState([1, 2, 3, 4, 5]);
    const [processedData, setProcessedData] = useState([]);

    const processData = () => {
        const newData = data.map(x => x * 2);
        setProcessedData(newData);
    };

    return (
        <div>
            <h1>EAM-33 Component</h1>
            <button onClick={processData}>Process Data</button>
            <div>
                <h2>Processed Data:</h2>
                <ul>
                    {processedData.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EAM33Component;