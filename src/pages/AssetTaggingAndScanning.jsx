import React, { useState } from 'react';

const AssetTaggingAndScanning = () => {
  const [assets, setAssets] = useState([]);
  const [newAsset, setNewAsset] = useState('');

  const handleScan = (tag) => {
    setAssets([...assets, { id: assets.length + 1, tag, status: 'Scanned' }]);
    setNewAsset('');
  };

  const handleAddAsset = () => {
    setAssets([...assets, { id: assets.length + 1, tag: newAsset, status: 'Pending' }]);
    setNewAsset('');
  };

  return (
    <div>
      <h1>Asset Tagging and Scanning</h1>
      <input
        type="text"
        value={newAsset}
        onChange={(e) => setNewAsset(e.target.value)}
        placeholder="Enter asset tag"
      />
      <button onClick={handleAddAsset}>Add Asset</button>
      <table>
        <thead>
          <tr>
            <th>Asset Tag</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {assets.map(asset => (
            <tr key={asset.id}>
              <td>{asset.tag}</td>
              <td>{asset.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => handleScan('New Tag')}>Scan Asset</button>
    </div>
  );
};

export default AssetTaggingAndScanning;
