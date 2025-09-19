import { PageLoader } from '@/shared/ui/page-loader/PageLoader';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('PageLoader', () => {
  test('should render spinner and loading message', () => {
    render(<PageLoader />);

    expect(screen.getByText(/loading the page.../i)).toBeInTheDocument();
  });
});
