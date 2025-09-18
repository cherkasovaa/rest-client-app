import { DeveloperCard } from '@/entities/developer-card';
import { DEVELOPERS } from '@/shared/config/developers';
import { Box } from '@mui/material';

export const Team = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
      }}
    >
      {DEVELOPERS.map((developer) => (
        <DeveloperCard key={developer.github} developer={developer} />
      ))}
    </Box>
  );
};
