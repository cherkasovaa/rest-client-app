import { AboutText } from '@/widgets/team-section/model/text';
import { TeamSection } from '@/widgets/team-section/ui/TeamSection';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';

describe('TeamSection', () => {
  beforeEach(() => render(<TeamSection />));

  test('renders about text', () => {
    expect(screen.getByText(AboutText)).toBeInTheDocument();
  });
});
