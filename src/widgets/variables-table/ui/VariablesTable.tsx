'use client';

import { FullFeaturedCrudGrid } from '@/shared/ui/full-featured-grid/FullFeaturedGrid';
import { columns } from '../model/constants';
import { useEffect, useState } from 'react';
import type { GridRowsProp } from '@mui/x-data-grid';
import { rowsToVariables, variablesToRow } from '../utils/rowMethods';
import { LS, LS_VARIABLES } from '@/shared/utils/localStorage';

export const VariablesTable = () => {
  const [gridRows, setGridRows] = useState<GridRowsProp>([]);

  useEffect(() => {
    const saved = LS.get(LS_VARIABLES);
    if (saved) {
      setGridRows(variablesToRow(saved));
    } else {
      setGridRows(variablesToRow({}));
    }
  }, []);

  const handleSetRows = (
    newRows: GridRowsProp | ((prev: GridRowsProp) => GridRowsProp)
  ) => {
    const updatedRows: GridRowsProp =
      typeof newRows === 'function' ? newRows(gridRows) : newRows;

    setGridRows(updatedRows);

    const updatedVariables = rowsToVariables(updatedRows);
    LS.set(LS_VARIABLES, updatedVariables);
  };

  return (
    <FullFeaturedCrudGrid
      rows={gridRows}
      setRows={handleSetRows}
      columns={columns}
    />
  );
};
