import type { GridRowsProp } from '@mui/x-data-grid';
import type { Variables } from '../model/constants';

export const variablesToRow = (variables: Variables): GridRowsProp => {
  return Object.entries(variables).map(([key, value], index) => ({
    id: index,
    key,
    value,
  }));
};

export const rowsToVariables = (rows: GridRowsProp): Variables => {
  const result: Record<string, string> = {};

  rows.forEach((row) => {
    const key = row.key?.toString();
    const value = row.value?.toString();

    if (key && value) {
      result[key] = value;
    }
  });
  return result;
};
