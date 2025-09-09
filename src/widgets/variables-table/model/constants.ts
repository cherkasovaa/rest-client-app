import type { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  { field: 'key', headerName: 'Variable', flex: 1, editable: true },
  { field: 'value', headerName: 'Value', flex: 1, editable: true },
];

export interface Variable {
  key: string;
  value: string;
}

export const STORAGE_KEY = 'variables';
