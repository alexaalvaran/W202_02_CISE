import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ShowArticle from '../ShowArticle';
import '@testing-library/jest-dom';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useParams: () => ({
    id: '1',
  }),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () =>
      Promise.resolve({
        _id: '1',
        title: 'Test Article',
        authors: 'John Doe',
        pubyear: '2021',
        email: 'john.doe@example.com',
        doi: '10.1000/xyz123',
        practice: 'Agile',
        claim: 'Increases productivity',
        evidence: 'Empirical study',
      }),
  } as Response)
);

describe('ShowArticle component', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test('displays article details correctly', async () => {
    render(<ShowArticle />);

    await waitFor(() => {
      expect(screen.getByText(/Title:/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Article/i)).toBeInTheDocument();
      expect(screen.getByText(/Author:/i)).toBeInTheDocument();
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/Publication Year:/i)).toBeInTheDocument();
      expect(screen.getByText(/2021/i)).toBeInTheDocument();
      expect(screen.getByText(/Email:/i)).toBeInTheDocument();
      expect(screen.getByText(/john.doe@example.com/i)).toBeInTheDocument();
      expect(screen.getByText(/DOI:/i)).toBeInTheDocument();
      expect(screen.getByText(/10.1000\/xyz123/i)).toBeInTheDocument();
      expect(screen.getByText(/Practice:/i)).toBeInTheDocument();
      expect(screen.getByText(/Agile/i)).toBeInTheDocument();
      expect(screen.getByText(/Claim:/i)).toBeInTheDocument();
      expect(screen.getByText(/Increases productivity/i)).toBeInTheDocument();
      expect(screen.getByText(/Evidence:/i)).toBeInTheDocument();
      expect(screen.getByText(/Empirical study/i)).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  /* test('navigates back to search page when "Return to Search" button is clicked', async () => {
    const { push } = useRouter();

    render(<ShowArticle />);

    const button = screen.getByRole('button', { name: /Return to Search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/search');
    });
  });

  test('displays loading state when article is being fetched', () => {
    render(<ShowArticle />);

    expect(screen.getByText(/Loading article.../i)).toBeInTheDocument();
  }); */
});
