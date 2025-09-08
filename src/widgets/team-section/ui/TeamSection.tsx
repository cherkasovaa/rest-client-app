import { Team } from '@/features/team';
import { AboutText } from '@/widgets/team-section/model/text';
import { Box, Typography } from '@mui/material';

export const TeamSection = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Typography component="div" variant="body1">
        {AboutText}
      </Typography>

      <Team />
    </Box>
  );
};
