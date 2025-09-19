import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';
import messages from '@/shared/config/i18n/locales/en.json';
import { render } from '@testing-library/react';
import { LANG } from '@/shared/config/langs.ts';

export function getElementWithIntlProvider(ui: ReactNode) {
  return (
    <NextIntlClientProvider locale={LANG.EN} messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
}

export function renderWithIntlProvider(ui: ReactNode) {
  return render(getElementWithIntlProvider(ui));
}
