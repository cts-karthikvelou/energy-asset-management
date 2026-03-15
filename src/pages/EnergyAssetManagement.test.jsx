import React from 'react';
import { render, screen } from '@testing-library/react';
import EnergyAssetManagement from './EnergyAssetManagement';
import '@testing-library/jest-dom';

describe('Energy Asset Management', () => {
  test('should display the correct information', () => {
    render(<EnergyAssetManagement />);

    // Check if the role is displayed correctly
    expect(screen.getByText('Role: As a system admin')).toBeInTheDocument();

    // Check if the goal is displayed correctly
    expect(screen.getByText('Goal: I want to monitor energy consumption patterns.')).toBeInTheDocument();

    // Check if the benefit is displayed correctly
    expect(screen.getByText('Benefit: I can optimize energy usage.')).toBeInTheDocument();

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