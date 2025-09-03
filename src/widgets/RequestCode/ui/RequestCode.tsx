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
import CodeIcon from '@mui/icons-material/Code';

const CODE_TYPE = [
  'curl',
  'JavaScript (Fetch api)',
  'JavaScript (XHR)',
  'NodeJS',
  'Python',
  'Java',
  'C#',
  'Go',
];
export const RequestCode = () => {
  const [type, setType] = useState(CODE_TYPE[0]);

  const handleCodeGenerator = () => {
    console.log('generating');
  };

  return (
    <Box>
      <FormControl
        style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 10 }}
        fullWidth
      >
        <InputLabel>Type</InputLabel>
        <Select
          value={type ?? CODE_TYPE[0]}
          id="type"
          label="Type"
          onChange={(e) => setType(e.target.value)}
        >
          {CODE_TYPE.map((m) => {
            return (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            );
          })}
        </Select>
        <Button onClick={handleCodeGenerator}>
          <CodeIcon />
          Generate
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
          the generated code will be here
        </Paper>
      </Box>
    </Box>
  );
};
