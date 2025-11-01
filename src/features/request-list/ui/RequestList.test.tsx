import { RequestList } from '@/features/request-list/ui/RequestList';
import type { RequestData } from '@/shared/model/types/request-data-firebase';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

vi.mock('@/features/request-list/ui/RequestItem', () => ({
  RequestItem: (request: RequestData) => (
    <div data-testid="request-item">{request.endpoint}</div>
  ),
}));

describe('RequestList', () => {
  const requests: RequestData[] = [
    {
      id: 'QdaUJcydbKnvZTvIAcBs',
      requestTimestamp: '2025-09-17T19:05:33.435Z',
      requestMethod: 'GET',
      requestBody: '',
      requestSize: 0,
      statusCode: 500,
      requestHeaders: {},
      duration: 16,
      endpoint: 'asdfgn',
      errorDetails: 'Failed to parse URL from asdfgn',
      responseSize: 0,
    },
    {
      id: '5zcj7NAfW92ZEmsFSbb0',
      requestBody: '',
      requestMethod: 'GET',
      statusCode: 200,
      endpoint: 'https://pokeapi.co/api/v2/pokemon/ditto',
      requestSize: 0,
      duration: 217,
      responseSize: 24507,
      errorDetails: null,
      requestHeaders: {},
      requestTimestamp: '2025-09-17T16:35:01.127Z',
    },
    {
      id: 'dyqylZvWyBAcCqwy2bjV',
      duration: 454,
      statusCode: 201,
      errorDetails: null,
      responseSize: 15,
      endpoint: 'https://jsonplaceholder.typicode.com/todos',
      requestMethod: 'POST',
      requestBody:
        'JSON.stringify({\n    userId: 2,\n    title: "Fix my bugs",\n    completed: false\n  })',
      requestSize: 83,
      requestTimestamp: '2025-09-18T12:09:20.548Z',
      requestHeaders: {},
    },
  ];

  test('should render request data list', () => {
    render(<RequestList requests={requests} />);

    const items = screen.getAllByTestId('request-item');

    expect(items).toHaveLength(requests.length);
  });
});
