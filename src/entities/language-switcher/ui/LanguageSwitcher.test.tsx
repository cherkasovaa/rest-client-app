import { LanguageSwitcher } from '@/entities/language-switcher/ui/LanguageSwitcher';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';

describe('LanguageSwitcher', () => {
  beforeEach(() => render(<LanguageSwitcher />));

  test('renders language buttons', () => {
    const enBtn = screen.getByRole('button', { name: /en/i });
    const ruBtn = screen.getByRole('button', { name: /ru/i });

    expect(enBtn).toBeInTheDocument();
    expect(ruBtn).toBeInTheDocument();
  });

  test('defaults to EN', () => {
    const enBtn = screen.getByRole('button', { name: /en/i });

    expect(enBtn).toHaveAttribute('aria-pressed', 'true');
  });

  test('switches from EN to RU language', () => {
    const enBtn = screen.getByRole('button', { name: /en/i });
    const ruBtn = screen.getByRole('button', { name: /ru/i });

    expect(enBtn).toHaveAttribute('aria-pressed', 'true');
    expect(ruBtn).toHaveAttribute('aria-pressed', 'false');

    fireEvent.click(ruBtn);

    expect(enBtn).toHaveAttribute('aria-pressed', 'false');
    expect(ruBtn).toHaveAttribute('aria-pressed', 'true');
  });
});
