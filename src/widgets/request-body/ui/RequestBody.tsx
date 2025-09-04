import { Box, Button, FormControl, Stack } from '@mui/material';
import { useState } from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { CodeEditor } from '@/features/code-editor';
import { ContentTypeSelector } from '@/features/content-type-selector';
import { CONTENT_TYPES } from '@/shared/types/content-types';
import {
  parsePathParams,
  updatePathParams,
} from '@/shared/libs/utils/pathMethods';

export const RequestBody = ({ disabled }: { disabled: boolean }) => {
  const [language, setLanguage] = useState<string>(CONTENT_TYPES[0].language);

  const handlePrettify = () => {
    console.log('prettifying');
  };

  const handleBodyData = (data: string) => {
    const { method, endpoint } = parsePathParams(window.location.pathname);
    updatePathParams({ method, endpoint, body: data });
  };

  const handleTypeChange = (language: string) => {
    setLanguage(language);
  };

  return (
    <Stack gap={5}>
      <FormControl
        fullWidth
        style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 10 }}
      >
        <ContentTypeSelector onChange={handleTypeChange} />
        <Button onClick={handlePrettify} disabled={disabled}>
          <AutoAwesomeIcon />
          Prettify
        </Button>
      </FormControl>
      <Box
        sx={{
          minHeight: '200px',
        }}
      >
        <CodeEditor
          language={language}
          onUnfocus={handleBodyData}
          readOnly={disabled}
          // value={}
          // onChange={}
        />
      </Box>
    </Stack>
  );
};
