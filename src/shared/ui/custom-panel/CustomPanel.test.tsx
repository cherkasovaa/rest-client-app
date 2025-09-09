import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { CustomTabPanel } from './CustomPanel';

describe('CustomPanel', () => {
  test('should renders children when value matches index', () => {
    render(
      <CustomTabPanel value={0} index={0}>
        <span>Visible content</span>
      </CustomTabPanel>
    );

    expect(screen.getByText('Visible content')).toBeInTheDocument();
  });
  test('should not renders children when value matches index', () => {
    render(
      <CustomTabPanel value={1} index={0}>
        <span>Hidden content</span>
      </CustomTabPanel>
    );

    expect(screen.queryByText('Hidden content')).not.toBeInTheDocument();
  });
});
