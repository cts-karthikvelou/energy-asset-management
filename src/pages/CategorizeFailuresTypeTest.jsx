import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CategorizeFailures from './CategorizeFailures';

test('Categorize failures by type - Ticket has summary', async () => {
  const { getByLabelText } = render(<CategorizeFailures />);

  // Verify that the ticket summary input field is present
  const summaryInput = getByLabelText('Ticket Summary:');
  expect(summaryInput).toBeInTheDocument();

  // Enter a summary and verify that the input value is updated
  fireEvent.change(summaryInput, { target: { value: 'Test summary' } });
  expect(summaryInput.value).toBe('Test summary');
});

test('renders correctly', () => {
  const { asFragment } = render(<CategorizeFailures />);
  expect(asFragment()).toMatchSnapshot();
});
