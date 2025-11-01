import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RESTful client',
  description: 'Create rest request',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
