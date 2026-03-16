import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategorizeFailures from './CategorizeFailures';

describe('CategorizeFailures Component', () => {
  
  ### 1. Initial Render Test
  test('renders input fields and add button', () => {
    render(<CategorizeFailures />);
    
    expect(screen.getByPlaceholderText(/enter failure/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter type/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add failure/i })).toBeInTheDocument();
  });

  ### 2. Adding and Categorizing Test
  test('adds failures and groups them by type correctly', () => {
    render(<CategorizeFailures />);
    
    const failureInput = screen.getByPlaceholderText(/enter failure/i);
    const typeInput = screen.getByPlaceholderText(/enter type/i);
    const addButton = screen.getByRole('button', { name: /add failure/i });

    // Add first failure (Hardware)
    fireEvent.change(failureInput, { target: { value: 'Broken Screen' } });
    fireEvent.change(typeInput, { target: { value: 'Hardware' } });
    fireEvent.click(addButton);

    // Add second failure (Software)
    fireEvent.change(failureInput, { target: { value: 'App Crash' } });
    fireEvent.change(typeInput, { target: { value: 'Software' } });
    fireEvent.click(addButton);

    // Add third failure (Hardware again)
    fireEvent.change(failureInput, { target: { value: 'Battery Drain' } });
    fireEvent.change(typeInput, { target: { value: 'Hardware' } });
    fireEvent.click(addButton);

    // Assert Hardware category exists and has two items
    expect(screen.getByText('Hardware')).toBeInTheDocument();
    expect(screen.getByText('Broken Screen')).toBeInTheDocument();
    expect(screen.getByText('Battery Drain')).toBeInTheDocument();

    // Assert Software category exists and has one item
    expect(screen.getByText('Software')).toBeInTheDocument();
    expect(screen.getByText('App Crash')).toBeInTheDocument();
  });

  ### 3. Empty Input Validation Test
  test('does not add failure if inputs are empty', () => {
    render(<CategorizeFailures />);
    const addButton = screen.getByRole('button', { name: /add failure/i });

    fireEvent.click(addButton);

    const listItems = screen.queryByRole('listitem');
    expect(listItems).not.toBeInTheDocument();
  });

  ### 4. Bug Regression Test (The "null" initial value)
  test('does not throw error when rendering with failures', () => {
    // This test specifically checks if the .reduce initial value causes a crash
    // Note: If you haven't changed `null` to `{}` in your code yet, this test will fail!
    expect(() => render(<CategorizeFailures />)).not.toThrow();
  });
});
