import { WelcomeCard } from '@/widgets/welcome-card/ui/WelcomeCard';
import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { renderWithIntlProvider } from '@/shared/lib/test-utils/renderWithIntlProvider.tsx';

describe('WelcomeCard', () => {
  test('renders default welcome message when user is a guest', () => {
    renderWithIntlProvider(<WelcomeCard />);

    const greetingText = screen.getByText(/welcome!/i);
    const additionalText = screen.getByText(
      /please sign in to your account or register to continue/i
    );

    const signInBtn = screen.getByRole('link', { name: /sign in/i });
    const signUpBtn = screen.getByRole('link', { name: /sign up/i });

    expect(greetingText).toBeInTheDocument();
    expect(additionalText).toBeInTheDocument();
    expect(signInBtn).toBeInTheDocument();
    expect(signUpBtn).toBeInTheDocument();
  });

  test('shows personalized welcome message for authorized user', () => {
    renderWithIntlProvider(<WelcomeCard userName="Anna" />);

    const greetingText = screen.getByText(/welcome back, anna!/i);

    const signInBtn = screen.queryByRole('link', { name: /sign in/i });

    expect(greetingText).toBeInTheDocument();
    expect(signInBtn).not.toBeInTheDocument();
  });
});
