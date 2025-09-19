import { requestService } from '@/shared/api/services/requestService';
import { authConfig } from '@/shared/config/firebaseConfig';
import { ROUTES } from '@/shared/config/routes';
import { PageLoader } from '@/shared/ui/page-loader/PageLoader';
import type { Metadata } from 'next';
import { getTokens } from 'next-firebase-auth-edge';
import dynamic from 'next/dynamic';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'History | REST Client App',
  description: 'View your request history',
};

const HistoryPage = dynamic(
  () => import('@/pages/history').then((mod) => mod.HistoryPage),
  {
    loading: () => <PageLoader />,
  }
);

export default async function Page() {
  const tokens = await getTokens(await cookies(), authConfig);

  if (!tokens?.decodedToken.uid) {
    redirect(ROUTES.SIGNIN);
  }

  const requests = await requestService.getUserResponses(
    tokens.decodedToken.uid
  );

  return <HistoryPage requests={requests} />;
}
