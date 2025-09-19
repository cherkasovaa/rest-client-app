'use client';

import { StyledToggleButtonGroup } from '@/entities/language-switcher/config/styledToggleButtonGroup';
import { usePathname, useRouter } from '@/i18n/navigation';
import { LANG } from '@/shared/config/langs';
import { LS, LS_LANG } from '@/shared/lib/utils/localStorage';
import type { Lang } from '@/shared/model/types/lang-types';
import { ToggleButton } from '@mui/material';
import { useEffect, useState, type MouseEvent } from 'react';

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [lang, setLang] = useState<Lang>(LS.get(LS_LANG) || LANG.EN);

  useEffect(() => {
    LS.set(LS_LANG, lang);
  }, [lang]);

  const handleToggleLang = (_event: MouseEvent, value: Lang) => {
    setLang(value);
    router.push(pathname, {
      locale: lang,
    });
  };

  return (
    <StyledToggleButtonGroup
      color="secondary"
      value={lang}
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
