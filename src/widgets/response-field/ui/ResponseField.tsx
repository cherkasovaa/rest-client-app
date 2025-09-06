import type { ApiResponse } from '@/shared/types/api';
import { Editor } from '@monaco-editor/react';
import { Box, Typography } from '@mui/material';

export const ResponseField = ({
  response,
  loading,
  error,
}: {
  response: ApiResponse | null;
  loading: boolean;
  error?: string | null;
}) => {
  return (
    <Box>
      <Typography>
        Status response: {response ? response.status : error}
      </Typography>

      <Editor
        height="200px"
        theme="light"
        value={response?.body}
        loading={loading && <div>...Loading</div>}
        options={{ readOnly: true }}
      ></Editor>
    </Box>
  );
};
