'use client';

import { type ReactNode, useCallback, useState } from 'react';
import { toastContext } from './toastContext.ts';
import { Alert, Snackbar, type SnackbarCloseReason } from '@mui/material';

type Props = {
  children: ReactNode;
};

type ToastData = {
  message: string;
  type: 'error' | 'info' | 'success';
};

export const ToastProvider = (props: Props) => {
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

  return (
    <toastContext.Provider value={{ toastError, hideToast }}>
      {props.children}
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
    </toastContext.Provider>
  );
};
