import { DeveloperCard } from '@/entities/developer-card/ui/DeveloperCard';
import type { AppDeveloper } from '@/shared/model/types/appDevelopers';
import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';
import { renderWithIntlProvider } from '@/shared/lib/test-utils/renderWithIntlProvider.tsx';

const mockDev: AppDeveloper = {
  name: 'teamMembers.0.name',
  role: 'teamMembers.0.role',
  photo: {
    src: '/path/to/photo',
    height: 100,
    width: 100,
  },
  github: '/path/to/github',
  nickname: 'user',
  contribution: 'teamMembers.0.contribution',
};

describe('DeveloperCard', () => {
  beforeEach(() =>
    renderWithIntlProvider(<DeveloperCard developer={mockDev} />)
  );

  test('renders photo', () => {
    const photo = screen.getByAltText(mockDev.name);

    expect(photo).toHaveAttribute('src', mockDev.photo.src);
    expect(photo).toHaveAttribute('alt', mockDev.name);
  });

  test('renders name and role', () => {
    const name = screen.getByText(/Kseniia/i);
    const role = screen.getByText(/Developer/i);

    expect(name).toHaveTextContent('Kseniia');
    expect(role).toHaveTextContent('Developer');
  });

  test('renders contribution', () => {
    const resText = screen.getByText(/i have made/i);

    expect(resText).toHaveTextContent(/I have made: RESTful client page,/i);
  });
});
