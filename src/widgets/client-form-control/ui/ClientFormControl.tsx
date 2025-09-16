import { HTTP_CONFIG } from '@/shared/config/httpSettings';
import type { RequestData } from '@/shared/model/types/request-data-firebase';
import { useRequestParams } from '@/widgets/client-form-control/model/hooks/useRequestParams';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

import { type FormEvent } from 'react';

export const ClientFormControl = ({
  request,
  handleRequest,
  isLoading,
}: {
  request: RequestData | null;
  handleRequest: () => Promise<void>;
  isLoading: boolean;
}) => {
  const { method, endpoint, setEndpointSafe, setMethodSafe } =
    useRequestParams(request);

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void handleRequest();
  };

  return (
    <Box>
      <form onSubmit={handleOnSubmit}>
        <FormControl
          fullWidth
          sx={{
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
            onChange={(e) => setMethodSafe(String(e.target.value))}
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
            onChange={(e) => setEndpointSafe(e.target.value)}
          />
          <Button
            variant="contained"
            disabled={endpoint.length === 0 || isLoading}
            type="submit"
          >
            {isLoading && <>..Loading</>}
            {!isLoading && (
              <>
                <SendIcon />
                Send
              </>
            )}
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};
