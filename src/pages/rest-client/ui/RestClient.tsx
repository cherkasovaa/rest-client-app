import { Stack } from '@mui/material';
import { useState } from 'react';

import { ClientFormControl } from '@/widgets/client-form-control';
import { ClientTabs } from '@/widgets/client-tabs';
import { RequestBody } from '@/widgets/request-body';
import { RequestCode } from '@/widgets/request-code';
import { RequestHeaders } from '@/widgets/request-headers';

import { ResponseField } from '@/features/response-field';
import { useRequestData } from '@/pages/rest-client/model/hooks/useRequestData';
import { buildRequestUrl } from '@/shared/lib/utils/buildRequestUrl';
import type { ApiResponse } from '@/shared/model/types/api';

const RestClientPage = () => {
  const [fetchError, setFetchError] = useState<null | string>(null);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { requestData, clearRequestData } = useRequestData();

  const handleRequest = async () => {
    setFetchError(null);
    setResponse(null);
    setIsLoading(true);
    clearRequestData();

    try {
      const builtUrl = buildRequestUrl(window.location);
      if (!builtUrl) return;

      const res = await fetch(builtUrl.url, { method: 'GET' });

      if (!res.ok) {
        setFetchError(res.statusText);

        setResponse((prev) =>
          prev
            ? { ...prev, status: res.status, statusText: res.statusText }
            : null
        );
      }

      const contentType = res.headers.get('content-type');

      if (contentType && contentType.indexOf('application/json') !== -1) {
        const data = await res.json();

        setResponse(data);
      } else {
        const textData = await res.text();

        setResponse({
          status: res.status,
          statusText: res.statusText,
          body: textData,
          headers: Object.fromEntries(res.headers.entries()),
          ok: res.ok,
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred.';
      setFetchError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack spacing={3} p={3}>
      <ClientFormControl
        request={requestData}
        isLoading={isLoading}
        handleRequest={handleRequest}
      />
      <ClientTabs
        body={<RequestBody body={requestData?.requestBody} />}
        headers={<RequestHeaders />}
        code={<RequestCode />}
      />
      <ResponseField
        error={fetchError}
        loading={isLoading}
        response={response}
      />
    </Stack>
  );
};

export default RestClientPage;
