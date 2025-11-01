import { afterEach, beforeEach } from 'node:test';
import { describe, expect, test } from 'vitest';
import { LS, LS_TEST } from '../localStorage';

describe('localStorage', () => {
  const mock: string = 'testing';

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('should have data saved on set', () => {
    LS.set(LS_TEST, mock);
    const raw = localStorage.getItem(LS_TEST);

    expect(raw).not.toBeNull();
    expect(raw).toBe(JSON.stringify(mock));
  });

  test('should extract data on get', () => {
    localStorage.setItem(LS_TEST, JSON.stringify(mock));

    const result = LS.get(LS_TEST);
    expect(result).toEqual(mock);
  });
});
