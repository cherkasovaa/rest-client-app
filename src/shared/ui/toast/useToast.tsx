import { useToastContext } from '@/shared/ui/toast/toastContext.ts';

export function useToast() {
  const { toastError, hideToast } = useToastContext();

  return { toastError, hideToast };
}
