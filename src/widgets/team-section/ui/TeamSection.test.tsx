import { AboutText } from '@/widgets/team-section/model/text';
import { TeamSection } from '@/widgets/team-section/ui/TeamSection';
import { screen } from '@testing-library/react';
import { beforeEach, describe, expect, test } from 'vitest';
import { renderWithIntlProvider } from '@/shared/lib/test-utils/renderWithIntlProvider.tsx';

describe('TeamSection', () => {
  beforeEach(() => renderWithIntlProvider(<TeamSection />));

  test('renders about text', () => {
    expect(screen.getByText(AboutText)).toBeInTheDocument();
  });
});
