import type { GridRowsProp } from '@mui/x-data-grid';
import type { Variable } from '../model/constants';

export const variablesToRow = (variables: Variable[]): GridRowsProp => {
  return variables.map((variable, index) => ({
    id: index,
    key: variable.key,
    value: variable.value,
  }));
};

export const rowsToVariables = (rows: GridRowsProp): Variable[] => {
  return rows
    .filter((row) => row.key || row.value)
    .map((row) => ({
      key: row.key?.toString() || '',
      value: row.value?.toString() || '',
    }));
};
