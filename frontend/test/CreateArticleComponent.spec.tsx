import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';
import CreateArticleComponent from '@/components/articles/AddArticle';


jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CreateArticleComponent', () => {
  const mockPush = jest.fn();
  const mockRouter = {
    push: mockPush,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form correctly', () => {
    render(<CreateArticleComponent />);

    expect(
      screen.getByPlaceholderText(/Title of Article/i),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Author\(s\) of Article/i),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Source of Article/i),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Publication Year of Article/i),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/DOI of Article/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Example: abc@email.com/i),
    ).toBeInTheDocument();
  });

  it('submits the form with correct data', async () => {
    render(<CreateArticleComponent />);

    fireEvent.change(screen.getByPlaceholderText(/Title of Article/i), {
      target: { value: 'Test Article' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Author\(s\) of Article/i), {
      target: { value: 'Adrienne' },
    });
    fireEvent.change(
      screen.getByPlaceholderText(/Publication Year of Article/i),
      {
        target: { value: '2024' },
      },
    );

    fireEvent.click(screen.getByText(/Submit article/i));

    //checks fetch was called with correct body
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/articles'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Test Article',
          authors: 'Adrienne',
          pubyear: '2024',
        }),
      }),
    );

    //check navigation occurred after submission
    expect(mockPush).toHaveBeenCalledWith('/confirmSubmit');
  });

  it('handles submission errors gracefully', async () => {
    //mock fetch to reject
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Submission failed')),
    ) as jest.Mock;

    render(<CreateArticleComponent />);

    fireEvent.change(screen.getByPlaceholderText(/Title of Article/i), {
      target: { value: 'Test Article' },
    });

    fireEvent.click(screen.getByText(/Submit article/i));
  });
});