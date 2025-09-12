import type { Variables } from '@/widgets/variables-table/model/constants';
import { describe, expect, test } from 'vitest';
import { replaceVariables } from './replaceVariables';

describe('repalceVariables', () => {
  const values: Variables = { foo: 'bar', hello: 'world' };

  test('should replace input string on its value', () => {
    const input = 'http://{{foo}}/{{hello}}';
    const result = replaceVariables(input, values);

    expect(result).toBe('http://bar/world');
  });

  test('should work with the same input strings', () => {
    const input = 'http://{{foo}}{{foo}}';
    const result = replaceVariables(input, values);

    expect(result).toBe('http://barbar');
  });

  test('дshoudl return empty string if tthere are no matches', () => {
    const input = 'test';
    const result = replaceVariables(input, values);

    expect(result).toBe('test');
  });
});
