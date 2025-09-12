import { Button } from '@mui/material';
import { useSignOut } from '@/widgets/auth/model/useSignOut.ts';

export const SignOutButton = () => {
  const { handleSignOut, isPendingSignOut } = useSignOut();

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
      Sign Out
    </Button>
  );
};
