import { describe, expect, test } from 'vitest';
import { rowsToVariables, variablesToRow } from './rowMethods';
import type { GridRowsProp } from '@mui/x-data-grid';

describe('variablesToRow', () => {
  test('should convert object to array', () => {
    const variables = { foo: 'bar', hello: 'world' };
    const rows = variablesToRow(variables);

    expect(rows).toEqual([
      { id: 0, key: 'foo', value: 'bar' },
      { id: 1, key: 'hello', value: 'world' },
    ]);
  });

  test('should return empty array for empty object', () => {
    const variables = {};
    const rows = variablesToRow(variables);
    expect(rows).toEqual([]);
  });
});

describe('rowsToVariables', () => {
  test('should convert arrays to object', () => {
    const rows: GridRowsProp = [
      { id: 0, key: 'foo', value: 'bar' },
      { id: 1, key: 'hello', value: 'world' },
    ];
    const result = rowsToVariables(rows);

    expect(result).toEqual({ foo: 'bar', hello: 'world' });
  });

  test('should ignore objects with no value or key', () => {
    const rows: GridRowsProp = [
      { id: 0, key: '', value: 'bar' },
      { id: 1, key: 'hello', value: '' },
      { id: 2, key: 'foo', value: 'bar' },
    ];
    const result = rowsToVariables(rows);

    expect(result).toEqual({ foo: 'bar' });
  });

  test('should return empty object for empty array', () => {
    const rows: GridRowsProp = [];
    const result = rowsToVariables(rows);
    expect(result).toEqual({});
  });
});
