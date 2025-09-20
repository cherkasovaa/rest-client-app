import ErrorBoundary from '@/app/providers/ErrorBoundary';
import { authConfig } from '@/shared/config/firebaseConfig.ts';
import { routing } from '@/shared/config/i18n/routing';
import theme from '@/shared/config/theme';
import { tokensToUser } from '@/shared/lib/utils/tokensToUser';
import { ToastProvider } from '@/shared/ui/toast';
import { AuthProvider } from '@/widgets/auth';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import { getTokens } from 'next-firebase-auth-edge';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'REST Client App',
  description: 'A lightweight Postman Copy',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const userTokens = await getTokens(await cookies(), authConfig);
  const user = userTokens ? tokensToUser(userTokens) : null;

  return (
    <html lang={locale}>
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider>
          <ThemeProvider theme={theme}>
            <AuthProvider user={user}>
              <AppRouterCacheProvider>
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
              </AppRouterCacheProvider>
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
