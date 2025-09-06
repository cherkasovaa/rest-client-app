'use client';

import { TeamSection } from '@/widgets/team-section';
import { WelcomeCard } from '@/widgets/welcome-card';
import { WorkspaceNavigator } from '@/widgets/workspace-navigator';
import { Box } from '@mui/material';
import { useState } from 'react';

export const HomePage = () => {
  const [auth, setAuth] = useState<boolean>(true);

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
      {/* <button onClick={() => setAuth(!auth)}>Toggle</button> */}
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
        <WelcomeCard userName={auth ? 'User' : null} />

        {auth && <WorkspaceNavigator />}
        <TeamSection />
      </Box>
    </Box>
  );
};
