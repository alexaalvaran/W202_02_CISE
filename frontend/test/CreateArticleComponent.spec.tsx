import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // For DOM-related assertions
import { useRouter } from 'next/navigation'; // Import useRouter to mock it
import CreateArticleComponent from '@/components/articles/AddArticle';

// Mock the useRouter hook from next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CreateArticleComponent', () => {
  const mockPush = jest.fn(); // Create a mock function for push

  beforeEach(() => {
    // Mock the return value of useRouter to include the push method
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test to avoid interference between tests
  });

  it('renders the form correctly', () => {
    render(<CreateArticleComponent />);

    // Check that form fields are rendered
    expect(screen.getByPlaceholderText('Title of Article')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Author(s) of Article')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Source of Article')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Publication Year of Article')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('DOI of Article')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Example: abc@email.com')).toBeInTheDocument();

    // Check that the submit button is rendered
    expect(screen.getByText('Submit article')).toBeInTheDocument();
  });
});