'use client';

import { ErrorBoundaryWithToast } from '@/app/providers/ErrorBoundaryWithToast';
import type { Props, State } from '@/app/providers/model/types/interface';
import { Component } from 'react';

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  public render() {
    if (this.state.error) {
      return <ErrorBoundaryWithToast error={this.state.error} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
