import { ROUTES } from '@/shared/config/routes';
import { Box, Button } from '@mui/material';
import Link from 'next/link';

export const AuthButtons = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '0.5rem',
      }}
    >
      <Button
        component={Link}
        href={ROUTES.SIGNIN}
        variant="outlined"
        size="small"
        sx={{
          backgroundColor: 'secondary.main',
        }}
      >
        Sign In
      </Button>
      <Button
        component={Link}
        href={ROUTES.SIGNUP}
        variant="outlined"
        size="small"
        sx={{
          backgroundColor: 'secondary.main',
        }}
      >
        Sign up
      </Button>
    </Box>
  );
};
