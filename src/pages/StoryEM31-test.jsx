import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import StoryEM31 from './StoryEM31';

describe('StoryEM31 Component', () => {
  test('renders form fields', () => {
    const { getByLabelText } = render(<StoryEM31 />);
    expect(getByLabelText('Title:')).toBeInTheDocument();
    expect(getByLabelText('Description:')).toBeInTheDocument();
    expect(getByLabelText('Priority:')).toBeInTheDocument();
    expect(getByLabelText('Status:')).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    const mockHandleSubmit = jest.fn();
    const { getByText, getByLabelText } = render(
      <StoryEM31 handleSubmit={mockHandleSubmit} />
    );

    fireEvent.change(getByLabelText('Title:'), {
      target: { value: 'Test Title' },
    });
    fireEvent.change(getByLabelText('Description:'), {
      target: { value: 'Test Description' },
    });

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
      expect(mockHandleSubmit).toHaveBeenCalledWith({
        title: 'Test Title',
        description: 'Test Description',
        priority: 'Medium',
        status: 'To Do',
      });
    });
  });

  test('validates input fields', async () => {
    const { getByText, getByLabelText } = render(<StoryEM31 />);

    fireEvent.change(getByLabelText('Title:'), {
      target: { value: '' },
    });

    fireEvent.click(getByText('Submit'));

    await waitFor(() => {
      expect(getByLabelText('Title:')).toHaveClass('error');
    });
  });

  test('updates form state on input change', async () => {
    const { getByLabelText } = render(<StoryEM31 />);

    fireEvent.change(getByLabelText('Title:'), {
      target: { value: 'New Title' },
    });

    await waitFor(() => {
      expect(getByLabelText('Title:')).toHaveValue('New Title');
    });
  });
});
