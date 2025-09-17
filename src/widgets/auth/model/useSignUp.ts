import { getFirebaseAuth } from '@/shared/config/firebase';
import { useLoadingCallback } from '@/shared/lib/hooks/useLoadingCallback.ts';
import { generateFirebaseAuthErrorMessage } from '@/shared/lib/utils/generateFirebaseAuthErrorMessage.ts';
import { useToast } from '@/shared/ui/toast/useToast.tsx';
import type { SignUpFormModel } from '@/widgets/auth/model/schemas.ts';
import { updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { login } from '../../../../_api';

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

  async function handleSignUp(data: SignUpFormModel) {
    const user = await createUserWithEmailAndPassword(
      data.email,
      data.password
    );

    if (user) {
      await updateProfile(user.user, {
        displayName: data.userName,
      });
      const idToken = await user.user.getIdToken();
      await login(idToken);

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
