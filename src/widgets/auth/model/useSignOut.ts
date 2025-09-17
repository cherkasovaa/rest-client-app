import { getFirebaseAuth } from '@/shared/config/firebase';
import { useLoadingCallback } from '@/shared/lib/hooks/useLoadingCallback.ts';
import { signOut } from '@firebase/auth';
import { useRouter } from 'next/navigation';
import { logout } from '../../../../_api';

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
