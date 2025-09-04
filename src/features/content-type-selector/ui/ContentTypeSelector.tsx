import { CONTENT_TYPES } from '@/shared/types/content-types';
import {
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';

export const ContentTypeSelector = ({
  onChange,
}: {
  onChange?: (language: string) => void;
}) => {
  const [value, setValue] = useState<string>(CONTENT_TYPES[0].value);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const newValue = event.target.value;
    const contentType = CONTENT_TYPES.find((ct) => ct.value === newValue);

    if (contentType) {
      setValue(newValue);
      onChange?.(contentType.language);
    }
  };

  return (
    <>
      <InputLabel>Content-type</InputLabel>
      <Select
        value={value}
        id="content-type"
        label="Content-type"
        onChange={handleChange}
      >
        {CONTENT_TYPES.map((m) => {
          return (
            <MenuItem key={m.value} value={m.value}>
              {m.value}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};
