import { NextIntlClientProvider } from 'next-intl';
import type { ReactNode } from 'react';
import messages from '../../../../locales/en.json';
import { render } from '@testing-library/react';

export function getElementWithIntlProvider(ui: ReactNode) {
  return (
    <NextIntlClientProvider locale={'en'} messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
}

export function renderWithIntlProvider(ui: ReactNode) {
  return render(getElementWithIntlProvider(ui));
}
