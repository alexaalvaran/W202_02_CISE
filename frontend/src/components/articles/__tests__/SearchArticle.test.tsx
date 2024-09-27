// SearchArticle.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchArticle from '../SearchArticle';
import { useRouter } from 'next/navigation';
import '@testing-library/jest-dom';

// Mock useRouter from Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('SearchArticle Component', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    mockPush.mockClear();
    global.fetch = jest.fn(); // Mock global fetch
  });

  afterEach(() => {
    jest.resetAllMocks(); // Reset mocks after each test
  });

  it('renders the form and search button', () => {
    render(<SearchArticle />);

    expect(screen.getByText('Search Articles')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('performs a search and displays results', async () => {
    // Mock a successful fetch response with article data
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          _id: '1',
          title: 'Software Engineering Practices',
          authors: 'John Doe',
          pubyear: '2024',
          practice: 'Agile Development',
          claim: 'Improves teamwork',
        },
      ],
    });

    render(<SearchArticle />);

    // Fill in the search fields
    fireEvent.change(screen.getByPlaceholderText('Enter article title'), {
      target: { value: 'Software' },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter author's name"), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter publication year'), {
      target: { value: '2024' },
    });

    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/`
      );
    });

    // Expect results to be displayed
    await waitFor(() => {
      expect(screen.getByText('Software Engineering Practices')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('2024')).toBeInTheDocument();
    });
  });

  it('displays a message if no articles are found', async () => {
    // Mock a fetch response with no results
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<SearchArticle />);

    fireEvent.change(screen.getByPlaceholderText('Enter article title'), {
      target: { value: 'Non-existent Article' },
    });
    fireEvent.click(screen.getByText('Search'));

    // Expect no articles found message
    await waitFor(() => {
      expect(screen.getByText('No articles found. Please adjust your search criteria.')).toBeInTheDocument();
    });
  });

  it('handles fetch errors', async () => {
    // Mock a failed fetch response
    (fetch as jest.Mock).mockRejectedValue(new Error('Failed to fetch articles'));

    render(<SearchArticle />);

    fireEvent.change(screen.getByPlaceholderText('Enter article title'), {
      target: { value: 'Error Article' },
    });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    // Expect no articles found message (or error handling message, if implemented)
    await waitFor(() => {
      expect(screen.getByText('No articles found. Please adjust your search criteria.')).toBeInTheDocument();
    });
  });

  it('navigates to article details when a result is clicked', async () => {
    // Mock a successful fetch response with article data
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          _id: '1',
          title: 'Software Engineering Practices',
          authors: 'John Doe',
          pubyear: '2024',
          practice: 'Agile Development',
          claim: 'Improves teamwork',
        },
      ],
    });

    render(<SearchArticle />);

    fireEvent.change(screen.getByPlaceholderText('Enter article title'), {
      target: { value: 'Software' },
    });
    fireEvent.click(screen.getByText('Search'));

    // Wait for articles to be rendered
    await waitFor(() => {
      expect(screen.getByText('Software Engineering Practices')).toBeInTheDocument();
    });

    // Click on the article card
    fireEvent.click(screen.getByText('Software Engineering Practices'));

    // Expect navigation to be triggered
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/show-article/1');
    });
  });
});
