import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import RealTimeDashboard from './RealTimeDashboard';
import '@testing-library/jest-dom';

// Mock global fetch manually since jest-fetch-mock is missing
global.fetch = jest.fn();

describe('RealTimeDashboard', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    fetch.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders real-time data on communication failures', async () => {
    const mockData = [
      { timestamp: '2024-07-10T12:00:00Z', asset: 'Asset 1', duration: 10 },
      { timestamp: '2024-07-10T12:05:00Z', asset: 'Asset 2', duration: 5 },
    ];

    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const { getByText } = render(<RealTimeDashboard />);

    // Advance time by 5 seconds to trigger the setInterval in the component
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    await waitFor(() => {
      expect(getByText('2024-07-10T12:00:00Z - Asset 1 - 10 seconds')).toBeInTheDocument();
      expect(getByText('2024-07-10T12:05:00Z - Asset 2 - 5 seconds')).toBeInTheDocument();
    });
  });
});