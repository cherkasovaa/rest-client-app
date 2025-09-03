import {
  HTTP_CONFIG,
  isValidHttpMethod,
  type HttpMethod,
} from '@/shared/config/httpSettings';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { decodeBase64, encodeBase64 } from './base64';

export const useUrlParams = () => {
  const pathname = usePathname() ?? '';

  const [method, setMethod] = useState<HttpMethod>(HTTP_CONFIG.DEFAULT_METHOD);
  const [endpoint, setEndpoint] = useState('');

  const parseUrl = useCallback(() => {
    const parts = pathname.split('/').filter(Boolean);
    if (parts[0] !== 'rest-client') return null;

    const decodedEndpoint = parts[2] ? decodeBase64(parts[2]) : '';

    return {
      method: parts[1]?.toUpperCase(),
      endpoint: decodedEndpoint,
      body: parts[3] ? decodeURIComponent(parts[3]) : '',
    };
  }, [pathname]);

  useEffect(() => {
    const parsed = parseUrl();
    if (!parsed) return;

    const validMethod =
      parsed.method && isValidHttpMethod(parsed.method)
        ? parsed.method
        : HTTP_CONFIG.DEFAULT_METHOD;

    setMethod(validMethod);
    setEndpoint(parsed.endpoint || '');

    const encodedEndpoint = parsed.endpoint
      ? `/${encodeBase64(parsed.endpoint)}`
      : '';

    const newPath = `/rest-client/${validMethod}${encodedEndpoint}`;

    if (pathname !== newPath) {
      window.history.replaceState(null, '', newPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const encodedEndpoint = endpoint ? `/${encodeBase64(endpoint)}` : '';
    const newPath = `/rest-client/${method}${encodedEndpoint}`;

    if (window.location.pathname !== newPath) {
      window.history.replaceState(null, '', newPath);
    }
  }, [method, endpoint]);

  return { method, endpoint, setMethod, setEndpoint };
};
