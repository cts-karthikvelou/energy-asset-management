import React from 'react';
import { render, screen } from '@testing-library/react';
import AssetInventoryTracking from './AssetInventoryTracking';
import '@testing-library/jest-dom';

describe('Asset Inventory & Tracking', () => {
  test('should display the correct information', () => {
    render(<AssetInventoryTracking />);

    // Check if the role is displayed correctly
    expect(screen.getByText('Role: As a user')).toBeInTheDocument();

    // Check if the goal is displayed correctly
    expect(screen.getByText('Goal: Asset Inventory & Tracking')).toBeInTheDocument();

    // Check if the benefit is displayed correctly
    expect(screen.getByText('Benefit: So that the need is satisfied.')).toBeInTheDocument();

    // Check if the acceptance criteria are displayed correctly
    expect(screen.getByText('Acceptance Criteria:')).toBeInTheDocument();
    expect(screen.getByText('Ticket has summary')).toBeInTheDocument();
    expect(screen.getByText('Ticket has a valid priority')).toBeInTheDocument();
    expect(screen.getByText('Ticket has a status')).toBeInTheDocument();

    // Check if the priority is displayed correctly
    expect(screen.getByText('Priority: Medium')).toBeInTheDocument();

    // Check if the status is displayed correctly
    expect(screen.getByText('Status: To Do')).toBeInTheDocument();
  });
});