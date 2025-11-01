import { ROUTES } from '@/shared/config/routes';
import { HistoryEmptyState } from '@/widgets/history-widget/ui/HistoryEmptyState';
import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { renderWithIntlProvider } from '@/shared/lib/test-utils/renderWithIntlProvider.tsx';

describe('HistoryEmptyState', () => {
  test('should display a empty state message and link to the REST client', () => {
    renderWithIntlProvider(<HistoryEmptyState />);

    const message = screen.getByText(/You have not executed any requests/i);
    const button = screen.getByRole('link', { name: /rest client/i });

    expect(message).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    expect(button).toHaveAttribute('href', ROUTES.REST_CLIENT);
  });
});
