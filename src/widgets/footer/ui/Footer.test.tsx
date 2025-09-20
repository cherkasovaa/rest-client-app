import { DEVELOPERS } from '@/shared/config/developers';
import { renderWithIntlProvider } from '@/shared/lib/test-utils/renderWithIntlProvider.tsx';
import { LINK } from '@/widgets/footer/model/links';
import { Footer } from '@/widgets/footer/ui/Footer';
import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';

const texts = {
  'teamMembers.0.name': 'Akseniia',
  'teamMembers.1.name': 'Tatyana',
  'teamMembers.2.name': 'Alina',
};

describe('Footer', () => {
  beforeEach(() => renderWithIntlProvider(<Footer />));

  test('renders RSSchool logo', () => {
    expect(screen.getByAltText(/rsschool logo/i)).toBeInTheDocument();
  });

  test('has link to the course', () => {
    const rsslink = screen.getByRole('link', { name: /rsschool logo/i });

    expect(rsslink).toBeInTheDocument();
    expect(rsslink).toHaveAttribute('href', LINK.RSS);
    expect(rsslink).toHaveAttribute('target', '_blank');
    expect(rsslink).toHaveAttribute('rel', 'noopener');
  });

  test('renders the year the application was created and copyright', () => {
    expect(screen.getByText(/© 2025/i)).toBeInTheDocument();
  });

  describe('developer links', () => {
    test.each(DEVELOPERS)(
      'renders a github link for developer $name',
      ({ name, github }) => {
        const link = screen.getByRole('link', { name: texts[name as never] });

        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', github);
        expect(link).toHaveAttribute('rel', 'noopener');
      }
    );
  });
});
