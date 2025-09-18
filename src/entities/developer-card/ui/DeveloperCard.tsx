import type { AppDeveloper } from '@/shared/model/types/appDevelopers';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export const DeveloperCard = ({ developer }: { developer: AppDeveloper }) => {
  const t = useTranslations();

  return (
    <Card
      key={developer.github}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
        maxWidth: 345,
        width: '100%',
      }}
    >
      <CardMedia
        component="img"
        width={100}
        height={100}
        image={developer.photo.src}
        alt={developer.name}
        sx={{
          width: '100px',
          borderRadius: '100%',
          objectFit: 'cover',
          overflow: 'hidden',
        }}
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,
        }}
      >
        <Typography
          component="div"
          variant="button"
          sx={{
            fontSize: '1.5rem',
          }}
        >
          {t(developer.name)}
        </Typography>

        <Typography component="div" variant="body2">
          {t(developer.role)}
        </Typography>

        <Box>{t(developer.contribution)}</Box>
      </CardContent>
    </Card>
  );
};
