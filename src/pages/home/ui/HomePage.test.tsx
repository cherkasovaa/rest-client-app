import { HomePage } from '@/pages/home/ui/HomePage';
import { useAuth } from '@/widgets/auth';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/widgets/auth', () => ({
  useAuth: vi.fn(),
}));
vi.mock('@/widgets/welcome-card', () => ({
  WelcomeCard: ({ userName }: { userName: string }) => (
    <div data-testid="welcome-card">{userName || 'Guest'}</div>
  ),
}));
vi.mock('@/widgets/workspace-navigator', () => ({
  WorkspaceNavigator: () => <div>WorkspaceNavigator</div>,
}));
vi.mock('@/widgets/team-section', () => ({
  TeamSection: () => <div>TeamSection</div>,
}));

const mockUseAuth = vi.mocked(useAuth);

describe('HomePage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders default welcome message when user is a guest', () => {
    const mockUser = null;

    mockUseAuth.mockReturnValue({ user: mockUser });
    render(<HomePage />);

    const greetingText = screen.getByText(/guest/i);
    expect(greetingText).toBeInTheDocument();
  });

  test('does not renders WorkspaceNavigator when user is a guest', async () => {
    const mockUser = null;

    mockUseAuth.mockReturnValue({ user: mockUser });

    render(<HomePage />);

    const workspaceNavigator = screen.queryByText(/workspaceNavigator/i);

    expect(workspaceNavigator).not.toBeInTheDocument();

    vi.doUnmock('react');
  });

  test('renders WorkspaceNavigator when user is authorized', () => {
    const mockUser = {
      uid: '123',
      displayName: 'Alina',
      email: 'admin@gmail.com',
      phoneNumber: null,
      photoURL: null,
      providerId: '',
    };

    mockUseAuth.mockReturnValue({ user: mockUser });
    render(<HomePage />);

    const workspaceNavigator = screen.queryByText(/workspaceNavigator/i);

    expect(workspaceNavigator).toBeInTheDocument();

    vi.doUnmock('react');
  });
});
