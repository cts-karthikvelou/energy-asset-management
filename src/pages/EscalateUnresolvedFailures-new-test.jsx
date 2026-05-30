import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import EscalateUnresolvedFailures from './EscalateUnresolvedFailures';

describe('EscalateUnresolvedFailures', () => {
  test('should display form fields for summary, priority, status, and resolution time', () => {
    const { getByLabelText } = render(<EscalateUnresolvedFailures />);
    expect(getByLabelText('Summary:')).toBeInTheDocument();
    expect(getByLabelText('Priority:')).toBeInTheDocument();
    expect(getByLabelText('Status:')).toBeInTheDocument();
    expect(getByLabelText('Resolution Time:')).toBeInTheDocument();
  });

  test('should allow user to input values for summary, priority, status, and resolution time', () => {
    const { getByLabelText } = render(<EscalateUnresolvedFailures />);
    const summaryInput = getByLabelText('Summary:');
    const priorityInput = getByLabelText('Priority:');
    const statusInput = getByLabelText('Status:');
    const resolutionTimeInput = getByLabelText('Resolution Time:');

    fireEvent.change(summaryInput, { target: { value: 'Test Summary' } });
    fireEvent.change(priorityInput, { target: { value: 'High' } });
    fireEvent.change(statusInput, { target: { value: 'Unresolved' } });
    fireEvent.change(resolutionTimeInput, { target: { value: '2 hours' } });

    expect(summaryInput.value).toBe('Test Summary');
    expect(priorityInput.value).toBe('High');
    expect(statusInput.value).toBe('Unresolved');
    expect(resolutionTimeInput.value).toBe('2 hours');
  });

  test('should display error message when form is submitted without required fields', async () => {
    const { getByLabelText, getByText } = render(<EscalateUnresolvedFailures />);
    const submitButton = getByText('Escalate Unresolved Failures');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Please fill out all required fields')).toBeInTheDocument();
    });
  });

  test('should escalate unresolved failure ticket with valid input', async () => {
    const mockEscalateFailure = jest.fn();
    const { getByLabelText, getByText } = render(
      <EscalateUnresolvedFailures escalateFailure={mockEscalateFailure} />
    );

    const summaryInput = getByLabelText('Summary:');
    const priorityInput = getByLabelText('Priority:');
    const statusInput = getByLabelText('Status:');
    const resolutionTimeInput = getByLabelText('Resolution Time:');
    const submitButton = getByText('Escalate Unresolved Failures');

    fireEvent.change(summaryInput, { target: { value: 'Test Summary' } });
    fireEvent.change(priorityInput, { target: { value: 'High' } });
    fireEvent.change(statusInput, { target: { value: 'Unresolved' } });
    fireEvent.change(resolutionTimeInput, { target: { value: '2 hours' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockEscalateFailure).toHaveBeenCalledWith({
        summary: 'Test Summary',
        priority: 'High',
        status: 'Unresolved',
        resolutionTime: '2 hours'
      });
    });
  });
});
