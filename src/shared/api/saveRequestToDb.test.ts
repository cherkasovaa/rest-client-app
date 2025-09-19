import { saveRequestToDb } from '@/shared/api/saveRequestToDb';
import { requestService } from '@/shared/api/services/requestService';
import type { RequestData } from '@/shared/model/types/request-data-firebase';
import { beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/shared/api/services/requestService', () => ({
  requestService: {
    saveRequest: vi.fn(),
  },
}));

describe('saveRequestToDb', () => {
  const userId = 'QdaUJcydbKnvZTvIAcBs';
  const requestData: RequestData = {
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
  };

  const mockSaveRequest = vi.mocked(requestService.saveRequest);

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('should save success request data', async () => {
    mockSaveRequest.mockResolvedValue();

    await saveRequestToDb(userId, requestData);

    expect(mockSaveRequest).toHaveBeenCalledTimes(1);
    expect(mockSaveRequest).toHaveBeenCalledWith(userId, requestData);
  });

  test('should save request data is failed', async () => {
    const error = new Error('db error');

    mockSaveRequest.mockRejectedValue(error);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await saveRequestToDb(userId, requestData);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to save request to database:',
      error
    );
  });
});
