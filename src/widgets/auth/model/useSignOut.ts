import { signOut } from '@firebase/auth';
import { getFirebaseAuth } from '../../../../firebase.ts';
import { logout } from '../../../../api';
import { useLoadingCallback } from '@/shared/hooks/useLoadingCallback.ts';
import { useRouter } from 'next/navigation';

export function useSignOut() {
  const router = useRouter();
  const [handleSignOut, isPendingSignOut] = useLoadingCallback(async () => {
    await signOut(getFirebaseAuth());
    await logout();

    router.refresh();
  });

  return {
    handleSignOut,
    isPendingSignOut,
  };
}
