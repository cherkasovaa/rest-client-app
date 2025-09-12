import { ROUTES } from '@/shared/config/routes';
import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';

export const HistoryEmptyState = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        You haven&apos;t executed any requests
      </Typography>
      <Button
        component={Link}
        href={ROUTES.REST_CLIENT}
        variant="outlined"
        size="large"
        sx={{
          backgroundColor: 'secondary.main',
        }}
      >
        REST Client
      </Button>
    </Box>
  );
};
