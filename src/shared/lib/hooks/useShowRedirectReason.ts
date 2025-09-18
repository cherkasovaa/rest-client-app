'use client';

import { useEffect } from 'react';
import { useToast } from '@/shared/ui/toast';
import { useSearchParams, useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/config/routes.ts';
import { useTranslations } from 'next-intl';

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
