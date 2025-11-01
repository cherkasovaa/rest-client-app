import { WorkspaceNavigator } from '@/widgets/workspace-navigator';
import { Box } from '@mui/material';

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <WorkspaceNavigator variant="workspace" />
      <Box mt={3}>{children}</Box>
    </>
  );
}
