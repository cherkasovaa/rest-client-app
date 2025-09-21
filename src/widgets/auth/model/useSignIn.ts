import { getFirebaseAuth } from '@/shared/config/firebase';
import { useLoadingCallback } from '@/shared/lib/hooks/useLoadingCallback.ts';
import { generateFirebaseAuthErrorMessage } from '@/shared/lib/utils/generateFirebaseAuthErrorMessage.ts';
import { useToast } from '@/shared/ui/toast/useToast.tsx';
import type { SignInFormModel } from '@/widgets/auth/model/schemas.ts';
import { useRouter } from '@/shared/config/i18n/navigation.ts';
import { useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { login } from '../../../../_api';
import { useTranslations } from 'next-intl';

export function useSignIn() {
  const t = useTranslations();
  const router = useRouter();
  const { toastError } = useToast();

  const [signInWithEmailAndPassword, , , signInError] =
    useSignInWithEmailAndPassword(getFirebaseAuth());

  const [onSignIn, isPendingSignIn] = useLoadingCallback(handleSignIn, {
    onError: (err) => {
      console.error(err);
      toastError(t('somethingWentWrong'));
    },
  });

  async function handleSignIn(data: SignInFormModel) {
    const user = await signInWithEmailAndPassword(data.email, data.password);

    if (user) {
      const idToken = await user.user.getIdToken();
      await login(idToken);

      router.refresh();
    }
  }

  useEffect(() => {
    if (signInError) {
      toastError(generateFirebaseAuthErrorMessage(signInError.code));
    }
  }, [signInError, toastError]);

  return {
    isPendingSignIn,
    onSignIn,
  };
}
