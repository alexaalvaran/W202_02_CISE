import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddArticleInfo from '@/components/articles/AddArticleInfo';
import '@testing-library/jest-dom'; 
import { useRouter, useParams } from 'next/navigation';

//mock for the necessary hooks from Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

describe('AddArticleInfo', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    (useParams as jest.Mock).mockReturnValue({ id: '123' });
  });

  it('renders the form correctly', () => {
    render(<AddArticleInfo />);

    //checks article details are present in the form
    expect(screen.getByText('Claim & Evidence Page')).toBeInTheDocument();
    expect(screen.getByText('Article Details')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Author')).toBeInTheDocument();

    //checks form elements are rendered
    expect(screen.getByRole('button', { name: 'Update Article' })).toBeInTheDocument();
  });

  it('handles evidence selection change', () => {
    render(<AddArticleInfo />);

    const evidenceSelect = screen.getByLabelText(/Choose an Evidence/i);
    
    //simulate changing evidence and using the dropdown
    fireEvent.change(evidenceSelect, { target: { value: 'scrum' } });
    
    //check if the value has changed to 'scrum'
    expect(evidenceSelect).toHaveValue('scrum');
  });

  it('handles claim selection change', () => {
    render(<AddArticleInfo />);

    const claimSelect = screen.getByLabelText(/Choose a Claim/i);
    
    //simulate changing and using the claim dropdown
    fireEvent.change(claimSelect, { target: { value: 'Agree' } });
    
    //checks the value has changed to 'Agree'
    expect(claimSelect).toHaveValue('Agree');
  });

  it('submits the form with updated article data', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<AddArticleInfo />);

    //simulate form submission
    const updateButton = screen.getByRole('button', { name: /Update Article/i });
    fireEvent.click(updateButton);

    //Ensure the form submission triggers a router push
    expect(mockPush).toHaveBeenCalled();
  });
});
