import { requestService } from '@/shared/api/services/requestService';
import { authConfig } from '@/shared/config/firebaseConfig';
import { ROUTES } from '@/shared/config/routes';
import { HistoryWidget } from '@/widgets/history-widget';
import { Box } from '@mui/material';
import type { Metadata } from 'next';
import { getTokens } from 'next-firebase-auth-edge';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'History | REST Client App',
  description: 'View your request history',
};

export default async function Page() {
  const tokens = await getTokens(await cookies(), authConfig);

  if (!tokens?.decodedToken.uid) {
    redirect(ROUTES.SIGNIN);
  }

  const requests = tokens
    ? await requestService.getUserResponses(tokens.decodedToken.uid)
    : [];

  return (
    <Box sx={{ height: '100%', padding: '2rem 0' }}>
      <HistoryWidget requests={requests} />
    </Box>
  );
}
