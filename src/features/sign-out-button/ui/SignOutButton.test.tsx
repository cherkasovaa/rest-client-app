import { SignOutButton } from '@/features/sign-out-button/ui/SignOutButton';
import { useSignOut } from '@/widgets/auth/model/useSignOut';
import { fireEvent, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { renderWithIntlProvider } from '@/shared/lib/test-utils/renderWithIntlProvider.tsx';

vi.mock('@/widgets/auth/model/useSignOut.ts', () => ({
  useSignOut: vi.fn(),
}));

describe('SignOutButton', () => {
  const mockHandleSignOut = vi.fn();

  beforeEach(() => {
    vi.mocked(useSignOut).mockReturnValue({
      handleSignOut: mockHandleSignOut,
      isPendingSignOut: false,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders sign out button', () => {
    renderWithIntlProvider(<SignOutButton />);

    const button = screen.getByRole('button', { name: /sign out/i });

    expect(button).toBeInTheDocument();
  });

  test('calls sign out handler on click', () => {
    renderWithIntlProvider(<SignOutButton />);

    const button = screen.getByRole('button', { name: /sign out/i });
    fireEvent.click(button);

    expect(mockHandleSignOut).toHaveBeenCalledTimes(1);
  });
});
