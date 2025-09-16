'use client';

import { LS, LS_VARIABLES } from '@/shared/lib/utils/localStorage';
import { FullFeaturedCrudGrid } from '@/shared/ui/full-featured-grid/FullFeaturedGrid';
import type { GridRowsProp } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { columns } from '../model/constants';
import { rowsToVariables, variablesToRow } from '../utils/rowMethods';

export const VariablesTable = () => {
  const [gridRows, setGridRows] = useState<GridRowsProp>([]);

  useEffect(() => {
    const saved = LS.get(LS_VARIABLES);
    setGridRows(variablesToRow(saved ?? {}));
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
