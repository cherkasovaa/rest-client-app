import { ROUTES } from '@/shared/config/routes';
import { HistoryEmptyState } from '@/widgets/history-widget/ui/HistoryEmptyState';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('HistoryEmptyState', () => {
  test('should display a empty state message and link to the REST client', () => {
    render(<HistoryEmptyState />);

    const message = screen.getByText(/you haven't executed any requests/i);
    const button = screen.getByRole('link', { name: /rest client/i });

    expect(message).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    expect(button).toHaveAttribute('href', ROUTES.REST_CLIENT);
  });
});
