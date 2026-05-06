import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import SendFailureNotification from './SendFailureNotification';import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import SendFailureNotification from './SendFailureNotification';

// Mock axios to prevent actual API calls
jest.mock('axios');

describe('SendFailureNotification Component', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.alert since it's used in the component
    window.alert = jest.fn();
  });

  // 1. Rendering Test
  test('renders input fields and send button', () => {
    render(<SendFailureNotification />);
    
    expect(screen.getByLabelText(/failure details/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send notification/i })).toBeInTheDocument();
  });

  // 2. State Update Test
  test('updates input values on change', () => {
    render(<SendFailureNotification />);
    
    const detailsInput = screen.getByLabelText(/failure details/i);
    const emailInput = screen.getByLabelText(/email address/i);

    fireEvent.change(detailsInput, { target: { value: 'Server Down' } });
    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });

    expect(detailsInput.value).toBe('Server Down');
    expect(emailInput.value).toBe('admin@example.com');
  });

  // 3. Successful Submission Test
  test('calls axios.post and shows success alert on 200 response', async () => {
    axios.post.mockResolvedValue({ status: 200 });

    render(<SendFailureNotification />);
    
    fireEvent.change(screen.getByLabelText(/failure details/i), { target: { value: 'Disk Full' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@test.com' } });
    fireEvent.click(screen.getByRole('button', { name: /send notification/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/send-failure-notification', {
        failureDetails: 'Disk Full',
        email: 'test@test.com',
      });
      expect(window.alert).toHaveBeenCalledWith('Failure notification sent successfully.');
    });
  });

  // 4. Error Handling Test
  test('logs error to console when API call fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    axios.post.mockRejectedValue(new Error('Network Error'));

    render(<SendFailureNotification />);
    
    fireEvent.click(screen.getByRole('button', { name: /send notification/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error sending failure notification:', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });
});

// Mock axios to prevent actual API calls
jest.mock('axios');

describe('SendFailureNotification Component', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.alert since it's used in the component
    window.alert = jest.fn();
  });

  ### 1. Rendering Test
  test('renders input fields and send button', () => {
    render(<SendFailureNotification />);
    
    expect(screen.getByLabelText(/failure details/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send notification/i })).toBeInTheDocument();
  });

  ### 2. State Update Test
  test('updates input values on change', () => {
    render(<SendFailureNotification />);
    
    const detailsInput = screen.getByLabelText(/failure details/i);
    const emailInput = screen.getByLabelText(/email address/i);

    fireEvent.change(detailsInput, { target: { value: 'Server Down' } });
    fireEvent.change(emailInput, { target: { value: 'admin@example.com' } });

    expect(detailsInput.value).toBe('Server Down');
    expect(emailInput.value).toBe('admin@example.com');
  });

  ### 3. Successful Submission Test
  test('calls axios.post and shows success alert on 200 response', async () => {
    axios.post.mockResolvedValue({ status: 200 });

    render(<SendFailureNotification />);
    
    fireEvent.change(screen.getByLabelText(/failure details/i), { target: { value: 'Disk Full' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@test.com' } });
    fireEvent.click(screen.getByRole('button', { name: /send notification/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/send-failure-notification', {
        failureDetails: 'Disk Full',
        email: 'test@test.com',
      });
      expect(window.alert).toHaveBeenCalledWith('Failure notification sent successfully.');
    });
  });

  ### 4. Error Handling Test
  test('logs error to console when API call fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    axios.post.mockRejectedValue(new Error('Network Error'));

    render(<SendFailureNotification />);
    
    fireEvent.click(screen.getByRole('button', { name: /send notification/i }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error sending failure notification:', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });
});
