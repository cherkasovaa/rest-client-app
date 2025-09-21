import type { HttpMethod } from '@/shared/config/httpSettings';

export interface RequestData {
  id?: string;
  duration: number;
  statusCode: number;
  requestTimestamp: string;
  requestMethod: HttpMethod;
  requestSize: number;
  responseSize: number;
  errorDetails: string | null;
  endpoint: string;
  requestBody?: string;
  requestHeaders?: Record<string, string>;
}
