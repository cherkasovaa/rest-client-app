'use client';

import { useShowRedirectReason } from '@/shared/hooks/useShowRedirectReason.ts';
import { useAuth } from '@/widgets/auth';
import { TeamSection } from '@/widgets/team-section';
import { WelcomeCard } from '@/widgets/welcome-card';
import { WorkspaceNavigator } from '@/widgets/workspace-navigator';
import { Box } from '@mui/material';

export const HomePage = () => {
  useShowRedirectReason();
  const { user } = useAuth();
  const displayName = user ? user.displayName || user.email : null;

  return (
    <Box
      width="100%"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1',
        height: '100%',
        p: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 3,
          height: '100%',
        }}
      >
        <WelcomeCard userName={displayName} />

        {user && <WorkspaceNavigator />}
        <TeamSection />
      </Box>
    </Box>
  );
};
