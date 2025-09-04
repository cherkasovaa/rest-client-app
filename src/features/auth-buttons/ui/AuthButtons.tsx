import { Box, Button } from '@mui/material';

export const AuthButtons = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '0.5rem',
      }}
    >
      <Button
        variant="outlined"
        size="small"
        sx={{
          backgroundColor: 'secondary.main',
        }}
      >
        Sign In
      </Button>
      <Button
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
