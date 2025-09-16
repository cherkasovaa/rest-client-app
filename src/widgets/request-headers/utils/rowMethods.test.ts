import { describe, expect, test } from 'vitest';
import { headersToRows, rowsToHeaders } from './rowMethods';

describe('headersToRows', () => {
  test('should convert array to grid rows', () => {
    const headers = [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Authorization', value: 'Bearer token' },
    ];

    const rows = headersToRows(headers);

    expect(rows).toHaveLength(2);
    expect(rows[0]).toEqual({
      id: 0,
      key: 'Content-Type',
      value: 'application/json',
    });
    expect(rows[1]).toEqual({
      id: 1,
      key: 'Authorization',
      value: 'Bearer token',
    });
  });

  test('should return empty array for empty headers', () => {
    expect(headersToRows([])).toEqual([]);
  });
});

describe('rowsToHeaders', () => {
  test('should convert rows to headers array', () => {
    const rows = [
      { id: 0, key: 'Accept', value: 'application/xml' },
      { id: 1, key: 'Cache-Control', value: 'no-cache' },
    ];

    const headers = rowsToHeaders(rows);

    expect(headers).toEqual([
      { key: 'Accept', value: 'application/xml' },
      { key: 'Cache-Control', value: 'no-cache' },
    ]);
  });

  test('should filter out rows without key and value', () => {
    const rows = [
      { id: 0, key: '', value: '' },
      { id: 1, key: 'X-Test', value: '123' },
    ];

    const headers = rowsToHeaders(rows);

    expect(headers).toEqual([{ key: 'X-Test', value: '123' }]);
  });

  test('should convert key/value to string if not already string', () => {
    const rows = [{ id: 0, key: 42, value: true }];

    const headers = rowsToHeaders(rows);

    expect(headers).toEqual([{ key: '42', value: 'true' }]);
  });
});
