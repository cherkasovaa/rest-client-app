'use client';

import { ROUTES } from '@/shared/config/routes';
import { Typography } from '@mui/material';
import { Link } from '@/shared/config/i18n/navigation.ts';

export const Logo = () => {
  return (
    <Typography
      component={Link}
      href={ROUTES.HOME}
      variant="body1"
      sx={{
        marginRight: 'auto',
        fontSize: { xs: '1.1rem', sm: '1.5rem' },
        color: 'secondary.main',
        cursor: 'pointer',
        textDecoration: 'none',

        '&:hover': {
          color: 'secondary.light',
        },
      }}
    >
      RCA
    </Typography>
  );
};
