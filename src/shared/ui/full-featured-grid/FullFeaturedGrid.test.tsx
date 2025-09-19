import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { FullFeaturedCrudGrid } from './FullFeaturedGrid';
import type { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useState } from 'react';
import { renderWithIntlProvider } from '@/shared/lib/test-utils/renderWithIntlProvider.tsx';

vi.mock('uuid', () => ({ v4: () => 'test-id' }));

function TestWrapper({
  columns,
  initialRows = [],
}: {
  columns: GridColDef[];
  initialRows?: GridRowsProp;
}) {
  const [rows, setRows] = useState<GridRowsProp>(initialRows);
  return (
    <FullFeaturedCrudGrid rows={rows} setRows={setRows} columns={columns} />
  );
}

describe('FullFeaturedCrudGrid', () => {
  const user = userEvent.setup();

  const columns: GridColDef[] = [
    { field: 'key', headerName: 'Key', width: 150, editable: true },
    { field: 'value', headerName: 'Value', width: 150, editable: true },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('should work correctly with adding, edititng, deleting rows', () => {
    test('should add new row via toolbar and save values', async () => {
      renderWithIntlProvider(<TestWrapper columns={columns} />);

      const addButton = screen.getByRole('button', { name: /add record/i });
      await user.click(addButton);

      const grid = screen.getByRole('grid');
      const rows = within(grid).getAllByRole('row');
      expect(rows.length).toBe(2);

      const newRow = rows[1];

      const inputs = within(newRow).getAllByRole('textbox');
      expect(inputs).toHaveLength(2);

      await user.type(inputs[0], 'testKey');
      await user.type(inputs[1], 'testValue');

      const saveButton = within(newRow).getByRole('menuitem', {
        name: /save/i,
      });
      await user.click(saveButton);

      await waitFor(() => {
        expect(within(rows[1]).getByText('testKey')).toBeInTheDocument();
        expect(within(rows[1]).getByText('testValue')).toBeInTheDocument();
      });
    });

    test('should delete existing row', async () => {
      const initialRows: GridRowsProp = [
        { id: 'row-1', key: 'foo', value: 'bar' },
      ];
      renderWithIntlProvider(
        <TestWrapper columns={columns} initialRows={initialRows} />
      );

      const grid = screen.getByRole('grid');
      const rows = within(grid).getAllByRole('row');
      expect(rows.length).toBe(2);

      const dataRow = screen.getByRole('row', { name: /foo/i });
      const deleteButton = within(dataRow).getByRole('menuitem', {
        name: /delete/i,
      });
      await user.click(deleteButton);
      await waitFor(() => {
        expect(screen.queryByText('foo')).not.toBeInTheDocument();
      });
    });

    test('should edit existing row', async () => {
      const initialRows: GridRowsProp = [
        { id: 'row-1', key: 'key1', value: 'value1' },
      ];
      renderWithIntlProvider(
        <TestWrapper columns={columns} initialRows={initialRows} />
      );

      const grid = screen.getByRole('grid');
      const rows = within(grid).getAllByRole('row');
      expect(rows.length).toBe(2);

      const dataRow = screen.getByRole('row', { name: /key1/i });
      const editButton = within(dataRow).getByRole('menuitem', {
        name: /edit/i,
      });
      await user.click(editButton);

      const editingRow = screen.getByRole('row', { name: /key1/i });
      const inputs = within(editingRow).getAllByRole('textbox');
      expect(inputs).toHaveLength(2);

      await user.clear(inputs[0]);
      await user.type(inputs[0], 'newKey');

      await user.clear(inputs[1]);
      await user.type(inputs[1], 'newValue');

      const saveButton = within(editingRow).getByRole('menuitem', {
        name: /save/i,
      });
      await user.click(saveButton);

      await waitFor(() => {
        expect(within(editingRow).getByText('newKey')).toBeInTheDocument();
        expect(within(editingRow).getByText('newValue')).toBeInTheDocument();
      });
    });
  });

  describe('should check if parameters for rows are correct', () => {
    test('should not add row with empty key', async () => {
      const { container } = renderWithIntlProvider(
        <TestWrapper columns={columns} />
      );

      const addButton = screen.getByRole('button', { name: /add record/i });
      await user.click(addButton);

      const newRow = container.querySelector('[data-id="test-id"]');
      expect(newRow).toBeTruthy();

      const inputs = within(newRow as HTMLElement).getAllByRole('textbox');
      await user.type(inputs[1], 'weHaveValue!');

      const saveButton = within(newRow as HTMLElement).getByRole('menuitem', {
        name: /save/i,
      });
      await user.click(saveButton);

      expect(await screen.findByText(/cannot be empty/i)).toBeInTheDocument();

      expect(screen.queryByText('weHaveValue!')).not.toBeInTheDocument();
    });

    test('should not add row when key contains spaces', async () => {
      const { container } = renderWithIntlProvider(
        <TestWrapper columns={columns} />
      );

      const addButton = screen.getByRole('button', { name: /add record/i });
      await user.click(addButton);

      const newRow = container.querySelector('[data-id="test-id"]');
      expect(newRow).toBeTruthy();

      const inputs = within(newRow as HTMLElement).getAllByRole('textbox');
      await user.type(inputs[0], 'bad key');
      await user.type(inputs[1], 'testValue');

      const saveButton = within(newRow as HTMLElement).getByRole('menuitem', {
        name: /save/i,
      });
      await user.click(saveButton);

      expect(
        await screen.findByText(/cannot contain spaces/i)
      ).toBeInTheDocument();

      expect(screen.queryByText('testValue')).not.toBeInTheDocument();
    });

    test('should not add row with duplicate key', async () => {
      const initialRows = [{ id: 'row-1', key: 'sameKey', value: 'testValue' }];

      const { container } = renderWithIntlProvider(
        <TestWrapper columns={columns} initialRows={initialRows} />
      );

      const addButton = screen.getByRole('button', { name: /add record/i });
      await user.click(addButton);

      const newRow = container.querySelector('[data-id="test-id"]');
      expect(newRow).toBeTruthy();

      const inputs = within(newRow as HTMLElement).getAllByRole('textbox');
      await user.type(inputs[0], 'sameKey');
      await user.type(inputs[1], 'newTestValue');

      const saveButton = within(newRow as HTMLElement).getByRole('menuitem', {
        name: /save/i,
      });
      await user.click(saveButton);

      expect(await screen.findByText(/already exists/i)).toBeInTheDocument();
      expect(screen.queryByText('newTestValue')).not.toBeInTheDocument();
    });
  });
});
