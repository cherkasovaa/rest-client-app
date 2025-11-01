import { useScrollPosition } from '@/shared/lib/hooks/useScrollPosition';
import { fireEvent, renderHook } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('useScrollPosition', () => {
  test('initializes with scroll position 0', () => {
    const { result } = renderHook(() => useScrollPosition());

    expect(result.current.scrollPosition).toBe(0);
  });

  test('updates scroll position on window scroll', () => {
    const { result } = renderHook(() => useScrollPosition());

    fireEvent.scroll(window, { target: { pageYOffset: 100 } });

    expect(result.current.scrollPosition).toBe(100);
  });
});
