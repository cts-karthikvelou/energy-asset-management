import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { EscalateUnresolvedFailures } from './EscalateUnresolvedFailures';

describe('EscalateUnresolvedFailures-new-feat-test', () => {
  it('should fetch unresolved failures and display them', async () => {
    const mockFetch = jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: 1, description: 'Failure 1', status: 'Unresolved' }]),
      })
    );

    const { getByText } = render(<EscalateUnresolvedFailures />);

    await waitFor(() => getByText('Failure 1'));

    expect(mockFetch).toHaveBeenCalledWith('/api/unresolved-failures');
    mockFetch.mockRestore();
  });

  it('should escalate unresolved failure and update escalation history', async () => {
    const mockFetch = jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve([{ id: 1, description: 'Failure 1', status: 'Unresolved' }]),
      })
    );

    const { getByText, getByRole } = render(<EscalateUnresolvedFailures />);

    await waitFor(() => getByText('Failure 1'));

    const escalateButton = getByText('Escalate');
    fireEvent.click(escalateButton);

    await waitFor(() => getByText('Failure 1 (Escalated at:)'));

    expect(mockFetch).toHaveBeenCalledWith('/api/unresolved-failures');
    mockFetch.mockRestore();
  });
});
