import React from 'react';
import {
  Toolbar,
  ToolbarButton,
  GridRowModes,
  type GridSlotProps,
} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid';
import { Tooltip } from '@mui/material';
import { useTranslations } from 'next-intl';

export const EditToolbar = (props: GridSlotProps['toolbar']) => {
  const t = useTranslations();
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = uuidv4();
    setRows((oldRows) => [...oldRows, { id, key: '', value: '', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'key' },
    }));
  };

  return (
    <Toolbar>
      <Tooltip title={t('addRecord')}>
        <ToolbarButton onClick={handleClick}>
          <AddIcon fontSize="large" />
        </ToolbarButton>
      </Tooltip>
    </Toolbar>
  );
};
