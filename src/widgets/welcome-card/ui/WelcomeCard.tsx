import { AuthButtons } from '@/features/auth-buttons';
import { Paper, Typography } from '@mui/material';

export const WelcomeCard = ({
  userName = null,
}: {
  userName?: string | null;
}) => {
  return (
    <Paper
      elevation={12}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        backgroundColor: 'primary.main',
        p: 3,
        color: 'inherit',
      }}
    >
      {userName ? (
        <Typography component="div" variant="h1" textAlign="center">
          Welcome back, {userName}!
        </Typography>
      ) : (
        <>
          <Typography component="div" variant="h1" textAlign="center">
            Welcome!
          </Typography>
          <Typography>
            Please sign in to your account or register to continue
          </Typography>

          <AuthButtons />
        </>
      )}
    </Paper>
  );
};
