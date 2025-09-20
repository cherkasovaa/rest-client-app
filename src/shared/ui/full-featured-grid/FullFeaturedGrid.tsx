import * as React from 'react';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  type GridRowsProp,
  type GridRowModesModel,
  GridRowModes,
  DataGrid,
  type GridColDef,
  GridActionsCellItem,
  type GridEventListener,
  type GridRowId,
  type GridRowModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { ruRU, enUS } from '@mui/x-data-grid/locales';

import { v4 as uuidv4 } from 'uuid';
import { Alert, Snackbar } from '@mui/material';
import { memo, useCallback, useMemo, useState } from 'react';
import { EditToolbar } from './EditToolbar';
import { useLocale, useTranslations } from 'next-intl';
import { LANG } from '@/shared/config/langs.ts';

declare module '@mui/x-data-grid' {
  interface ToolbarPropsOverrides {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
  }
}

// eslint-disable-next-line react/display-name
export const FullFeaturedCrudGrid = memo(
  ({
    rows,
    setRows,
    columns,
  }: {
    rows: GridRowsProp;
    setRows: React.Dispatch<React.SetStateAction<GridRowsProp>>;
    columns: GridColDef[];
  }) => {
    const t = useTranslations();
    const locale = useLocale();

    const localeText = useMemo(() => {
      return locale === LANG.RU
        ? ruRU.components.MuiDataGrid.defaultProps.localeText
        : enUS.components.MuiDataGrid.defaultProps.localeText;
    }, [locale]);

    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [error, setError] = useState<string | null>(null);

    const handleCloseError = useCallback(() => {
      setError(null);
    }, []);

    const isKeyDuplicate = useCallback(
      (key: string, currentId?: string): boolean => {
        if (!key || key.trim() === '') return false;

        const normalized = key.toLowerCase().trim();
        return rows.some((row) => {
          return (
            row.id !== currentId &&
            row.key?.toString().toLowerCase().trim() === normalized
          );
        });
      },
      [rows]
    );

    const handleRowEditStop: GridEventListener<'rowEditStop'> = useCallback(
      (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
          event.defaultMuiPrevented = true;
        }
      },
      []
    );

    const handleEditClick = useCallback(
      (id: GridRowId) => () => {
        setRowModesModel((prevRowModesModel) => ({
          ...prevRowModesModel,
          [id]: { mode: GridRowModes.Edit },
        }));
      },
      []
    );

    const handleSaveClick = useCallback(
      (id: GridRowId) => () => {
        setRowModesModel((prevRowModesModel) => ({
          ...prevRowModesModel,
          [id]: { mode: GridRowModes.View },
        }));
      },
      []
    );

    const handleDeleteClick = useCallback(
      (id: GridRowId) => () => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      },
      [setRows]
    );

    const handleCancelClick = useCallback(
      (id: GridRowId) => () => {
        setRowModesModel((prevRowModesModel) => ({
          ...prevRowModesModel,
          [id]: { mode: GridRowModes.View, ignoreModifications: true },
        }));

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
          setRows(rows.filter((row) => row.id !== id));
        }
      },
      [rows, setRows]
    );

    const processRowUpdate = useCallback(
      (newRow: GridRowModel) => {
        const key = newRow.key?.toString().trim();
        const value = newRow.value?.toString().trim();

        if (!key || key === '') {
          setError(`${t('keyCannotBeEmpty')}!`);
          return rows.find((row) => row.id === newRow.id) || newRow;
        }

        if (/\s/.test(key)) {
          setError(t('keyCannotContainSpaces', { key }));
          return rows.find((row) => row.id === newRow.id) || newRow;
        }

        if (!value || value === '') {
          setError(t('valueCannotBeEmpty', { key }));
          return rows.find((row) => row.id === newRow.id) || newRow;
        }

        if (isKeyDuplicate(key, newRow.id)) {
          setError(t('keyAlreadyExists', { key }));
          return rows.find((row) => row.id === newRow.id) || newRow;
        }

        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
      },
      [isKeyDuplicate, rows, setRows, t]
    );

    const handleRowModesModelChange = useCallback(
      (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
      },
      []
    );

    const columnsGrid = useMemo<GridColDef[]>(() => {
      return [
        ...columns.map((column) => ({
          ...column,
          headerName: t(column.headerName || ''),
        })),
        {
          field: 'actions',
          type: 'actions',
          headerName: t('actions'),
          cellClassName: 'actions',
          getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

            if (isInEditMode) {
              return [
                <GridActionsCellItem
                  key={uuidv4()}
                  icon={<SaveIcon />}
                  label="Save"
                  onClick={handleSaveClick(id)}
                />,
                <GridActionsCellItem
                  icon={<CancelIcon />}
                  key={uuidv4()}
                  label={t('cancel')}
                  className="textPrimary"
                  onClick={handleCancelClick(id)}
                  color="inherit"
                />,
              ];
            }

            return [
              <GridActionsCellItem
                icon={<EditIcon />}
                label={t('edit')}
                className="textPrimary"
                onClick={handleEditClick(id)}
                color="inherit"
                key={uuidv4()}
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label={t('delete')}
                onClick={handleDeleteClick(id)}
                key={uuidv4()}
                color="inherit"
              />,
            ];
          },
        },
      ];
    }, [
      columns,
      handleCancelClick,
      handleDeleteClick,
      handleEditClick,
      handleSaveClick,
      rowModesModel,
      t,
    ]);

    return (
      <Box
        sx={{
          height: 400,
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}
      >
        <DataGrid
          localeText={localeText}
          rows={rows}
          columns={columnsGrid}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{ toolbar: EditToolbar }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          showToolbar
          hideFooter
        />
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseError}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleCloseError}
            severity="error"
            sx={{ width: '100%' }}
          >
            {error}
          </Alert>
        </Snackbar>
      </Box>
    );
  }
);
