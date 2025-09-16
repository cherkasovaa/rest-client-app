import { LS, LS_VARIABLES } from '@/shared/lib/utils/localStorage';
import { replaceVariables } from '@/shared/lib/utils/replaceVariables';
import { encodeBase64 } from './base64';
import { parsePathParams } from './pathMethods';

export const buildRequestUrl = (location: Location) => {
  const { pathname, search } = location;
  const { method, endpoint, body } = parsePathParams(pathname);

  if (!endpoint) {
    return null;
  }

  let parsedEndpoint = endpoint;
  let parsedBody: string | null = body ?? null;
  let parsedHeaders = search;

  const ls = LS.get(LS_VARIABLES);

  if (ls) {
    parsedEndpoint = replaceVariables(endpoint, ls);

    if (body) {
      parsedBody = replaceVariables(body, ls);
    }

    if (search) {
      const decodedSearch = decodeURIComponent(search);
      parsedHeaders = replaceVariables(decodedSearch, ls);
    }
  }

  const base = `/api/proxy/${method}/${encodeBase64(parsedEndpoint)}`;
  const url = parsedBody
    ? `${base}/${encodeBase64(parsedBody)}${parsedHeaders}`
    : `${base}${parsedHeaders}`;

  return { url, method };
};
