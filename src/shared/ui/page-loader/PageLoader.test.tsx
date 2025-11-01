import { PageLoader } from '@/shared/ui/page-loader/PageLoader';
import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { renderWithIntlProvider } from '@/shared/lib/test-utils/renderWithIntlProvider.tsx';

describe('PageLoader', () => {
  test('should render spinner and loading message', () => {
    renderWithIntlProvider(<PageLoader />);

    expect(screen.getByText(/loading the page.../i)).toBeInTheDocument();
  });
});
