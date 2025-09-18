import { ROUTES } from '@/shared/config/routes';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export const AuthButtons = () => {
  const t = useTranslations();
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
        {t('signIn')}
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
        {t('signUp')}
      </Button>
    </Box>
  );
};
