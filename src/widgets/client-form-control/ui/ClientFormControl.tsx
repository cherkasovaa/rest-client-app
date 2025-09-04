import {
  HTTP_CONFIG,
  isValidHttpMethod,
  type HttpMethod,
} from '@/shared/config/httpSettings';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useCallback, useEffect, useState } from 'react';
import {
  parsePathParams,
  updatePathParams,
} from '@/shared/libs/utils/pathMethods';

export const ClientFormControl = ({
  handleRequest,
  error,
  isLoading,
}: {
  handleRequest: () => Promise<void>;
  error: string | null;
  isLoading: boolean;
}) => {
  const [method, setMethod] = useState<HttpMethod>(HTTP_CONFIG.DEFAULT_METHOD);
  const [endpoint, setEndpoint] = useState('');

  useEffect(() => {
    const {
      method: m,
      endpoint: ep,
      body,
    } = parsePathParams(window.location.pathname);

    setMethod(m as HttpMethod);
    if (ep) setEndpoint(ep);

    const parts = window.location.pathname.split('/').filter(Boolean);

    if (parts[1] !== m) {
      updatePathParams({ method: m, endpoint: ep, body });
    }
  }, []);

  const handleEndpointChange = useCallback(
    (value: string) => {
      const { body } = parsePathParams(window.location.pathname);

      setEndpoint(value);
      updatePathParams({ method, endpoint: value, body });
    },
    [method]
  );

  const handleMethodChange = useCallback(
    (value: string) => {
      if (isValidHttpMethod(value.toUpperCase())) {
        const { body } = parsePathParams(window.location.pathname);
        setMethod(value.toUpperCase() as HttpMethod);
        updatePathParams({ method: value.toUpperCase(), endpoint, body });
      }
    },
    [endpoint]
  );

  return (
    <Box>
      <FormControl
        fullWidth
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 4fr 1fr',
          gap: 10,
        }}
      >
        <InputLabel>Method</InputLabel>
        <Select
          value={method ?? HTTP_CONFIG.DEFAULT_METHOD}
          id="method"
          label="Method"
          onChange={(e) => handleMethodChange(String(e.target.value))}
        >
          {HTTP_CONFIG.METHODS.map((m) => {
            return (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            );
          })}
        </Select>
        <TextField
          fullWidth
          label="Request URL"
          value={endpoint}
          placeholder={'https://jsonplaceholder.typicode.com/posts/14'}
          onChange={(e) => handleEndpointChange(e.target.value)}
        ></TextField>
        <Button variant="contained" onClick={handleRequest}>
          {isLoading && <>..Loading</>}
          {!isLoading && (
            <>
              <SendIcon />
              Send
            </>
          )}
        </Button>
      </FormControl>
      <Box>
        <Typography>{error || ''}</Typography>
      </Box>
    </Box>
  );
};
