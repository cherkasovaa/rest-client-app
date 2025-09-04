import { AuthButtons } from '@/features/auth-buttons';
import { Card, CardContent, Typography } from '@mui/material';

export const WelcomeCard = () => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'primary.main',
        p: 3,
        color: 'inherit',
      }}
    >
      <CardContent>
        <Typography component="div" variant="h1" textAlign="center">
          Welcome!
        </Typography>
        <Typography>
          Please sign in to your account or register to continue
        </Typography>
      </CardContent>

      <AuthButtons />
    </Card>
  );
};
