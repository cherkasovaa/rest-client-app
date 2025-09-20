import { Button } from '@mui/material';
import { useSignOut } from '@/widgets/auth/model/useSignOut.ts';
import { useTranslations } from 'next-intl';

export const SignOutButton = () => {
  const { handleSignOut, isPendingSignOut } = useSignOut();
  const t = useTranslations();

  return (
    <Button
      variant="outlined"
      onClick={handleSignOut}
      loading={isPendingSignOut}
      size="small"
      sx={{
        backgroundColor: 'secondary.main',
      }}
    >
      {t('signOut')}
    </Button>
  );
};
