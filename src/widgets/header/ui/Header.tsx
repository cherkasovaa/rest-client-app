'use client';

import { LanguageSwitcher } from '@/entities/language-switcher/ui/LanguageSwitcher';
import { AuthButtons } from '@/features/auth-buttons';
import { SignOutButton } from '@/features/sign-out-button';
import { useScrollPosition } from '@/shared/lib/hooks/useScrollPosition';
import { Logo } from '@/shared/ui';
import { useAuth } from '@/widgets/auth';
import { Box, Container } from '@mui/material';

export const Header = () => {
  const { scrollPosition } = useScrollPosition();
  const { user } = useAuth();

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        p: scrollPosition > 50 ? '0.3rem' : '0.5rem',
        backgroundColor: scrollPosition > 50 ? 'primary.main' : 'primary.dark',
        transition: '0.5s',
        zIndex: '999',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: { xs: '1rem', sm: '1.5rem' },
        }}
      >
        <Logo />

        <LanguageSwitcher />

        {user ? <SignOutButton /> : <AuthButtons />}
      </Container>
    </Box>
  );
};
