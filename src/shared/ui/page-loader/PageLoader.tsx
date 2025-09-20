'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export const PageLoader = () => {
  const t = useTranslations();

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
      <Typography>{t('loadingPage')}...</Typography>
    </Box>
  );
};
