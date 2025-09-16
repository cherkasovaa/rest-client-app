import { useToast } from '@/shared/ui/toast';
import { Typography } from '@mui/material';
import { useEffect } from 'react';

export const ErrorBoundaryWithToast = ({ error }: { error: Error }) => {
  const { toastError } = useToast();

  useEffect(() => {
    toastError(`An unexpected error occurred: ${error.message}`);
  }, [error]);

  return (
    <Typography
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      Something went wrong!
    </Typography>
  );
};
