'use client';

import { Link } from '@/shared/config/i18n/navigation.ts';

import { ROUTES } from '@/shared/config/routes.ts';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Box, Button, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations();
  return (
    <Box
      component="section"
      sx={{
        display: 'flex',
        flexDirection: { lg: 'row', xs: 'column' },
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        height: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: { lg: '500px', md: '400px', xs: '300px' },
          height: 'auto',
        }}
      >
        <DotLottieReact src="/animations/404-animation.json" loop autoplay />
      </Box>

      <Box sx={{ textAlign: 'left' }}>
        <Typography variant="h1" mb={3}>
          {t('pageNotFound')}
        </Typography>

        <Button
          component={Link}
          href={ROUTES.HOME}
          variant="outlined"
          size="small"
          sx={{
            backgroundColor: 'secondary.main',
          }}
        >
          {t('backToHomeScreen')}
        </Button>
      </Box>
    </Box>
  );
}
