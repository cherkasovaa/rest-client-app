import { AuthButtons } from '@/features/auth-buttons';
import { Paper, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export const WelcomeCard = ({
  userName = null,
}: {
  userName?: string | null;
}) => {
  const t = useTranslations();

  return (
    <Paper
      elevation={12}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        backgroundColor: 'primary.main',
        p: 3,
        color: 'inherit',
      }}
    >
      {userName ? (
        <Typography component="div" variant="h1" textAlign="center">
          {t('welcomeAuthorizedTitle', { userName })}
        </Typography>
      ) : (
        <>
          <Typography component="div" variant="h1" textAlign="center">
            {t('welcomeTitle')}
          </Typography>
          <Typography>{t('welcomeMessage')}</Typography>
          <AuthButtons />
        </>
      )}
    </Paper>
  );
};
