import { useState } from 'react';
import type { GridRowsProp } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';
import FullFeaturedCrudGrid from '@/shared/ui/FullFeaturedGrid/FullFeaturedGrid';

export const RequestHeaders = () => {
  const [headers, setHeaders] = useState<GridRowsProp>([]);

  const columns: GridColDef[] = [
    { field: 'key', headerName: 'Key', flex: 1, editable: true },
    { field: 'value', headerName: 'Value', flex: 1, editable: true },
  ];

  return (
    <FullFeaturedCrudGrid
      rows={headers}
      setRows={setHeaders}
      columns={columns}
    />
  );
};
