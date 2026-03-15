import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ReportForPBNoCommsAlerts from './ReportForPBNoCommsAlerts';
import '@testing-library/jest-dom';

// Mock global fetch
global.fetch = jest.fn();

describe('ReportForPBNoCommsAlerts Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders the report page elements', () => {
    const { container } = render(<ReportForPBNoCommsAlerts />);
    
    expect(screen.getByRole('heading', { name: /Report for PB No Comms Alerts/i })).toBeInTheDocument();
    expect(screen.getByText(/Start Date:/i)).toBeInTheDocument();
    expect(screen.getByText(/End Date:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Generate Report/i })).toBeInTheDocument();
    
    // Check for date inputs (using querySelectorAll since labels aren't explicitly associated with IDs)
    const inputs = container.querySelectorAll('input[type="date"]');
    expect(inputs).toHaveLength(2);
  });

  test('updates input values', () => {
    const { container } = render(<ReportForPBNoCommsAlerts />);
    const inputs = container.querySelectorAll('input[type="date"]');
    const startDateInput = inputs[0];
    const endDateInput = inputs[1];

    fireEvent.change(startDateInput, { target: { value: '2023-01-01' } });
    fireEvent.change(endDateInput, { target: { value: '2023-01-31' } });

    expect(startDateInput.value).toBe('2023-01-01');
    expect(endDateInput.value).toBe('2023-01-31');
  });

  test('fetches alerts and displays them on button click', async () => {
    const mockData = [
      { date: '2023-01-10', description: 'Communication lost with Asset A' },
      { date: '2023-01-15', description: 'Signal weak for Asset B' },
    ];

    fetch.mockResolvedValueOnce({
      json: async () => mockData,
    });

    const { container } = render(<ReportForPBNoCommsAlerts />);
    const inputs = container.querySelectorAll('input[type="date"]');
    
    // Set dates
    fireEvent.change(inputs[0], { target: { value: '2023-01-01' } });
    fireEvent.change(inputs[1], { target: { value: '2023-01-31' } });

    // Click generate
    fireEvent.click(screen.getByRole('button', { name: /Generate Report/i }));

    // Verify fetch call and that the new data is displayed
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('/api/alerts?start_date=2023-01-01&end_date=2023-01-31');
      expect(screen.getByText(/Number of PB No Comms Alerts: 2/i)).toBeInTheDocument();
      expect(screen.getByText(/2023-01-10 - Communication lost with Asset A/i)).toBeInTheDocument();
      expect(screen.getByText(/2023-01-15 - Signal weak for Asset B/i)).toBeInTheDocument();
    });
  });

  test('handles empty data response', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => [],
    });

    render(<ReportForPBNoCommsAlerts />);
    
    fireEvent.click(screen.getByRole('button', { name: /Generate Report/i }));

    await waitFor(() => {
      expect(screen.getByText(/Number of PB No Comms Alerts: 0/i)).toBeInTheDocument();
    });
  });
});