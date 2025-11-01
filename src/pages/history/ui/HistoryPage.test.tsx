import { HistoryPage } from '@/pages/history/ui/HistoryPage';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

vi.mock('@/widgets/history-widget', () => ({
  HistoryWidget: () => <div data-testid="widget">HistoryWidget</div>,
}));

describe('HistoryPage', () => {
  test('should render history widget if requests are empty', () => {
    render(<HistoryPage requests={[]} />);

    expect(screen.getByTestId('widget')).toBeInTheDocument();
  });

  test('should render history widget if requests are non-empty', () => {
    render(
      <HistoryPage
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

    expect(screen.getByTestId('widget')).toBeInTheDocument();
  });
});
