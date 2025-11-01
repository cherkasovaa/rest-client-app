import { formatBytes } from '@/features/request-list/lib/formatBytes';
import { describe, expect, test } from 'vitest';

describe('formatBytes', () => {
  test('should return "0 B" for 0 bytes', () => {
    const result = formatBytes(0);

    expect(result).toBe('0 B');
  });

  test.each([
    {
      bytes: 1,
      decimals: 2,
      expected: '1.00 B',
    },
    {
      bytes: 99,
      decimals: 2,
      expected: '99.00 B',
    },
    {
      bytes: 512,
      decimals: 2,
      expected: '512.00 B',
    },
    {
      bytes: 1023,
      decimals: 2,
      expected: '1023.00 B',
    },
    {
      bytes: 1024,
      decimals: 4,
      expected: '1.0000 Kb',
    },
    {
      bytes: 2048,
      decimals: 2,
      expected: '2.00 Kb',
    },

    {
      bytes: 9999,
      decimals: 3,
      expected: '9.765 Kb',
    },
    {
      bytes: 1024 ** 2,
      decimals: 2,
      expected: '1.00 Mb',
    },
    {
      bytes: 1024 ** 2 * 10,
      decimals: 0,
      expected: '10 Mb',
    },
    {
      bytes: 1024 ** 3 * 10,
      decimals: 0,
      expected: '10 Gb',
    },
    {
      bytes: 1024 ** 4 * 10,
      decimals: 1,
      expected: '10.0 Tb',
    },
  ])(
    'should format $bytes bytes to $expected with decimals $decimals',
    ({ bytes, decimals, expected }) => {
      const result = formatBytes(bytes, decimals);

      expect(result).toBe(expected);
    }
  );

  test.each([-99, -1925, -133, -54, -1])(
    'should return "0 B" if bytes less then 0',
    (bytes) => {
      const result = formatBytes(bytes, 2);

      expect(result).toBe('0 B');
    }
  );

  test.each([-99, -1925, -133, -54, -1])(
    'should return "0 B" if bytes less then 0',
    (bytes) => {
      const result = formatBytes(bytes, 2);

      expect(result).toBe('0 B');
    }
  );
});
