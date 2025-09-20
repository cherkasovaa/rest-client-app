import { Team } from '@/features/team';
import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export const TeamSection = () => {
  const t = useTranslations();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Typography component="div" variant="body1" textAlign="center">
        {t('welcomeDescription')}
      </Typography>

      <Team />
    </Box>
  );
};
