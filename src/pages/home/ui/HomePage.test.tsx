import { HomePage } from '@/pages/home/ui/HomePage';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

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

describe('HomePage', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders default welcome message when user is a guest', () => {
    render(<HomePage />);

    const greetingText = screen.getByText(/user/i);
    expect(greetingText).toBeInTheDocument();
  });

  test('does not renders WorkspaceNavigator when user is a guest', async () => {
    vi.doMock('react', async () => {
      const actual = await vi.importActual<typeof import('react')>('react');
      return {
        ...actual,
        useState: () => [false, vi.fn()],
      };
    });
    vi.resetModules();

    const { HomePage } = await import('@/pages/home/ui/HomePage');
    render(<HomePage />);

    const workspaceNavigator = screen.queryByText(/workspaceNavigator/i);

    expect(workspaceNavigator).not.toBeInTheDocument();

    vi.doUnmock('react');
  });

  test('renders WorkspaceNavigator when user is authorized', () => {
    render(<HomePage />);

    const workspaceNavigator = screen.queryByText(/workspaceNavigator/i);

    expect(workspaceNavigator).toBeInTheDocument();

    vi.doUnmock('react');
  });
});
