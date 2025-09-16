import { requestService } from '@/shared/api/services/requestService';
import { REQUEST_ID_QUERY_KEY } from '@/shared/config/queryParam';
import type { RequestData } from '@/shared/model/types/request-data-firebase';
import { useAuth } from '@/widgets/auth';
import { useEffect, useRef, useState } from 'react';

export const useRequestData = () => {
  const { user } = useAuth();
  const hasHandledRequestId = useRef(false);
  const [requestData, setRequestData] = useState<RequestData | null>(null);

  useEffect(() => {
    if (hasHandledRequestId.current) return;

    const params = new URLSearchParams(window.location.search);
    const requestId = params.get(REQUEST_ID_QUERY_KEY);

    if (!user || !requestId) return;

    const getResponse = async () => {
      const data = await requestService.getResponse(user.uid, requestId);

      setRequestData(data);

      params.delete(REQUEST_ID_QUERY_KEY);
      const path = window.location.pathname;

      if (data?.requestHeaders) {
        Object.entries(data.requestHeaders).forEach(([k, v]) => {
          if (k && v) params.set(k, v);
        });
      }

      const newUrl = params.toString() ? `${path}?${params}` : path;

      window.history.replaceState(null, '', newUrl);
      hasHandledRequestId.current = true;
    };

    getResponse();
  }, [user]);

  const clearRequestData = () => {
    setRequestData(null);
  };

  return { requestData, clearRequestData };
};
