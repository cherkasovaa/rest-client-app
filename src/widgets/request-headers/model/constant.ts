import type { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
  { field: 'key', headerName: 'requestheaderkey', flex: 1, editable: true },
  { field: 'value', headerName: 'value', flex: 1, editable: true },
];
