'use client';

import { Box, CircularProgress, Typography } from '@mui/material';

export const PageLoader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography>Loading the page...</Typography>
    </Box>
  );
};
