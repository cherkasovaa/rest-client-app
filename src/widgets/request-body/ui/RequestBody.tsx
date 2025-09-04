import { Box, Button, FormControl, Paper, Stack } from '@mui/material';
import { useState } from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { CodeEditor } from '@/features/code-editor';
import { ContentTypeSelector } from '@/features/content-type-selector';
import { CONTENT_TYPES } from '@/shared/types/content-types';

export const RequestBody = () => {
  const [language, setLanguage] = useState<string>(CONTENT_TYPES[0].language);

  const handleTypeChange = (language: string) => {
    setLanguage(language);
  };

  const handlePrettify = () => {
    console.log('prettifying');
  };

  return (
    <Stack gap={5}>
      <FormControl
        fullWidth
        style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 10 }}
      >
        <ContentTypeSelector onChange={handleTypeChange} />
        <Button onClick={handlePrettify}>
          <AutoAwesomeIcon />
          Prettify
        </Button>
      </FormControl>
      <Box
        sx={{
          minHeight: '200px',
        }}
      >
        <CodeEditor language={language} />
      </Box>
    </Stack>
  );
};
