import ErrorBoundary from '@/app/providers/ErrorBoundary';
import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, test, vi } from 'vitest';

vi.mock('@/app/providers/ErrorBoundaryWithToast', () => ({
  ErrorBoundaryWithToast: ({ error }: { error: Error }) => (
    <div data-testid="error-boundary-with-toast">{error.message}</div>
  ),
}));

const ThrowingComponent = () => {
  throw new Error('Test error message');
};

describe('ErrorBoundary component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders children correctly when there is no error', () => {
    const child = <div data-testid="child">I am rendered successfully</div>;

    render(<ErrorBoundary>{child}</ErrorBoundary>);

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(
      screen.queryByTestId('error-boundary-with-toast')
    ).not.toBeInTheDocument();
  });

  test('catch the error and display a fallback UI', () => {
    render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );

    const fallbackUI = screen.getByTestId('error-boundary-with-toast');

    expect(fallbackUI).toBeInTheDocument();
    expect(fallbackUI).toHaveTextContent('Test error message');
  });
});
