'use client';

import { useEffect } from 'react';
import { useToast } from '@/shared/ui/toast';
import { useRouter } from '@/shared/config/i18n/navigation.ts';
import { ROUTES } from '@/shared/config/routes.ts';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

export function useShowRedirectReason() {
  const t = useTranslations();
  const params = useSearchParams();
  const router = useRouter();
  const { toastError } = useToast();

  const redirect = params?.get('redirect');

  useEffect(() => {
    if (redirect) {
      toastError(t('sessionEnded'));
      router.replace(ROUTES.HOME);
    }
  }, [redirect, router, toastError, t]);
}
