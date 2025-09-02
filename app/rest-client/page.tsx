'use client';

import dynamic from 'next/dynamic';

const RestClient = dynamic(() => import('../../src/widgets/Client'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Page() {
  return <RestClient />;
}
