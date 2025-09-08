import { afterEach } from 'node:test';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { generateCode } from './generateCode';
import type { CodeLanguage } from '@/shared/types/code-languages';

vi.mock('@readme/httpsnippet', async () => {
  const actual = await vi.importActual<typeof import('@readme/httpsnippet')>(
    '@readme/httpsnippet'
  );
  return {
    ...actual,
    HTTPSnippet: vi.fn().mockImplementation(() => ({
      convert: vi.fn().mockReturnValue(['mocked code']),
    })),
  };
});

import { HTTPSnippet } from '@readme/httpsnippet';

describe('generateCode function', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    const mockLocation: Partial<Location> = {
      pathname: '/rest-client/GET/aHR0cHM6Ly90ZXN0aW5n',
      search: 'test=testing',
    };

    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
    });

    vi.clearAllMocks();
  });

  const language: CodeLanguage = {
    language: 'JavaScript',
    variant: 'Fetch',
    target: 'javascript',
    editorLanguage: 'javascript',
  };

  test('returns mocked code for javascript fetch', () => {
    const code = generateCode(language);
    expect(code).toBe('mocked code');
    expect(HTTPSnippet).toHaveBeenCalled();
  });

  test('returns comment if method or endpoint missing', () => {
    const mockLocation: Partial<Location> = { pathname: '/', search: '' };
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
    });

    const code = generateCode(language);
    expect(code).toBe('// Check if endpoint or method given');
  });
});
