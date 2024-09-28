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
        practice: 'Agile',
        claim: 'Increases productivity',
      },
      {
        _id: '2',
        title: 'Second Article',
        authors: 'Jane Doe',
        pubyear: '2020',
        practice: 'DevOps',
        claim: 'Reduces errors',
      },
    ]),
  } as Response)
);

describe('SearchArticle component', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test('renders SearchArticle component with form fields', () => {
    render(<SearchArticle />);

    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Author/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Publication Year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Search By/i)).toBeInTheDocument();

    // Initially, "Software Engineering Practice" should be visible
    expect(screen.getByLabelText(/Software Engineering Practice/i)).toBeInTheDocument();

    // Change the search type to "claim"
    fireEvent.change(screen.getByLabelText(/Search By/i), { target: { value: 'claim' } });

    // Now, the "Software Engineering Claim" label should be visible
    expect(screen.getByLabelText(/Software Engineering Claim/i)).toBeInTheDocument();
  });

  test('searches articles and displays results for practice', async () => {
    render(<SearchArticle />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Article' } });
    fireEvent.change(screen.getByLabelText(/Author/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Publication Year/i), { target: { value: '2021' } });
    fireEvent.change(screen.getByLabelText(/Software Engineering Practice/i), { target: { value: 'Agile' } });

    // Make the button selection more specific
    fireEvent.click(screen.getByRole('button', { name: /Search/i }));

    await waitFor(() => {
      expect(screen.getByText('Test Article')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('2021')).toBeInTheDocument();
      expect(screen.getByText('Agile')).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('searches articles by claim and displays results', async () => {
    render(<SearchArticle />);

    // Change search type to "claim"
    fireEvent.change(screen.getByLabelText(/Search By/i), { target: { value: 'claim' } });

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Test Article' } });
    fireEvent.change(screen.getByLabelText(/Author/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Publication Year/i), { target: { value: '2021' } });
    fireEvent.change(screen.getByLabelText(/Software Engineering Claim/i), { target: { value: 'Increases productivity' } });

    // Make the button selection more specific
    fireEvent.click(screen.getByRole('button', { name: /Search/i }));

    await waitFor(() => {
      expect(screen.getByText('Test Article')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('2021')).toBeInTheDocument();
      expect(screen.getByText('Increases productivity')).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('displays no results message when no articles match search criteria for practice', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve([]),
      } as Response)
    );

    render(<SearchArticle />);

    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Non-existing Article' } });

    // Make the button selection more specific
    fireEvent.click(screen.getByRole('button', { name: /Search/i }));

    await waitFor(() => {
      expect(screen.getByText(/No articles found/i)).toBeInTheDocument();
    });
  });

  test('displays no results message when no articles match search claim', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve([]),
      } as Response)
    );

    render(<SearchArticle />);

    // Change search type to "claim"
    fireEvent.change(screen.getByLabelText(/Search By/i), { target: { value: 'claim' } });
    
    fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Non-existing Article' } });
    
    // Make the button selection more specific
    fireEvent.click(screen.getByRole('button', { name: /Search/i }));

    await waitFor(() => {
      expect(screen.getByText(/No articles found/i)).toBeInTheDocument();
    });
  });

  test('handles API errors gracefully', async () => {
    (fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      } as Response)
    );

    render(<SearchArticle />);

    // Make the button selection more specific
    fireEvent.click(screen.getByRole('button', { name: /Search/i }));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    consoleSpy.mockRestore();
  });
});
