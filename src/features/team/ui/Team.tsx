import { DeveloperCard } from '@/entities/developer-card';
import { DEVELOPERS } from '@/shared/config/developers';
import { Box } from '@mui/material';
import type { AppDeveloper } from '@/shared/model/types/appDevelopers.ts';

export const Team = () => {
  const renderDeveloperCard = (developer: AppDeveloper) => (
    <DeveloperCard key={developer.github} developer={developer} />
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 3,
      }}
    >
      {DEVELOPERS.map(renderDeveloperCard)}
    </Box>
  );
};
