import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Dashboard from './Dashboard';
import '@testing-library/jest-dom';

describe('Dashboard Component', () => {
  test('renders the dashboard title', () => {
    render(<Dashboard />);
    expect(screen.getByText('PB No Comms Alerts Dashboard')).toBeInTheDocument();
  });

  test('renders the LineChart component', () => {
    render(<Dashboard />);
    expect(screen.getByRole('application')).toBeInTheDocument();
  });

  test('fetches data and updates the state', async () => {
    const mockData = [
      { timestamp: '2024-06-01', alerts: 10 },
      { timestamp: '2024-06-02', alerts: 15 },
      { timestamp: '2024-06-03', alerts: 20 },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    );

    render(<Dashboard />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/pb-no-comms-alerts');
    });

    expect(screen.getByRole('application')).toBeInTheDocument();
  });
});
