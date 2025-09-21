import { defineRouting } from 'next-intl/routing';
import { LANG } from '@/shared/config/langs.ts';

export const routing = defineRouting({
  locales: Object.values(LANG),

  defaultLocale: LANG.EN,
});
