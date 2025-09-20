import { describe, expect, it, vi } from 'vitest';
import { screen, render, fireEvent } from '@testing-library/react';
import { ToastProvider } from '@/shared/ui/toast/ToastProvider.tsx';
import { useToast } from '@/shared/ui/toast/useToast.tsx';
import { act } from 'react';

const TestComponent = () => {
  const { toastError, hideToast } = useToast();
  return (
    <>
      <button onClick={() => toastError('some error')}>show</button>
      <button onClick={hideToast}>hide</button>
    </>
  );
};

const renderTestComponent = async () => {
  render(
    <ToastProvider>
      <TestComponent />
    </ToastProvider>
  );
};

describe('ToastProvider', () => {
  it('Show error when call toast error', async () => {
    await act(renderTestComponent);

    await vi.waitFor(() => {
      expect(screen.queryByText('some error')).not.toBeInTheDocument();
    });

    const buttonShow = screen.getByText('show');
    const buttonHide = screen.getByText('hide');

    await act(async () => fireEvent.click(buttonShow));
    expect(screen.getByText('some error')).toBeInTheDocument();

    await act(async () => fireEvent.click(buttonHide));

    await vi.waitFor(() => {
      expect(screen.queryByText('some error')).not.toBeInTheDocument();
    });
  });
});
