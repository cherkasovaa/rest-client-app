import { isValidHttpMethod } from '@/shared/config/httpSettings';
import { decodeBase64, encodeBase64 } from './base64';

export interface ClientPathParams {
  method: string;
  endpoint?: string;
  body?: string;
}

export type ClientPathSearchparams = Record<string, string>;

export function updatePathParams({ method, endpoint, body }: ClientPathParams) {
  let path = `/rest-client/${method}`;

  if (endpoint) {
    path += `/${encodeBase64(endpoint)}`;
  } else if (body) {
    path += `/_`;
  }

  if (body) {
    path += `/${encodeBase64(body)}`;
  }

  const search = window.location.search;
  const newUrl = path + search;

  if (window.location.pathname + window.location.search !== newUrl) {
    window.history.replaceState(null, '', newUrl);
    window.dispatchEvent(new Event('rest-client:paramschange'));
  }
}

export function updatePathSearchParams(headers: Record<string, string>) {
  const params = new URLSearchParams();
  Object.entries(headers).forEach(([k, v]) => {
    if (k && v) params.set(k, v);
  });

  const path = window.location.pathname;
  const newUrl = params.toString() ? `${path}?${params.toString()}` : path;

  if (window.location.pathname + window.location.search !== newUrl) {
    window.history.replaceState(null, '', newUrl);
    window.dispatchEvent(new Event('rest-client:searchparamschange'));
  }
}

export function parsePathParams(pathname: string): ClientPathParams {
  const parts = pathname.split('/').filter(Boolean);

  if (parts[0] !== 'rest-client') {
    return { method: 'GET' };
  }

  const method = isValidHttpMethod(parts[1]) ? parts[1] : 'GET';

  let endpoint: string | undefined;
  let body: string | undefined;

  if (parts[2]) endpoint = decodeBase64(parts[2]);
  if (parts[3]) body = decodeBase64(parts[3]);

  return { method, endpoint, body };
}

export function parsePathSearchParams(search: string): ClientPathSearchparams {
  const params = new URLSearchParams(search);
  const result: ClientPathSearchparams = {};
  params.forEach((value, key) => {
    if (key) result[key] = value;
  });
  return result;
}
