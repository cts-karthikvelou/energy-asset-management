import React, { useState } from 'react';

const AssetInventoryTrackingNew = () => {
  const [assets, setAssets] = useState([]);

  const addAsset = (asset) => {
    setAssets([...assets, asset]);
  };

  const removeAsset = (assetId) => {
    setAssets(assets.filter(asset => asset.id!== assetId));
  };

  return (
    <div>
      <h1>Asset Inventory & Tracking-new</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        const newAsset = {
          id: assets.length + 1,
          name: e.target.elements.name.value,
          status: 'Active'
        };
        addAsset(newAsset);
        e.target.reset();
      }}>
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
        <button type="submit">Add Asset</button>
      </form>
      <ul>
        {assets.map(asset => (
          <li key={asset.id}>
            {asset.name} ({asset.status})
            <button onClick={() => removeAsset(asset.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssetInventoryTrackingNew;
