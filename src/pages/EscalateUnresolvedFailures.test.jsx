import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import EscalateUnresolvedFailures from './EscalateUnresolvedFailures';
import '@testing-library/jest-dom';

describe('EscalateUnresolvedFailures Component', () => {
  test('renders the component correctly with headings', () => {
    render(<EscalateUnresolvedFailures />);
    expect(screen.getByRole('heading', { name: /Escalate Unresolved Failures/i, level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Unresolved Failures/i, level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Escalated Failures/i, level: 3 })).toBeInTheDocument();
  });

  test('displays initial unresolved failures', () => {
    const initialFailures = [
      { id: 1, description: 'Failure A' },
      { id: 2, description: 'Failure B' },
    ];

    render(<EscalateUnresolvedFailures initialFailures={initialFailures} />);

    expect(screen.getByText('Failure A')).toBeInTheDocument();
    expect(screen.getByText('Failure B')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /Escalate/i })).toHaveLength(2);
  });

  test('escalates a failure from unresolved to escalated list', () => {
    const initialFailures = [
      { id: 1, description: 'Failure A' },
      { id: 2, description: 'Failure B' },
    ];
    
    render(<EscalateUnresolvedFailures initialFailures={initialFailures} />);

    const unresolvedList = screen.getByRole('heading', { name: /Unresolved Failures/i, level: 3 }).parentElement;
    const escalatedList = screen.getByRole('heading', { name: /Escalated Failures/i, level: 3 }).parentElement;

    // Check initial state
    expect(within(unresolvedList).getByText('Failure A')).toBeInTheDocument();
    expect(within(unresolvedList).getByText('Failure B')).toBeInTheDocument();
    expect(within(escalatedList).queryByText('Failure A')).not.toBeInTheDocument();

    // Find the escalate button for "Failure A" and click it
    const failureAItem = within(unresolvedList).getByText('Failure A').closest('li');
    const escalateButton = within(failureAItem).getByRole('button', { name: /Escalate/i });
    fireEvent.click(escalateButton);

    // Check that "Failure A" is now in the escalated list and not in the unresolved list
    expect(within(escalatedList).getByText('Failure A')).toBeInTheDocument();
    expect(within(unresolvedList).queryByText('Failure A')).not.toBeInTheDocument();
    
    // Check that "Failure B" is still in the unresolved list
    expect(within(unresolvedList).getByText('Failure B')).toBeInTheDocument();
  });
});