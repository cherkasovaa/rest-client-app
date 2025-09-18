'use client';

import { LANG } from '@/entities/language-switcher/config/langs';
import { StyledToggleButtonGroup } from '@/entities/language-switcher/config/styledToggleButtonGroup';
import type { Lang } from '@/entities/language-switcher/model/types';
import { usePathname, useRouter } from '@/i18n/navigation';
import { ToggleButton } from '@mui/material';
import { useState, type MouseEvent } from 'react';

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [lang, setLang] = useState<Lang>('en');

  const handleToggleLang = (_event: MouseEvent, value: Lang) => {
    setLang(value);
    router.push(pathname, {
      locale: lang,
    });
  };

  return (
    <StyledToggleButtonGroup
      value={lang}
      exclusive
      size="small"
      onChange={handleToggleLang}
      aria-label="Language"
    >
      <ToggleButton value={LANG.EN} aria-label={`${LANG.EN} language`}>
        {LANG.EN.toUpperCase()}
      </ToggleButton>
      <ToggleButton value={LANG.RU} aria-label={`${LANG.RU} language`}>
        {LANG.RU.toUpperCase()}
      </ToggleButton>
    </StyledToggleButtonGroup>
  );
};
