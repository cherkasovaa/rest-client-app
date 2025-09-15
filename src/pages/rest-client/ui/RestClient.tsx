import { Stack } from '@mui/material';
import { useState } from 'react';

import { ClientFormControl } from '@/widgets/client-form-control';
import { ClientTabs } from '@/widgets/client-tabs';
import { RequestBody } from '@/widgets/request-body';
import { RequestCode } from '@/widgets/request-code';
import { RequestHeaders } from '@/widgets/request-headers';

import type { ApiResponse } from '@/shared/types/api';

import { ResponseField } from '@/features/response-field';
import { buildRequestUrl } from '@/shared/libs/utils/buildRequestUrl';

const RestClientPage = () => {
  const [fetchError, setFetchError] = useState<null | string>(null);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequest = async () => {
    setFetchError(null);
    setResponse(null);
    setIsLoading(true);

    try {
      const builtUrl = buildRequestUrl(window.location);
      if (!builtUrl) return;

      const res = await fetch(builtUrl.url, { method: 'GET' });

      if (!res.ok) {
        setFetchError(res.statusText);
      }

      const data = await res.json();
      setResponse(data);
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
      <ClientFormControl isLoading={isLoading} handleRequest={handleRequest} />
      <ClientTabs
        body={<RequestBody />}
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
