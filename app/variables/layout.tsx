import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Variables',
  description: 'Create sharable with variables with client',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
