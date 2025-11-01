import { formatDuration } from '@/features/request-list/lib/formatDuration';
import { describe, expect, test } from 'vitest';

describe('formatDuration', () => {
  test.each([
    {
      ms: 1,
      expected: '1 ms',
    },
    {
      ms: 512,
      expected: '512 ms',
    },
    {
      ms: 999,
      expected: '999 ms',
    },
    {
      ms: 1000,
      expected: '1.00 s',
    },
    {
      ms: 1997,
      expected: '2.00 s',
    },
    {
      ms: 1812,
      expected: '1.81 s',
    },
  ])('should return $expected for $ms ms', ({ ms, expected }) => {
    expect(formatDuration(ms)).toBe(expected);
  });
});
