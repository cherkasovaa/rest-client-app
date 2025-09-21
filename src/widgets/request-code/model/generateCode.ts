import {
  parsePathParams,
  parsePathSearchParams,
} from '@/shared/lib/utils/pathMethods';
import type { CodeLanguage } from '@/shared/model/types/code-languages';
import { HTTPSnippet, type HarRequest } from '@readme/httpsnippet';

export function generateCode(language: CodeLanguage): string {
  const { method, endpoint, body } = parsePathParams(window.location.pathname);
  const headersMap = parsePathSearchParams(window.location.search);

  if (!method || !endpoint) {
    return '// Check if endpoint or method given';
  }

  const headers = Object.entries(headersMap).map(([name, value]) => ({
    name,
    value,
  }));

  const contentTypeKey = Object.keys(headersMap).find(
    (k) => k.toLowerCase() === 'content-type'
  );
  const mimeType = contentTypeKey
    ? headersMap[contentTypeKey]
    : 'application/json';

  const har: HarRequest = {
    method: method.toUpperCase(),
    url: endpoint,
    headers,
    httpVersion: 'HTTP/1.1',
    cookies: [],
    queryString: [],
    headersSize: -1,
    bodySize: body ? body.length : 0,
    postData: body
      ? {
          mimeType,
          text: body,
        }
      : { mimeType },
  };

  const snippet = new HTTPSnippet(har);
  let code = '';

  function normalize(result: string | string[] | false): string {
    if (Array.isArray(result)) return result.join('\n');
    if (typeof result === 'string') return result;
    return '';
  }

  switch (language.target) {
    case 'curl':
      code = normalize(snippet.convert('shell', 'curl'));
      break;
    case 'javascript':
      code = normalize(snippet.convert('javascript', 'fetch'));
      break;
    case 'xhr':
      code = normalize(snippet.convert('javascript', 'xhr'));
      break;
    case 'axios':
      code = normalize(snippet.convert('node', 'axios'));
      break;
    case 'nodejs':
      code = normalize(snippet.convert('node', 'fetch'));
      break;
    case 'python':
      code = normalize(snippet.convert('python'));
      break;
    case 'okhttp':
      code = normalize(snippet.convert('java', 'okhttp'));
      break;
    case 'csharp':
      code = normalize(snippet.convert('csharp'));
      break;
    case 'go':
      code = normalize(snippet.convert('go'));
      break;
    default:
      code = '';
  }

  return code;
}
