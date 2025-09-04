export interface Header {
  key: string;
  value: string;
}

export interface ApiResponse {
  status: number;
  statusText: string;
  body: string;
  headers?: Record<string, string>;
  error?: string;
  message?: string;
}
