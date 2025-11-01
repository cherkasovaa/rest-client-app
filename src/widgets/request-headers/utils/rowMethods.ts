import type { Header } from '@/shared/model/types/api';
import type { GridRowsProp } from '@mui/x-data-grid';

export const headersToRows = (headers: Header[]): GridRowsProp => {
  return headers.map((header, index) => ({
    id: index,
    key: header.key,
    value: header.value,
  }));
};

export const rowsToHeaders = (rows: GridRowsProp): Header[] => {
  return rows
    .filter((row) => row.key || row.value)
    .map((row) => ({
      key: row.key?.toString() || '',
      value: row.value?.toString() || '',
    }));
};
