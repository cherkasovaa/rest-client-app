import {
  HTTP_CONFIG,
  isValidHttpMethod,
  type HttpMethod,
} from '@/shared/config/httpSettings';
import {
  parsePathParams,
  updatePathParams,
} from '@/shared/libs/utils/pathMethods';
import type { RequestData } from '@/shared/types/request-data-firebase';
import { useCallback, useEffect, useState } from 'react';

export const useRequestParams = (request: RequestData | null) => {
  const [method, setMethod] = useState<HttpMethod>(
    request?.requestMethod ?? HTTP_CONFIG.DEFAULT_METHOD
  );
  const [endpoint, setEndpoint] = useState(request?.endpoint ?? '');

  useEffect(() => {
    const {
      method: m,
      endpoint: ep,
      body,
    } = parsePathParams(window.location.pathname);

    setMethod(m as HttpMethod);
    if (ep) setEndpoint(ep);

    const parts = window.location.pathname.split('/').filter(Boolean);

    if (parts[1] !== m) {
      updatePathParams({
        method: m,
        endpoint: ep,
        body,
      });
    }
  }, []);

  useEffect(() => {
    if (!request) return;

    const { requestMethod, endpoint, requestBody } = request;

    setMethod(requestMethod as HttpMethod);
    setEndpoint(endpoint ?? '');

    updatePathParams({
      method: requestMethod,
      endpoint: endpoint,
      body: requestBody,
    });
  }, [request]);

  const setEndpointSafe = useCallback(
    (value: string) => {
      const { body } = parsePathParams(window.location.pathname);

      setEndpoint(value);
      updatePathParams({ method, endpoint: value, body });
    },
    [method]
  );

  const setMethodSafe = useCallback(
    (value: string) => {
      if (isValidHttpMethod(value.toUpperCase())) {
        const { body } = parsePathParams(window.location.pathname);
        setMethod(value.toUpperCase() as HttpMethod);
        updatePathParams({ method: value.toUpperCase(), endpoint, body });
      }
    },
    [endpoint]
  );

  return { method, endpoint, setEndpointSafe, setMethodSafe };
};
