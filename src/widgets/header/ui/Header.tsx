'use client';

import { LanguageSwitcher } from '@/entities/language-switcher/ui/LanguageSwitcher';
import { Logo } from '@/shared/ui/logo/Logo';
import { Box, Button, Container } from '@mui/material';
import { useEffect, useState } from 'react';

export const Header = () => {
  const [scrollPosition, setScrollPosition] = useState<number>(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        p: scrollPosition > 50 ? '0.3rem' : '0.5rem',
        backgroundColor: scrollPosition > 50 ? 'primary.main' : 'primary.dark',
        transition: '0.5s',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        <Logo />

        <LanguageSwitcher />

        <Box
          sx={{
            display: 'flex',
            gap: '0.5rem',
          }}
        >
          <Button
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: 'secondary.main',
            }}
          >
            Sign In
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: 'secondary.main',
            }}
          >
            Sign up
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
