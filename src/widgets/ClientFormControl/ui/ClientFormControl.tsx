import { HTTP_CONFIG, type HttpMethod } from '@/shared/config/httpSettings';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export const ClientFormControl = ({
  method,
  handleMethodChange,
  endpoint,
  handleEndpointChange,
  handleRequest,
}: {
  method: HttpMethod;
  handleMethodChange: (value: string) => void;
  endpoint: string;
  handleEndpointChange: (value: string) => void;
  handleRequest: () => Promise<void>;
}) => {
  return (
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
        <SendIcon />
        Send
      </Button>
    </FormControl>
  );
};
