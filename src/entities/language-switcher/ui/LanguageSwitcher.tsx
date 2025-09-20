'use client';

import { StyledToggleButtonGroup } from '@/entities/language-switcher/config/styledToggleButtonGroup';
import { usePathname, useRouter } from '@/shared/config/i18n/navigation.ts';
import { LANG } from '@/shared/config/langs';
import type { Lang } from '@/shared/model/types/lang-types';
import { ToggleButton } from '@mui/material';
import { useLocale } from 'next-intl';
import { type MouseEvent } from 'react';

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleToggleLang = (_event: MouseEvent, lang: Lang) => {
    if (locale === lang) return;

    router.push(pathname, {
      locale: lang,
    });
  };

  return (
    <StyledToggleButtonGroup
      color="secondary"
      value={locale}
      exclusive
      size="small"
      aria-label="Language"
    >
      <ToggleButton
        value={LANG.EN}
        aria-label={`${LANG.EN} language`}
        onClick={handleToggleLang}
      >
        {LANG.EN.toUpperCase()}
      </ToggleButton>
      <ToggleButton
        value={LANG.RU}
        aria-label={`${LANG.RU} language`}
        onClick={handleToggleLang}
      >
        {LANG.RU.toUpperCase()}
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
};
