import { DeveloperCard } from '@/entities/developer-card/ui/DeveloperCard';
import type { AppDeveloper } from '@/shared/model/types/appDevelopers';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';

const mockDev: AppDeveloper = {
  name: 'User',
  role: 'developer',
  photo: {
    src: '/path/to/photo',
    height: 100,
    width: 100,
  },
  github: '/path/to/github',
  nickname: 'user',
  responsibilities: ['project setup', 'implement header'],
};

describe('DeveloperCard', () => {
  beforeEach(() => render(<DeveloperCard developer={mockDev} />));

  test('renders photo', () => {
    const photo = screen.getByAltText(mockDev.name);

    expect(photo).toHaveAttribute('src', mockDev.photo.src);
    expect(photo).toHaveAttribute('alt', mockDev.name);
  });

  test('renders name and role', () => {
    const name = screen.getByText(/user/i);
    const role = screen.getByText(/developer/i);

    expect(name).toHaveTextContent(mockDev.name);
    expect(role).toHaveTextContent(mockDev.role);
  });

  test('renders responsibilities', () => {
    const resText = screen.getByText(/i have made/i);

    expect(resText).toHaveTextContent(
      /i have made: project setup, implement header/i
    );
  });
});
