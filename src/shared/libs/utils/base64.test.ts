import { describe, test, expect } from 'vitest';
import { encodeBase64, decodeBase64 } from './base64';

describe('base64 utils', () => {
  test('encodeBase64 and decodeBase64 roundtrip for ASCII', () => {
    const src = 'https://test.com/test?x=1';
    const encoded = encodeBase64(src);
    expect(typeof encoded).toBe('string');

    const decoded = decodeBase64(encoded);
    expect(decoded).toBe(src);
  });

  test('encodeBase64 and decodeBase64 roundtrip for non-ASCII (utf-8)', () => {
    const src = 'Привет, мир! こんにちは';
    const encoded = encodeBase64(src);
    const decoded = decodeBase64(encoded);
    expect(decoded).toBe(src);
  });

  test('decodeBase64 returns empty string for invalid input', () => {
    const invalid = 'not_base64!@@@';
    const decoded = decodeBase64(invalid);
    expect(decoded).toBe('');
  });
});
