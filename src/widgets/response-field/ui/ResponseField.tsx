import type { ApiResponse } from '@/shared/types/api';
import { Box, Paper, Typography } from '@mui/material';

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
        Status response:{' '}
        {response ? response.status + ' ' + response.statusText : 'none'}
      </Typography>
      <Paper
        sx={{
          p: 2,
          mt: 1,
          minHeight: 150,
          backgroundColor: 'grey',
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace',
        }}
      >
        {loading
          ? 'Loading...'
          : error
            ? `Error: ${error}`
            : response
              ? `${response.body}`
              : 'The response will be here soon'}
      </Paper>
    </Box>
  );
};
