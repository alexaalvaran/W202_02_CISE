// AuthUserComponent.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthUserComponent from '../src/components/users/AuthUser';
import { useRouter } from 'next/navigation';

// Mock useRouter from Next.js
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AuthUserComponent', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    mockPush.mockClear();
    global.fetch = jest.fn(); // Mock the global fetch function
  });

  afterEach(() => {
    jest.resetAllMocks(); // Reset mocks after each test
  });

  it('renders the login form', () => {
    render(<AuthUserComponent />);

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument(); // Use getByRole for the button
  });

  it('submits the form and navigates to /moderate on successful login', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    });

    render(<AuthUserComponent />);

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    const submitButton = screen.getByRole('button', { name: 'Login' }); // Use getByRole for the button
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`,
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/moderate'));
  });

  it('alerts on 404 response', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 404,
    });

    window.alert = jest.fn(); // Mock alert

    render(<AuthUserComponent />);

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    const submitButton = screen.getByRole('button', { name: 'Login' }); // Use getByRole for the button
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('User not found');
    });
  });

  it('alerts on 401 response', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 401,
    });

    window.alert = jest.fn(); // Mock alert

    render(<AuthUserComponent />);

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    const submitButton = screen.getByRole('button', { name: 'Login' }); // Use getByRole for the button
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Incorrect password. Please try again.');
    });
  });

  it('alerts on 403 response and navigates to /analyse', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      status: 403,
    });

    render(<AuthUserComponent />);

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    const submitButton = screen.getByRole('button', { name: 'Login' }); // Use getByRole for the button
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/analyse');
    });
  });

  it('alerts on network error', async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error('Network Error'));

    window.alert = jest.fn(); // Mock alert

    render(<AuthUserComponent />);

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'password123' },
    });

    const submitButton = screen.getByRole('button', { name: 'Login' }); // Use getByRole for the button
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('A network error occurred. Please try again.');
    });
  });
});