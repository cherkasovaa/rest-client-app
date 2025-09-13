import { ROUTES } from '@/shared/config/routes';
import { Header } from '@/widgets/header/ui/Header';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';

describe('Header', () => {
  beforeEach(() => render(<Header />));

  describe('renders', () => {
    test('renders RSSchool logo', () => {
      const logo = screen.getByRole('link', { name: /rca/i });

      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('href', ROUTES.HOME);
    });

    test('renders language switcher', () => {
      const enBtn = screen.getByRole('button', { name: /en/i });
      const ruBtn = screen.getByRole('button', { name: /ru/i });

      expect(enBtn).toBeInTheDocument();
      expect(ruBtn).toBeInTheDocument();
    });

    test('renders auth buttons', () => {
      const signinBtn = screen.getByRole('link', { name: /sign in/i });
      const signupBtn = screen.getByRole('link', { name: /sign up/i });

      expect(signinBtn).toBeInTheDocument();
      expect(signupBtn).toBeInTheDocument();
    });
  });

  describe('useScrollPosition', () => {
    test('changes styles when scrolled down more than 50px', () => {
      const header = screen.getByRole('banner');
      expect(header).toHaveStyle('padding: 0.5rem');

      fireEvent.scroll(window, { target: { pageYOffset: 100 } });
      expect(header).toHaveStyle('padding: 0.3rem');
    });

    test('returns to initial styles when scrolled back up', () => {
      fireEvent.scroll(window, { target: { pageYOffset: 100 } });

      const header = screen.getByRole('banner');
      expect(header).toHaveStyle('padding: 0.3rem');

      fireEvent.scroll(window, { target: { pageYOffset: 20 } });
      expect(header).toHaveStyle('padding: 0.5rem');
    });
  });
});
