import theme from '@/shared/config/theme';
import { ToastProvider } from '@/shared/ui/toast';
import { Footer } from '@/widgets/footer';
import { Header } from '@/widgets/header';
import { Box, Container, CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'REST Client App',
  description: 'A lightweight Postman Copy',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ToastProvider>
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
            </ToastProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
