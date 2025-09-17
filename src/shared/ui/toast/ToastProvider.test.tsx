import { describe, expect, it, vi } from 'vitest';
import { screen, render, fireEvent } from '@testing-library/react';
import { ToastProvider } from '@/shared/ui/toast/ToastProvider.tsx';
import { useToast } from '@/shared/ui/toast/useToast.tsx';

const TestComponent = () => {
  const { toastError, hideToast } = useToast();
  return (
    <>
      <button onClick={() => toastError('some error')}>show</button>
      <button onClick={hideToast}>hide</button>
    </>
  );
};

const renderTestComponent = () => {
  render(
    <ToastProvider>
      <TestComponent />
    </ToastProvider>
  );
};

describe('ToastProvider', () => {
  it('Show error when call toast error', async () => {
    renderTestComponent();

    await vi.waitFor(() => {
      expect(screen.queryByText('some error')).not.toBeInTheDocument();
    });

    const buttonShow = screen.getByText('show');
    const buttonHide = screen.getByText('hide');

    fireEvent.click(buttonShow);
    expect(screen.getByText('some error')).toBeInTheDocument();

    fireEvent.click(buttonHide);
    await vi.waitFor(() => {
      expect(screen.queryByText('some error')).not.toBeInTheDocument();
    });
  });
});
