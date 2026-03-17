import React, { useState } from 'react';

const AssetLifecycleManagement = () => {
  const [assets, setAssets] = useState([
    { id: 1, name: 'Asset 1', status: 'Procurement', date: '2026-03-17' },
    { id: 2, name: 'Asset 2', status: 'In Use', date: '2026-03-17' },
    // Add more assets as needed
  ]);

  const handleStatusChange = (id, newStatus) => {
    setAssets(assets.map(asset => asset.id === id? {...asset, status: newStatus } : asset));
  };

  return (
    <div>
      <h1>Asset Lifecycle Management</h1>
      <table>
        <thead>
          <tr>
            <th>Asset Name</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {assets.map(asset => (
            <tr key={asset.id}>
              <td>{asset.name}</td>
              <td>
                <select value={asset.status} onChange={(e) => handleStatusChange(asset.id, e.target.value)}>
                  <option value="Procurement">Procurement</option>
                  <option value="In Use">In Use</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Disposal">Disposal</option>
                </select>
              </td>
              <td>{asset.date}</td>
              <td>
                <button onClick={() => handleStatusChange(asset.id, 'Maintenance')}>Schedule Maintenance</button>
                <button onClick={() => handleStatusChange(asset.id, 'Disposal')}>Dispose</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssetLifecycleManagement;
