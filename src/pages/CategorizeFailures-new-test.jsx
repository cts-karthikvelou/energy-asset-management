import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CategorizeFailures from './CategorizeFailures';

describe('CategorizeFailures-new', () => {
  test('adds a new failure and categorizes it by type', async () => {
    const { getByPlaceholderText, getByText, getAllByRole } = render(<CategorizeFailures-new />);

    // Add a new failure
    const input = getByPlaceholderText('Enter failure');
    fireEvent.change(input, { target: { value: 'New Failure' } });
    fireEvent.click(getByText('Add Failure'));

    // Categorize the failure by type
    const categorizeButton = getAllByRole('button', { name: 'Categorize' })[0];
    fireEvent.click(categorizeButton);

    // Verify that the failure is categorized by type
    await waitFor(() => {
      expect(getByText('New Failure')).toBeInTheDocument();
    });
  });

  test('displays an error message for invalid failure type', async () => {
    const { getByPlaceholderText, getByText, getAllByRole } = render(<CategorizeFailures />);

    // Add a new failure with an invalid type
    const input = getByPlaceholderText('Enter failure');
    fireEvent.change(input, { target: { value: 'Invalid Failure' } });
    fireEvent.click(getByText('Add Failure'));

    // Categorize the failure by type
    const categorizeButton = getAllByRole('button', { name: 'Categorize' })[0];
    fireEvent.click(categorizeButton);

    // Verify that an error message is displayed
    await waitFor(() => {
      expect(getByText('Error: Invalid failure type')).toBeInTheDocument();
    });
  });
});
