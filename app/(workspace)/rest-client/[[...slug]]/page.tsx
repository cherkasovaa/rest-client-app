'use client';
import dynamic from 'next/dynamic';

const RestClient = dynamic(() => import('../../../../src/pages/rest-client'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Page() {
  return <RestClient />;
}
