import { RequestItem } from '@/features/request-list/ui/RequestItem';
import type { RequestData } from '@/shared/model/types/request-data-firebase';
import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { renderWithIntlProvider } from '@/shared/lib/test-utils/renderWithIntlProvider.tsx';

type PropRequest = Omit<RequestData, 'requestTimestamp'> & {
  date: string;
  time: string;
};

describe('RequestItem', () => {
  const baseRequest: PropRequest = {
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
    date: 'date',
    time: 'time',
  };

  const requests: PropRequest[] = [
    baseRequest,
    {
      id: 'QdaUJcydbKnvZTvIAcBs',
      date: 'date',
      time: 'time',
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
      date: 'date',
      time: 'time',
      requestHeaders: {},
    },
  ];

  test.each(requests)(
    'should correctly render UI for request with id $id',
    (request) => {
      renderWithIntlProvider(<RequestItem {...request} />);

      const method = screen.getByText(`${request.requestMethod}:`);
      const endpoint = screen.getByText(request.endpoint);
      const statusCode = screen.getByText(request.statusCode);

      expect(method).toBeInTheDocument();
      expect(endpoint).toBeInTheDocument();
      expect(statusCode).toBeInTheDocument();
    }
  );

  test('should not render status code when it is invalid', () => {
    const invalidRequest: PropRequest = {
      ...baseRequest,
      statusCode: 0,
    };

    renderWithIntlProvider(<RequestItem {...invalidRequest} />);

    expect(screen.queryByText(0)).not.toBeInTheDocument();
  });

  test('should not render error details when it is null', () => {
    renderWithIntlProvider(<RequestItem {...baseRequest} />);

    expect(screen.queryByText('Error:')).not.toBeInTheDocument();
  });

  test('should render error message when errorDetails is provide', () => {
    const requestWithError: PropRequest = {
      ...baseRequest,
      endpoint: 'wrong endpoint',
      errorDetails: 'Failed to parse URL from wrong endpoint',
    };

    renderWithIntlProvider(<RequestItem {...requestWithError} />);

    expect(
      screen.queryByText('Error: Failed to parse URL from wrong endpoint')
    ).toBeInTheDocument();
  });
});
