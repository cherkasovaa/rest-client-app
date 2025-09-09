'use client';

import { FullFeaturedCrudGrid } from '@/shared/ui/full-featured-grid/FullFeaturedGrid';
import { columns, STORAGE_KEY, type Variable } from '../model/constants';
import { useEffect, useState } from 'react';
import type { GridRowsProp } from '@mui/x-data-grid';
import { rowsToVariables, variablesToRow } from '../utils/rowMethods';

export const VariablesTable = () => {
  const [gridRows, setGridRows] = useState<GridRowsProp>([]);

  useEffect(() => {
    const newVariables: Variable[] = [];
    setGridRows(variablesToRow(newVariables));
  }, []);

  const handleSetRows = (
    newRows: GridRowsProp | ((prev: GridRowsProp) => GridRowsProp)
  ) => {
    const updatedRows: GridRowsProp =
      typeof newRows === 'function' ? newRows(gridRows) : newRows;

    setGridRows(updatedRows);

    const updatedVariables = rowsToVariables(updatedRows);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedVariables));
  };

  return (
    <FullFeaturedCrudGrid
      rows={gridRows}
      setRows={handleSetRows}
      columns={columns}
    />
  );
};
