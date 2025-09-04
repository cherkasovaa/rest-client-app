'use client';

import { TeamSection } from '@/widgets/team-section';
import { WelcomeCard } from '@/widgets/welcome-card';
import { Box, Container } from '@mui/material';
import { useState } from 'react';

export const HomePage = () => {
  const [auth, setAuth] = useState<boolean>(false);

  return (
    <Box width="100%">
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: '1',
          height: '100%',
          p: 2,
        }}
      >
        {/* <button onClick={() => setAuth(!auth)}>Toggle</button> */}
        {auth ? (
          <Box>Is Auth</Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 6,
              height: '100%',
            }}
          >
            <WelcomeCard />
            <TeamSection />
          </Box>
        )}
      </Container>
    </Box>
  );
};
