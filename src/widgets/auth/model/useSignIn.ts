import { useLoadingCallback } from '@/shared/lib/hooks/useLoadingCallback.ts';
import { generateFirebaseAuthErrorMessage } from '@/shared/lib/utils/generateFirebaseAuthErrorMessage.ts';
import { useToast } from '@/shared/ui/toast/useToast.tsx';
import type { SignInFormModel } from '@/widgets/auth/model/schemas.ts';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { login } from '../../../../api';
import { getFirebaseAuth } from '../../../../firebase.ts';

export function useSignIn() {
  const router = useRouter();
  const { toastError } = useToast();

  const [signInWithEmailAndPassword, , , signInError] =
    useSignInWithEmailAndPassword(getFirebaseAuth());

  const [onSignIn, isPendingSignIn] = useLoadingCallback(handleSignIn, {
    onError: (err) => {
      console.error(err);
      toastError('Some error has occured');
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
