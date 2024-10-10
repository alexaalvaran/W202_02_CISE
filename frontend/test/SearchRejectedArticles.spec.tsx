import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchRejectedArticles from '../RejectedArticlesList';
import '@testing-library/jest-dom';

// Mock the useRouter from 'next/navigation'
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mocking the fetch API globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () =>
      Promise.resolve([
        {
          _id: '1',
          title: 'Rejected Article 1',
          authors: 'John Doe',
          pubyear: '2022',
          rejectedDate: '2023-09-15T12:00:00Z',
        },
        {
          _id: '2',
          title: 'Rejected Article 2',
          authors: 'Jane Smith',
          pubyear: '2021',
          rejectedDate: '2023-09-16T12:00:00Z',
        },
      ]),
  } as Response)
);

describe('SearchRejectedArticles component', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test('searches rejected articles and displays results based on title and author', async () => {
    render(<SearchRejectedArticles />);

    // Set input values for title and author
    fireEvent.change(screen.getByLabelText(/Article Title/i), {
      target: { value: 'Rejected Article 1' },
    });
    fireEvent.change(screen.getByLabelText(/Author/i), {
      target: { value: 'John Doe' },
    });

    // Click the search button
    fireEvent.click(screen.getByRole('button', { name: /Search/i }));

    // Wait for the search results to be displayed
    await waitFor(() => {
      expect(screen.getByText(/Rejected Article 1/i)).toBeInTheDocument();
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/2022/i)).toBeInTheDocument();
      expect(screen.getByText(/9\/15\/2023/i)).toBeInTheDocument();
    });

    // Ensure the fetch call was made
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('displays no results message when no rejected articles match search criteria', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve([]), // Simulate no matching articles
      } as Response)
    );

    render(<SearchRejectedArticles />);

    // Input non-existing title and author
    fireEvent.change(screen.getByLabelText(/Article Title/i), {
      target: { value: 'Non-existing Title' },
    });
    fireEvent.change(screen.getByLabelText(/Author/i), {
      target: { value: 'Non-existing Author' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Search/i }));

    // Wait for the "No rejected articles found" message to appear
    await waitFor(() => {
      expect(screen.getByText(/No rejected articles found/i)).toBeInTheDocument();
    });
  });
});
