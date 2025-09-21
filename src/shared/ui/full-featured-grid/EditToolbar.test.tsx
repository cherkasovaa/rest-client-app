import React, {
  type ButtonHTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
} from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

vi.mock('uuid', () => ({ v4: () => 'test-id' }));

vi.mock('@mui/x-data-grid', () => {
  const ReactLocal = React;
  return {
    __esModule: true,
    Toolbar: (props: PropsWithChildren<Record<string, unknown>>) =>
      ReactLocal.createElement('div', props, props.children),
    ToolbarButton: (
      props: ButtonHTMLAttributes<HTMLButtonElement> & {
        children?: ReactNode;
      }
    ) => ReactLocal.createElement('button', props, props.children),
    GridRowModes: { Edit: 'edit' },
  };
});

import { EditToolbar } from './EditToolbar';
import { GridRowModes } from '@mui/x-data-grid';
import { renderWithIntlProvider } from '@/shared/lib/test-utils/renderWithIntlProvider.tsx';

describe('EditToolbar', () => {
  const user = userEvent.setup();

  test('should add new record and set edit mode', async () => {
    const mockSetRows = vi.fn();
    const mockSetRowModesModel = vi.fn();

    renderWithIntlProvider(
      <EditToolbar
        setRows={mockSetRows}
        setRowModesModel={mockSetRowModesModel}
      />
    );

    const button = screen.getByRole('button');
    await user.click(button);
    expect(mockSetRows).toHaveBeenCalledTimes(1);

    const setRowsArg = mockSetRows.mock.calls[0][0];
    expect(typeof setRowsArg).toBe('function');

    const resultingRows = setRowsArg([]);
    expect(resultingRows).toEqual([
      { id: 'test-id', key: '', value: '', isNew: true },
    ]);
    expect(mockSetRowModesModel).toHaveBeenCalledTimes(1);

    const setModelArg = mockSetRowModesModel.mock.calls[0][0];
    expect(typeof setModelArg).toBe('function');

    const resultingModel = setModelArg({});
    expect(resultingModel).toEqual({
      'test-id': { mode: GridRowModes.Edit, fieldToFocus: 'key' },
    });
  });
});
