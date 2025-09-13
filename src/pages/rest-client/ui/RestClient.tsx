import { Stack } from '@mui/material';
import { useState } from 'react';

import { ClientFormControl } from '@/widgets/client-form-control';
import { ClientTabs } from '@/widgets/client-tabs';
import { RequestBody } from '@/widgets/request-body';
import { RequestCode } from '@/widgets/request-code';
import { RequestHeaders } from '@/widgets/request-headers';

import { encodeBase64 } from '@/shared/libs/utils/base64';
import { parsePathParams } from '@/shared/libs/utils/pathMethods';
import type { ApiResponse } from '@/shared/types/api';
import { LS, LS_VARIABLES } from '@/shared/utils/localStorage';
import { replaceVariables } from '@/shared/utils/replaceVariables';

import { ResponseField } from '@/features/response-field';

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

      let parsedEndpoint = endpoint;
      const ls = LS.get(LS_VARIABLES);

      if (ls) {
        parsedEndpoint = replaceVariables(endpoint, ls);
      }

      const base = `/api/proxy/${method}/${encodeBase64(parsedEndpoint)}`;

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
