import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, afterEach, describe, expect, test, vi } from 'vitest';

import { VariablesTable } from '@/widgets/variables-table';
import type { GridRowsProp } from '@mui/x-data-grid';

interface FullFeaturedCrudGridProps {
  rows: GridRowsProp;
  setRows: (
    newRows: GridRowsProp | ((prev: GridRowsProp) => GridRowsProp)
  ) => void;
}

vi.mock('@/shared/ui/full-featured-grid/FullFeaturedGrid', () => ({
  FullFeaturedCrudGrid: ({ rows, setRows }: FullFeaturedCrudGridProps) => (
    <div>
      <div data-testid="rows">{JSON.stringify(rows)}</div>
      <button
        data-testid="update-rows"
        onClick={() => setRows([{ id: 1, key: 'foo', value: 'bar' }])}
      >
        update
      </button>
    </div>
  ),
}));

vi.mock('@mui/x-data-grid', () => ({
  DataGrid: () => <div data-testid="mock-datagrid" />,
}));

describe('VariablesTable', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('should load data from local storage on load', () => {
    localStorage.setItem('variables', JSON.stringify({ key: 'test' }));

    render(<VariablesTable />);

    expect(screen.getByTestId('rows').textContent).toContain('test');
  });

  test('shoudl change and save newly added or updated data in local storage', async () => {
    const user = userEvent.setup();

    render(<VariablesTable />);

    await user.click(screen.getByTestId('update-rows'));

    const stored = JSON.parse(localStorage.getItem('variables') || '{}');
    expect(stored).toEqual({ foo: 'bar' });
    expect(screen.getByTestId('rows').textContent).toContain('foo');
  });
});
