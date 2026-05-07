import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CategorizeFailures from './CategorizeFailures';

describe('CategorizeFailures Component', () => {
  test('renders the component correctly with title and labels', () => {
    render(<CategorizeFailures />);
    
    expect(screen.getByText('Categorize Failures by Type')).toBeInTheDocument();
    expect(screen.getByText('Categorized Failures')).toBeInTheDocument();
  });

  test('renders input fields with correct placeholders', () => {
    render(<CategorizeFailures />);
    
    const failureInput = screen.getByPlaceholderText('Enter failure');
    const typeInput = screen.getByPlaceholderText('Enter type');
    const addButton = screen.getByRole('button', { name: /Add Failure/i });
    
    expect(failureInput).toBeInTheDocument();
    expect(typeInput).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();
  });

  test('updates input values when user types', () => {
    render(<CategorizeFailures />);
    
    const failureInput = screen.getByPlaceholderText('Enter failure');
    const typeInput = screen.getByPlaceholderText('Enter type');
    
    fireEvent.change(failureInput, { target: { value: 'Motor failure' } });
    fireEvent.change(typeInput, { target: { value: 'Mechanical' } });
    
    expect(failureInput.value).toBe('Motor failure');
    expect(typeInput.value).toBe('Mechanical');
  });

  test('adds failure when both fields are filled and button is clicked', () => {
    render(<CategorizeFailures />);
    
    const failureInput = screen.getByPlaceholderText('Enter failure');
    const typeInput = screen.getByPlaceholderText('Enter type');
    const addButton = screen.getByRole('button', { name: /Add Failure/i });
    
    fireEvent.change(failureInput, { target: { value: 'Pump breakdown' } });
    fireEvent.change(typeInput, { target: { value: 'Hydraulic' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('Hydraulic')).toBeInTheDocument();
    expect(screen.getByText('Pump breakdown')).toBeInTheDocument();
  });

  test('clears input fields after adding a failure', () => {
    render(<CategorizeFailures />);
    
    const failureInput = screen.getByPlaceholderText('Enter failure');
    const typeInput = screen.getByPlaceholderText('Enter type');
    const addButton = screen.getByRole('button', { name: /Add Failure/i });
    
    fireEvent.change(failureInput, { target: { value: 'Sensor malfunction' } });
    fireEvent.change(typeInput, { target: { value: 'Electrical' } });
    fireEvent.click(addButton);
    
    expect(failureInput.value).toBe('');
    expect(typeInput.value).toBe('');
  });

  test('does not add failure when failure field is empty', () => {
    render(<CategorizeFailures />);
    
    const typeInput = screen.getByPlaceholderText('Enter type');
    const addButton = screen.getByRole('button', { name: /Add Failure/i });
    
    fireEvent.change(typeInput, { target: { value: 'Type' } });
    fireEvent.click(addButton);
    
    expect(screen.queryByText('Type')).not.toBeInTheDocument();
  });

  test('does not add failure when type field is empty', () => {
    render(<CategorizeFailures />);
    
    const failureInput = screen.getByPlaceholderText('Enter failure');
    const addButton = screen.getByRole('button', { name: /Add Failure/i });
    
    fireEvent.change(failureInput, { target: { value: 'Failure' } });
    fireEvent.click(addButton);
    
    expect(screen.queryByText('Failure')).not.toBeInTheDocument();
  });

  test('does not add failure when only one field is filled', () => {
    render(<CategorizeFailures />);
    
    const failureInput = screen.getByPlaceholderText('Enter failure');
    const addButton = screen.getByRole('button', { name: /Add Failure/i });
    
    fireEvent.change(failureInput, { target: { value: 'Cable short' } });
    fireEvent.click(addButton);
    
    expect(screen.queryByText('Cable short')).not.toBeInTheDocument();
  });

  test('does not add failure when fields contain only whitespace', () => {
    render(<CategorizeFailures />);
    
    const failureInput = screen.getByPlaceholderText('Enter failure');
    const typeInput = screen.getByPlaceholderText('Enter type');
    const addButton = screen.getByRole('button', { name: /Add Failure/i });
    
    fireEvent.change(failureInput, { target: { value: '   ' } });
    fireEvent.change(typeInput, { target: { value: '   ' } });
    fireEvent.click(addButton);
    
    expect(screen.queryByText('   ')).not.toBeInTheDocument();
  });

  test('categorizes multiple failures by type', () => {
    render(<CategorizeFailures />);
    
    const failureInput = screen.getByPlaceholderText('Enter failure');
    const typeInput = screen.getByPlaceholderText('Enter type');
    const addButton = screen.getByRole('button', { name: /Add Failure/i });
    
    // Add first failure
    fireEvent.change(failureInput, { target: { value: 'Motor failure' } });
    fireEvent.change(typeInput, { target: { value: 'Mechanical' } });
    fireEvent.click(addButton);
    
    // Add second failure with same type
    fireEvent.change(failureInput, { target: { value: 'Belt wear' } });
    fireEvent.change(typeInput, { target: { value: 'Mechanical' } });
    fireEvent.click(addButton);
    
    // Add failure with different type
    fireEvent.change(failureInput, { target: { value: 'Wiring issue' } });
    fireEvent.change(typeInput, { target: { value: 'Electrical' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('Mechanical')).toBeInTheDocument();
    expect(screen.getByText('Electrical')).toBeInTheDocument();
    expect(screen.getByText('Motor failure')).toBeInTheDocument();
    expect(screen.getByText('Belt wear')).toBeInTheDocument();
    expect(screen.getByText('Wiring issue')).toBeInTheDocument();
  });

  test('renders empty state when no failures are added', () => {
    render(<CategorizeFailures />);
    
    expect(screen.getByText('Categorized Failures')).toBeInTheDocument();
    expect(screen.queryAllByRole('heading', { level: 4 })).toHaveLength(0);
  });

  test('maintains correct state after multiple operations', () => {
    render(<CategorizeFailures />);
    
    const failureInput = screen.getByPlaceholderText('Enter failure');
    const typeInput = screen.getByPlaceholderText('Enter type');
    const addButton = screen.getByRole('button', { name: /Add Failure/i });
    
    // Add, verify inputs clear, add again
    fireEvent.change(failureInput, { target: { value: 'First' } });
    fireEvent.change(typeInput, { target: { value: 'Type1' } });
    fireEvent.click(addButton);
    
    expect(failureInput.value).toBe('');
    expect(typeInput.value).toBe('');
    
    fireEvent.change(failureInput, { target: { value: 'Second' } });
    fireEvent.change(typeInput, { target: { value: 'Type2' } });
    fireEvent.click(addButton);
    
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  test('renders correct list structure with multiple types', () => {
    render(<CategorizeFailures />);
    
    const failureInput = screen.getByPlaceholderText('Enter failure');
    const typeInput = screen.getByPlaceholderText('Enter type');
    const addButton = screen.getByRole('button', { name: /Add Failure/i });
    
    fireEvent.change(failureInput, { target: { value: 'Failure1' } });
    fireEvent.change(typeInput, { target: { value: 'Type1' } });
    fireEvent.click(addButton);
    
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(1);
    expect(listItems[0]).toHaveTextContent('Failure1');
  });

  test('renders snapshot correctly', () => {
    const { asFragment } = render(<CategorizeFailures />);
    expect(asFragment()).toMatchSnapshot();
  });
});
