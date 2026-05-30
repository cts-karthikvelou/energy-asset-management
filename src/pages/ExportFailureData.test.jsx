import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExportFailureData from './ExportFailureData';
import '@testing-library/jest-dom';

describe('ExportFailureData Component', () => {
  beforeEach(() => {
    render(<ExportFailureData />);
  });

  test('renders the component correctly', () => {
    // Check for the heading
    expect(screen.getByRole('heading', { name: /Export Failure Data/i })).toBeInTheDocument();

    // Check for the export button
    expect(screen.getByRole('button', { name: /Export to CSV\/Excel/i })).toBeInTheDocument();
  });

  test('handles export button click without crashing', () => {
    const exportButton = screen.getByRole('button', { name: /Export to CSV\/Excel/i });
    fireEvent.click(exportButton);
  });
});