import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CategorizeFailures from './CategorizeFailures';

test('Categorize failures by type - Ticket has summary', async () => {
  const { getByLabelText, getByText } = render(<CategorizeFailures />);

  // Verify that the ticket summary input field is present
  const summaryInput = getByLabelText('Ticket Summary:');
  expect(summaryInput).toBeInTheDocument();

  // Enter a summary and verify that the input value is updated
  fireEvent.change(summaryInput, { target: { value: 'Test summary' } });
  expect(summaryInput.value).toBe('Test summary');

  // Submit the form and verify that the form submission handler is triggered
  const submitButton = getByText('Submit');
  fireEvent.click(submitButton);

  // Verify that the form submission handler is triggered
  await waitFor(() => {
    // Add logic to verify that the form submission handler is triggered
    // For example, you can check if a network request is made or a state is updated
  });
});
