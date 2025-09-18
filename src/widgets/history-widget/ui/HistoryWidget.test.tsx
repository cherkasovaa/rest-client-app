import { HistoryWidget } from '@/widgets/history-widget/ui/HistoryWidget';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

vi.mock('@/widgets/history-widget/', () => ({
  HistoryEmptyState: () => <div data-testid="empty">HistoryEmptyState</div>,
}));

vi.mock('@/features/request-list', () => ({
  RequestList: () => <div data-testid="request-list">RequestList</div>,
}));

describe('HistoryWidget', () => {
  test('should render empty state component when requests prop is empty', () => {
    render(<HistoryWidget requests={[]} />);

    const emptyStateComponent = screen.getByTestId('empty');
    const requestList = screen.queryByTestId('request-list');

    expect(emptyStateComponent).toBeInTheDocument();
    expect(requestList).not.toBeInTheDocument();
  });

  test('should render RequestList component when requests prop is non-empty', () => {
    render(
      <HistoryWidget
        requests={[
          {
            id: 'QdaUJcydbKnvZTvIAcBs',
            requestTimestamp: '2025-09-17T19:05:33.435Z',
            requestMethod: 'GET',
            requestBody: '',
            requestSize: 0,
            statusCode: 500,
            requestHeaders: {},
            duration: 16,
            endpoint: 'wrong endpoint',
            errorDetails: 'Failed to parse URL from wrong endpoint',
            responseSize: 0,
          },
        ]}
      />
    );

    const emptyStateComponent = screen.queryByTestId('empty');
    const requestList = screen.getByTestId('request-list');

    expect(emptyStateComponent).not.toBeInTheDocument();
    expect(requestList).toBeInTheDocument();
  });
});
