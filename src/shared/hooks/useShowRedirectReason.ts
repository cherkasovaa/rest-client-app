'use client';

import { useEffect } from 'react';
import { useToast } from '@/shared/ui/toast';
import { useSearchParams, useRouter } from 'next/navigation';

let isErrorShown = false;

export function useShowRedirectReason() {
  const params = useSearchParams();
  const router = useRouter();
  const { toastError } = useToast();

  const redirect = params?.get('redirect');

  useEffect(() => {
    if (redirect && !isErrorShown) {
      toastError(
        'Your session was ended, log in if you want to continue working'
      );
      router.replace('/signin');

      isErrorShown = true;
    }
  }, [redirect, router, toastError]);
}
