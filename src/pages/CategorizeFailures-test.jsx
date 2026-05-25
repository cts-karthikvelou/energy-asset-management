import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CategorizeFailures from './CategorizeFailures';

describe('CategorizeFailures Component', () => {
  test('renders initial state values', () => {
    const { getByText } = render(<CategorizeFailures />);
    expect(getByText('Ticket has a status: To Do')).toBeInTheDocument();
    expect(getByText('Priority: Medium')).toBeInTheDocument();
  });

  test('changes status on dropdown selection', async () => {
    const { getByText, getByLabelText } = render(<CategorizeFailures />);
    const statusDropdown = getByLabelText('Status');
    fireEvent.change(statusDropdown, { target: { value: 'In Progress' } });
    await waitFor(() => expect(getByText('Ticket has a status: In Progress')).toBeInTheDocument());
  });

  test('changes priority on dropdown selection', async () => {
    const { getByText, getByLabelText } = render(<CategorizeFailures />);
    const priorityDropdown = getByLabelText('Priority');
    fireEvent.change(priorityDropdown, { target: { value: 'High' } });
    await waitFor(() => expect(getByText('Priority: High')).toBeInTheDocument());
  });

  test('handles invalid status value', async () => {
    const { getByText, getByLabelText } = render(<CategorizeFailures />);
    const statusDropdown = getByLabelText('Status');
    fireEvent.change(statusDropdown, { target: { value: 'Invalid' } });
    await waitFor(() => expect(getByText('Ticket has a status: Invalid')).toBeInTheDocument());
  });

  test('handles invalid priority value', async () => {
    const { getByText, getByLabelText } = render(<CategorizeFailures />);
    const priorityDropdown = getByLabelText('Priority');
    fireEvent.change(priorityDropdown, { target: { value: 'Invalid' } });
    await waitFor(() => expect(getByText('Priority: Invalid')).toBeInTheDocument());
  });
});
