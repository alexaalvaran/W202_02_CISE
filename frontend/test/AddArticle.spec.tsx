// CreateArticleComponent.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateArticleComponent from '../src/components/articles/AddArticle';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';

// Mock useRouter from Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CreateArticleComponent', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    mockPush.mockClear();
    // Mock the global fetch function
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks(); // Reset mocks after each test
  });

  it('renders the form and submit button', () => {
    render(<CreateArticleComponent />);

    const submitButton = screen.getByText('Submit article');
    expect(submitButton).toBeInTheDocument();
  });

  it('submits the form and navigates to /confirmSubmit', async () => {
    // Mock a successful fetch response
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<CreateArticleComponent />);

    // Fill in the required fields
    fireEvent.change(screen.getByPlaceholderText('Title of Article'), {
      target: { value: 'Software Article' },
    });
    fireEvent.change(screen.getByPlaceholderText('Author(s) of Article'), {
      target: { value: 'SE' },
    });
    fireEvent.change(screen.getByPlaceholderText('Publication Year of Article'), {
      target: { value: '2024' },
    });

    const submitButton = screen.getByText('Submit article');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles`,
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/confirmSubmit'));
  });

  it('displays error if submission fails', async () => {
    // Mock a failed fetch response
    (fetch as jest.Mock).mockRejectedValue(new Error('Failed to submit'));

    render(<CreateArticleComponent />);

    // Fill in the required fields
    fireEvent.change(screen.getByPlaceholderText('Title of Article'), {
      target: { value: 'Software Article' },
    });
    fireEvent.change(screen.getByPlaceholderText('Author(s) of Article'), {
      target: { value: 'SE' },
    });
    fireEvent.change(screen.getByPlaceholderText('Publication Year of Article'), {
      target: { value: '2024' },
    });

    const submitButton = screen.getByText('Submit article');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles`,
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });

    // Expect navigation not to be called if there's an error
    await waitFor(() => expect(mockPush).not.toHaveBeenCalled());
  });
});