import { useCallback, useMemo, useState } from 'react';
import { Alert, Snackbar, type SnackbarCloseReason } from '@mui/material';

type ToastData = {
  message: string;
  type: 'error' | 'info' | 'success';
};

export function useToast() {
  const [opened, setOpened] = useState(false);
  const [toastData, setToastData] = useState<ToastData>({
    message: '',
    type: 'error',
  });

  const toastError = useCallback((message: string) => {
    setOpened(true);
    setToastData({
      message,
      type: 'error',
    });
  }, []);

  function hideToast() {
    setOpened(false);
  }

  function handleClose(
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) {
    if (reason === 'clickaway') {
      return;
    }

    setOpened(false);
  }

  const ToastElement = useMemo(() => {
    return (
      <Snackbar open={opened}>
        <Alert
          onClose={handleClose}
          severity={toastData.type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toastData.message}
        </Alert>
      </Snackbar>
    );
  }, [toastData, opened]);

  return { toastError, ToastElement, hideToast };
}
