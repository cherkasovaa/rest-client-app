import { ErrorBoundaryWithToast } from '@/app/providers/ErrorBoundaryWithToast';
import { useToast } from '@/shared/ui/toast';
import { screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { renderWithIntlProvider } from '@/shared/lib/test-utils/renderWithIntlProvider.tsx';

vi.mock('@/shared/ui/toast', () => ({
  useToast: vi.fn(),
}));

describe('ErrorBoundaryWithToast', () => {
  const mockToastError = vi.fn();

  beforeEach(() =>
    vi.mocked(useToast).mockReturnValue({
      toastError: mockToastError,
      hideToast: function (): void {
        throw new Error('Function not implemented.');
      },
    })
  );

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders error message', () => {
    const errorMessage = new Error('Error message');

    renderWithIntlProvider(<ErrorBoundaryWithToast error={errorMessage} />);

    expect(screen.getByText(/something went wrong!/i)).toBeInTheDocument();
    expect(useToast).toHaveBeenCalled();
    expect(mockToastError).toHaveBeenCalledWith(
      'An unexpected error occurred: Error message'
    );
  });
});
