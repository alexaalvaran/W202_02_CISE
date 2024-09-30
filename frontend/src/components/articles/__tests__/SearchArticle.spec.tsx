import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchArticle from '../SearchArticle';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mocking the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve([
      {
        _id: '1',
        title: 'Test Article',
        authors: 'John Doe',
        pubyear: '2021',
        practice: 'Test-Driven Development (TDD)',
        claim: 'Agree',
      },
      {
        _id: '2',
        title: 'Second Article',
        authors: 'Jane Doe',
        pubyear: '2020',
        practice: 'Pair Programming',
        claim: 'Disagree',
      },
    ]),
  } as Response)
);

describe('SearchArticle component', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test('searches articles and displays results based on practice and claim', async () => {
    render(<SearchArticle />);

    // Set input values for practice and claim
    fireEvent.change(screen.getByLabelText(/Practice/i), { target: { value: 'Test-Driven Development (TDD)' } });
    fireEvent.change(screen.getByLabelText(/Claim/i), { target: { value: 'Agree' } });

    // Click the search button
    fireEvent.click(screen.getByRole('button', { name: /Search/i }));

    // Wait for search results to be displayed and match them by their respective content
    await waitFor(() => {
      // Use findByText which automatically waits for the element
      expect(screen.findByText('Test Article')).resolves.toBeInTheDocument();
      expect(screen.findByText('John Doe')).resolves.toBeInTheDocument();
      expect(screen.findByText('2021')).resolves.toBeInTheDocument();
      expect(screen.findByText('Test-Driven Development (TDD)')).resolves.toBeInTheDocument();
      expect(screen.findByText('Agree')).resolves.toBeInTheDocument();
    });

    // Ensure the fetch call was made
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('displays no results message when no articles match search criteria', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve([]),
      } as Response)
    );

    render(<SearchArticle />);

    // Input non-existing practice and claim
    fireEvent.change(screen.getByLabelText(/Practice/i), { target: { value: 'Non-existing Practice' } });
    fireEvent.change(screen.getByLabelText(/Claim/i), { target: { value: 'Agree' } });

    fireEvent.click(screen.getByRole('button', { name: /Search/i }));

    await waitFor(() => {
      expect(screen.findByText(/No articles found/i)).resolves.toBeInTheDocument();
    });
  });
});
