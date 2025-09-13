import { requestService } from '@/shared/api/services/requestService';
import type { RequestData } from '@/shared/types/request-data-firebase';

export const saveRequestToDb = async (
  userId: string,
  requestData: RequestData
): Promise<void> => {
  try {
    await requestService.saveRequest(userId, requestData);
  } catch (error) {
    console.error('Failed to save request to database:', error);
  }
};
