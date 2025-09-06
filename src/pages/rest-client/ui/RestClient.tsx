import { Stack } from '@mui/material';
import { useState } from 'react';

import { RequestBody } from '@/widgets/request-body';
import { RequestCode } from '@/widgets/request-code';
import { ResponseField } from '@/widgets/response-field';
import { ClientFormControl } from '@/widgets/client-form-control';
import { RequestHeaders } from '@/widgets/request-headers';
import { ClientTabs } from '@/widgets/client-tabs';

import type { ApiResponse } from '@/shared/types/api';
import { parsePathParams } from '@/shared/libs/utils/pathMethods';
import { encodeBase64 } from '@/shared/libs/utils/base64';

const RestClientPage = () => {
  const [fetchError, setFetchError] = useState<null | string>(null);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRequest = async () => {
    setFetchError(null);
    setResponse(null);
    setIsLoading(true);

    try {
      const { pathname, search } = window.location;
      const { method, endpoint, body } = parsePathParams(pathname);

      if (!endpoint) {
        return;
      }

      const base = `/api/proxy/${method}/${encodeBase64(endpoint)}`;

      const url = body
        ? `${base}/${encodeBase64(body)}${search}`
        : `${base}${search}`;

      const res = await fetch(url, { method: 'GET' });

      if (!res.ok) {
        setFetchError(res.statusText);
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
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
