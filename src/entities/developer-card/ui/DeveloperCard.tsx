import type { AppDeveloper } from '@/shared/model/types/appDevelopers';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

export const DeveloperCard = ({ developer }: { developer: AppDeveloper }) => {
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
          {developer.name}
        </Typography>

        <Typography component="div" variant="body2">
          {developer.role}
        </Typography>

        <Box>I have made: {developer.responsibilities.join(', ')}</Box>
      </CardContent>
    </Card>
  );
};
