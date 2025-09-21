import { updatePathSearchParams } from '@/shared/lib/utils/pathMethods';
import type { Header } from '@/shared/model/types/api';
import { FullFeaturedCrudGrid } from '@/shared/ui/full-featured-grid/FullFeaturedGrid';
import type { GridRowsProp } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { columns } from '../model/constant';
import { headersToRows, rowsToHeaders } from '../utils/rowMethods';

export const RequestHeaders = () => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newHeaders: Header[] = [];

    params.forEach((value, key) => {
      newHeaders.push({ key, value });
    });

    setGridRows(headersToRows(newHeaders));
  }, []);

  const [gridRows, setGridRows] = useState<GridRowsProp>([]);

  const handleSetRows = (
    newRows: GridRowsProp | ((prev: GridRowsProp) => GridRowsProp)
  ) => {
    const updatedRows: GridRowsProp =
      typeof newRows === 'function' ? newRows(gridRows) : newRows;

    setGridRows(updatedRows);

    const updatedHeaders = rowsToHeaders(updatedRows);

    const searchParams: Record<string, string> = {};
    updatedHeaders.forEach((h) => {
      if (h.key) searchParams[h.key] = h.value;
    });
    updatePathSearchParams(searchParams);
  };

  return (
    <FullFeaturedCrudGrid
      rows={gridRows}
      setRows={handleSetRows}
      columns={columns}
    />
  );
};
