import ModArticleDetails from '@/components/articles/ModArticleDetails'; // Importing default export
import { render } from '@testing-library/react';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('ModArticleDetails', () => {
    const mockPush = jest.fn();

    // beforeEach(() => {
    //     (useRouter as jest.Mock).mockReturnValue(mockRouter);
    //     jest.clearAllMocks();
    // });

    beforeEach(() => {
        // Mock the return value of useRouter to include the push method
        (useRouter as jest.Mock).mockReturnValue({
            push: mockPush,
        });
        });
    

    it('should accept the article and redirect', async () => {
        const mockFetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({ message: 'Article accepted' }),
        });
        global.fetch = mockFetch;

        const { getByText } = render(<ModArticleDetails />);

        const acceptButton = getByText('Accept Article');
        acceptButton.click();

        expect(mockFetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/acceptArticles/123`, {
            method: 'POST',
        });
        // expect(mockRouter.push).toHaveBeenCalledWith('/moderate');
        expect(mockPush).toHaveBeenCalledWith('/moderate');
    });

    it('should handle fetch errors', async () => {
        const mockFetch = jest.fn().mockResolvedValue({
            ok: false,
        });
        global.fetch = mockFetch;

        const { getByText } = render(<ModArticleDetails />);
        const acceptButton = getByText('Accept Article'); 
        acceptButton.click();

        expect(mockFetch).toHaveBeenCalled();
        // expect(mockRouter.push).not.toHaveBeenCalled();
        expect(mockPush).not.toHaveBeenCalled();
    });
});