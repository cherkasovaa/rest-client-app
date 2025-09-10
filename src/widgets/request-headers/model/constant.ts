import type { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  { field: 'key', headerName: 'Key', flex: 1, editable: true },
  { field: 'value', headerName: 'Value', flex: 1, editable: true },
];
