import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddArticleInfo from '@/components/articles/AddArticleInfo';
import { useRouter, useParams } from 'next/navigation';

// Mock useRouter and useParams from next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

describe('AddArticleInfo Component', () => {
  const mockArticle = {
    title: 'Test Title',
    authors: 'John Doe',
    sources: 'Test Source',
    pubyear: '2024',
    email: 'test@example.com',
    doi: '10.1234/example',
    evidence: 'scrum',
    claim: 'Agree',
  };

  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({ id: '123' });
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });

    // Mock the global fetch function to return a valid Response object
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true, // Simulate a successful fetch
        status: 200,
        json: () => Promise.resolve(mockArticle),
      } as Response)
    );
  });

  it('renders the component and fetches article data', async () => {
    render(<AddArticleInfo />);

    // Check that title is displayed
    await waitFor(() => expect(screen.getByText('Test Title')).toBeInTheDocument());
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Test Source')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('10.1234/example')).toBeInTheDocument();
  });

  it('allows selecting evidence and claim options', async () => {
    render(<AddArticleInfo />);

    // Wait for the article data to be loaded
    await waitFor(() => expect(screen.getByText('Test Title')).toBeInTheDocument());

    // Find the select elements using getByLabelText
    const evidenceSelect = screen.getByLabelText('Choose an Evidence');
    const claimSelect = screen.getByLabelText('Choose a Claim');

    // Simulate selecting new options
    fireEvent.change(evidenceSelect, { target: { value: 'agile' } });
    fireEvent.change(claimSelect, { target: { value: 'Disagree' } });

    expect(evidenceSelect).toHaveValue('agile');
    expect(claimSelect).toHaveValue('Disagree');
  });

  it('submits the form with updated article data', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<AddArticleInfo />);

    // Wait for the article data to be loaded
    await waitFor(() => expect(screen.getByText('Test Title')).toBeInTheDocument());

    // Simulate form submission
    fireEvent.submit(screen.getByRole('button', { name: /update article/i }));

    // Expect fetch to be called with the updated article data
    await waitFor(() =>
      expect(global.fetch).toHaveBeenCalledWith(
        process.env.NEXT_PUBLIC_BACKEND_URL + '/api/articles/123',
        expect.objectContaining({
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(mockArticle),
        })
      )
    );

    // Expect router.push to be called after successful update
    expect(mockPush).toHaveBeenCalledWith('/show-articles/123');
  });
});