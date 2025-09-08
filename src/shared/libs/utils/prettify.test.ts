import { describe, test, expect } from 'vitest';
import { prettify } from './prettify';

describe('prettify', () => {
  test('formats json string with indentation', () => {
    const src = '{"a":1,"b":{"c":2}}';
    const out = prettify(src, 'json');
    expect(out).toContain('\n');
    expect(out).toContain('  "a"');
  });

  test('formats xml string with indentation', () => {
    const xml = '<root><item>1</item><item>2</item></root>';
    const out = prettify(xml, 'xml');
    expect(out).toContain('\n');
    expect(out).toMatch(/^\s*<root>/m);
  });

  test('returns original for unknown language or plaintext', () => {
    const src = 'raw text';
    const out = prettify(src, 'plaintext');
    expect(out).toBe(src);
  });
});
