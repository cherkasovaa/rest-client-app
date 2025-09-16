'use client';
import { PageLoader } from '@/shared/ui/page-loader/PageLoader';
import dynamic from 'next/dynamic';

const VariablesPage = dynamic(() => import('@/pages/variables'), {
  ssr: false,
  loading: () => <PageLoader />,
});

export default function Page() {
  return <VariablesPage />;
}
