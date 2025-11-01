'use client';
import { PageLoader } from '@/shared/ui/page-loader/PageLoader';
import dynamic from 'next/dynamic';

const RestClient = dynamic(() => import('@/pages/rest-client'), {
  ssr: false,
  loading: () => <PageLoader />,
});

export default function Page() {
  return <RestClient />;
}
