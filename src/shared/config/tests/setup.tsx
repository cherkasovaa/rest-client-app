import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

vi.mock('@/i18n/navigation', () => {
  const Link = () => <a />;

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
