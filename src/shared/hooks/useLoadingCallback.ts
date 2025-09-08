import { useCallback, useState } from 'react';

type IsLoading = boolean;
type LoadingCallback<Callback extends (...args: never[]) => Promise<unknown>> =
  (...args: Parameters<Callback>) => ReturnType<Callback> | undefined;
type ResetFunc = () => void;

type Settings = {
  deps?: React.DependencyList;
  onError?: (error: unknown) => unknown;
};

export const useLoadingCallback = <
  Callback extends (...args: never[]) => Promise<unknown>,
>(
  callback: Callback,
  settings?: Settings
): [LoadingCallback<Callback>, IsLoading, unknown, ResetFunc] => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  const handleCallback = useCallback(
    async (...args: Parameters<Callback>) => {
      setError(undefined);
      setIsLoading(true);

      try {
        return await callback(...args);
      } catch (e) {
        setError(e);
        if (settings?.onError) {
          settings.onError(e);
        }
      } finally {
        setIsLoading(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    settings?.deps ? settings.deps : [callback]
  );

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(undefined);
  }, []);

  return [handleCallback as LoadingCallback<Callback>, isLoading, error, reset];
};
