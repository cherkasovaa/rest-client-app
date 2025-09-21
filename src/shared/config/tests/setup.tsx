import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';
import type { ReactNode } from 'react';

afterEach(() => {
  cleanup();
});

vi.mock('@/shared/config/i18n/navigation.ts', () => {
  const Link = ({ children, ...restProps }: { children: ReactNode }) => (
    <a {...restProps}>{children}</a>
  );

  return {
    Link,
    redirect: vi.fn(),
    usePathname: vi.fn(),
    useRouter: vi.fn().mockReturnValue({
      push: vi.fn(),
    }),
    getPathname: vi.fn(),
  };
});
