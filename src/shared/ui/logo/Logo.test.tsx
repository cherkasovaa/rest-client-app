import { ROUTES } from '@/shared/config/routes';
import { Logo } from '@/shared/ui/logo/Logo';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('Logo', () => {
  test('renders RSSchool logo', () => {
    render(<Logo />);
    const logo = screen.getByRole('link', { name: /rca/i });

    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('href', ROUTES.HOME);
  });
});
