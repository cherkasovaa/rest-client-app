import { useRouter } from 'next/navigation';
import { useToast } from '@/shared/ui/toast/useToast.tsx';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { getFirebaseAuth } from '../../../../firebase.ts';
import { useEffect } from 'react';
import { generateFirebaseAuthErrorMessage } from '@/shared/utils/generateFirebaseAuthErrorMessage.ts';
import { login } from '../../../../api';
import type { SignInFormModel } from '@/widgets/auth/model/schemas.ts';
import { useLoadingCallback } from '@/shared/hooks/useLoadingCallback.ts';

export function useSignUp() {
  const router = useRouter();
  const { toastError } = useToast();

  const [createUserWithEmailAndPassword, , , signUpError] =
    useCreateUserWithEmailAndPassword(getFirebaseAuth());

  const [onSignUp, isPendingSignUp] = useLoadingCallback(handleSignUp, {
    onError: (err) => {
      console.error(err);
      toastError('Some error has occured');
    },
  });

  async function handleSignUp(data: SignInFormModel) {
    const user = await createUserWithEmailAndPassword(
      data.email,
      data.password
    );

    if (user) {
      const idToken = await user.user.getIdToken();
      await login(idToken);

      router.replace('/');
      router.refresh();
    }
  }

  useEffect(() => {
    if (signUpError) {
      toastError(generateFirebaseAuthErrorMessage(signUpError.code));
    }
  }, [signUpError, toastError]);

  return {
    isPendingSignUp,
    onSignUp,
  };
}
