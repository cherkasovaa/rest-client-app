'use client';

import { createContext, useContext } from 'react';

interface ToastContextType {
  toastError: (message: string) => void;
  hideToast: () => void;
}

export const toastContext = createContext<ToastContextType | null>(null);

export function useToastContext() {
  const context = useContext(toastContext);

  if (!context) {
    throw new Error('context ToastContext must be provided to Provider');
  }

  return context;
}
