import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AssetInventoryTrackingNew from './AssetInventoryTrackingNew';

describe('AssetInventoryTrackingNew', () => {
  test('should render the component and add an asset', () => {
    render(<AssetInventoryTrackingNew />);

    // Check initial state
    expect(screen.getByText('Asset Inventory & Tracking-new')).toBeInTheDocument();
    expect(screen.queryByText('Asset 1 (Active)')).not.toBeInTheDocument();

    // Add a new asset
    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'Test Asset' } });
    fireEvent.click(screen.getByText('Add Asset'));

    // Check if the asset is added
    expect(screen.getByText('Test Asset (Active)')).toBeInTheDocument();
  });

  test('should remove an existing asset', () => {
    render(<AssetInventoryTrackingNew />);

    // Add a new asset
    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'Test Asset' } });
    fireEvent.click(screen.getByText('Add Asset'));

    // Check if the asset is added
    expect(screen.getByText('Test Asset (Active)')).toBeInTheDocument();

    // Remove the asset
    fireEvent.click(screen.getByText('Remove'));

    // Check if the asset is removed
    expect(screen.queryByText('Test Asset (Active)')).not.toBeInTheDocument();
  });
});
