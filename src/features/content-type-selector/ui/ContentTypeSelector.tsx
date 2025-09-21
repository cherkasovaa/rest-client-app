import {
  CONTENT_TYPES,
  type ContentType,
} from '@/shared/model/types/content-types';
import {
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material';
import { useCallback, useState } from 'react';

export const ContentTypeSelector = ({
  onChange,
}: {
  onChange?: (language: string) => void;
}) => {
  const [value, setValue] = useState<string>(CONTENT_TYPES[0].value);

  const handleChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      const newValue = event.target.value;
      const contentType = CONTENT_TYPES.find((ct) => ct.value === newValue);

      if (contentType) {
        setValue(newValue);
        onChange?.(contentType.language);
      }
    },
    [onChange]
  );

  const renderContentTypeItem = useCallback((contentTypeItem: ContentType) => {
    return (
      <MenuItem key={contentTypeItem.value} value={contentTypeItem.value}>
        {contentTypeItem.value}
      </MenuItem>
    );
  }, []);

  return (
    <>
      <InputLabel>Content-type</InputLabel>
      <Select
        value={value}
        id="content-type"
        label="Content-type"
        onChange={handleChange}
      >
        {CONTENT_TYPES.map(renderContentTypeItem)}
      </Select>
    </>
  );
};
