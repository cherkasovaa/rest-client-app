'use client';

import { useToast } from '@/shared/ui/toast';
import { Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export const ErrorBoundaryWithToast = ({ error }: { error: Error }) => {
  const { toastError } = useToast();
  const t = useTranslations();

  useEffect(() => {
    toastError(t('unexpectedError', { errorMessage: error.message }));
  }, [error, toastError, t]);

  return (
    <Typography
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {t('somethingWentWrong')}!
    </Typography>
  );
};
