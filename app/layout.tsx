import ErrorBoundary from '@/app/providers/ErrorBoundary';
import { authConfig } from '@/shared/config/firebaseConfig.ts';
import theme from '@/shared/config/theme';
import { ToastProvider } from '@/shared/ui/toast';
import { tokensToUser } from '@/shared/utils/tokensToUser.ts';
import { AuthProvider } from '@/widgets/auth';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import { getTokens } from 'next-firebase-auth-edge';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: 'REST Client App',
  description: 'A lightweight Postman Copy',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userTokens = await getTokens(await cookies(), authConfig);
  const user = userTokens ? tokensToUser(userTokens) : null;

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <AuthProvider user={user}>
              <ToastProvider>
                <ErrorBoundary>
                  <CssBaseline />
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      minHeight: '100vh',
                      backgroundColor: 'primary.dark',
                      color: 'primary.contrastText',
                    }}
                  >
                    <Header />

                    <Box
                      component="main"
                      sx={{
                        flexGrow: 1,
                        display: 'flex',
                      }}
                    >
                      <Container maxWidth="lg">{children}</Container>
                    </Box>

                    <Footer />
                  </Box>
                </ErrorBoundary>
              </ToastProvider>
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
