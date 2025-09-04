import type { GridRowsProp } from '@mui/x-data-grid';
import FullFeaturedCrudGrid from '@/shared/ui/FullFeaturedGrid/FullFeaturedGrid';
import type { Header } from '@/shared/types/api';
import { useEffect, useState } from 'react';
import { columns } from '../model/constant';
import { updatePathSearchParams } from '@/shared/libs/utils/pathMethods';

export const RequestHeaders = () => {
  const [headers, setHeaders] = useState<Header[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newHeaders: Header[] = [];

    params.forEach((value, key) => {
      newHeaders.push({ key, value });
    });

    setHeaders(newHeaders);
    setGridRows(headersToRows(newHeaders));
  }, []);

  const headersToRows = (headers: Header[]): GridRowsProp => {
    return headers.map((header, index) => ({
      id: index,
      key: header.key,
      value: header.value,
    }));
  };

  const rowsToHeaders = (rows: GridRowsProp): Header[] => {
    return rows
      .filter((row) => row.key || row.value)
      .map((row) => ({
        key: row.key?.toString() || '',
        value: row.value?.toString() || '',
      }));
  };

  const [gridRows, setGridRows] = useState<GridRowsProp>([]);

  const handleSetRows = (
    newRows: GridRowsProp | ((prev: GridRowsProp) => GridRowsProp)
  ) => {
    const updatedRows: GridRowsProp =
      typeof newRows === 'function' ? newRows(gridRows) : newRows;

    setGridRows(updatedRows);

    const updatedHeaders = rowsToHeaders(updatedRows);
    setHeaders(updatedHeaders);

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
