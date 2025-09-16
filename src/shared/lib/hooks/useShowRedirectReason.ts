'use client';

import { useEffect } from 'react';
import { useToast } from '@/shared/ui/toast';
import { useSearchParams, useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/config/routes.ts';

export function useShowRedirectReason() {
  const params = useSearchParams();
  const router = useRouter();
  const { toastError } = useToast();

  const redirect = params?.get('redirect');

  useEffect(() => {
    if (redirect) {
      toastError(
        'Your session was ended, log in if you want to continue working'
      );
      router.replace(ROUTES.HOME);
    }
  }, [redirect, router, toastError]);
}
