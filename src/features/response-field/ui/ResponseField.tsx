import type { ApiResponse } from '@/shared/model/types/api';
import { Editor } from '@monaco-editor/react';
import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { memo } from 'react';

export const ResponseField = memo(function ResponseField({
  response,
  loading,
  error,
}: {
  response: ApiResponse | null;
  loading: boolean;
  error?: string | null;
}) {
  const t = useTranslations();

  return (
    <Box>
      <Typography>
        {t('statusResponse')}: {response ? response.status : error}
      </Typography>

      <Editor
        height="200px"
        theme="light"
        value={response?.body}
        loading={loading && <div>...{t('loading')}</div>}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          wordWrap: 'on',
        }}
      />
    </Box>
  );
});
