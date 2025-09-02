import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from '@mui/material';
import { useState } from 'react';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const CONTENT_TYPES = ['json', 'xml', 'plaintext'];

export const RequestBody = () => {
  const [type, setType] = useState(CONTENT_TYPES[0]);

  const handlePrettify = () => {
    console.log('prettifying');
  };

  return (
    <Box>
      <FormControl
        fullWidth
        style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 10 }}
      >
        <InputLabel>Content-type</InputLabel>
        <Select
          value={type ?? CONTENT_TYPES[0]}
          id="content-type"
          label="Content-type"
          onChange={(e) => setType(e.target.value)}
        >
          {CONTENT_TYPES.map((m) => {
            return (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            );
          })}
        </Select>
        <Button onClick={handlePrettify}>
          <AutoAwesomeIcon />
          Prettify
        </Button>
      </FormControl>
      <Box>
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
          the request code will be here
        </Paper>
      </Box>
    </Box>
  );
};
