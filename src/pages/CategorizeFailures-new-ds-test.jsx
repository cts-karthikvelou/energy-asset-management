import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CategorizeFailures from './CategorizeFailures';

test('renders the form correctly', () => {
  const { getByLabelText } = render(<CategorizeFailures />);
  const form = getByLabelText('Select Priority:');
  expect(form).toBeInTheDocument();
});

test('populates the priority dropdown menu with the correct options', () => {
  const { getByText } = render(<CategorizeFailures />);
  const options = ['Select', 'Low', 'Medium', 'High'];
  options.forEach((option) => {
    expect(getByText(option)).toBeInTheDocument();
  });
});

test('updates the priority state correctly', () => {
  const { getByLabelText } = render(<CategorizeFailures />);
  const select = getByLabelText('Select Priority:');
  fireEvent.change(select, { target: { value: 'medium' } });
  expect(select.value).toBe('medium');
});

test('logs the correct message when a valid priority is selected', async () => {
  const { getByText } = render(<CategorizeFailures />);
  const select = getByLabelText('Select Priority:');
  fireEvent.change(select, { target: { value: 'medium' } });
  const submitButton = getByText('Categorize Failures');
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(console.log).toHaveBeenCalledWith('Failures categorized by type:', 'medium');
  });
});

test('logs the correct message when no priority is selected', async () => {
  const { getByText } = render(<CategorizeFailures />);
  const submitButton = getByText('Categorize Failures');
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(console.log).toHaveBeenCalledWith('Please select a valid priority.');
  });
});
