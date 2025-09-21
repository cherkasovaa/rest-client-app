import { LanguageSwitcher } from '@/entities/language-switcher/ui/LanguageSwitcher';
import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';
import { renderWithIntlProvider } from '@/shared/lib/test-utils/renderWithIntlProvider.tsx';

describe('LanguageSwitcher', () => {
  beforeEach(() => renderWithIntlProvider(<LanguageSwitcher />));

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
});
