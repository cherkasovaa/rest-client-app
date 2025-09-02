import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { RequestBody } from '@/features/RequestBody';
import { RequestHeaders } from '@/features/RequestHeaders/ui/RequestHeaders';
import { RequestCode } from '@/features/RequestCode';
import { CustomTabPanel } from '@/shared/ui/CustomPanel/CustomPanel';
import { a11yProps } from '../model/a11yProps';

const URL_METHODS = ['GET', 'POST', 'PUT', 'DELETE'];

const Client = () => {
  const [method, setMethod] = useState(URL_METHODS[0]);
  const [url, setUrl] = useState('');

  const [tab, setTab] = useState(0);

  const handleRequest = async () => {
    console.log('sending data');
  };

  return (
    <Stack spacing={3} p={3}>
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
            value={method ?? URL_METHODS[0]}
            id="method"
            label="Method"
            onChange={(e) => setMethod(e.target.value)}
          >
            {URL_METHODS.map((m) => {
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
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          ></TextField>
          <Button variant="contained" onClick={handleRequest}>
            <SendIcon />
            Send
          </Button>
        </FormControl>
      </Box>
      <Box>
        <Tabs
          value={tab}
          onChange={(_, newTab: number) => setTab(newTab)}
          aria-label="basic tabs example"
        >
          <Tab label="BODY" {...a11yProps(0)} />
          <Tab label="HEADERS" {...a11yProps(1)} />
          <Tab label="GENERATE CODE" {...a11yProps(2)} />
        </Tabs>

        <CustomTabPanel value={tab} index={0}>
          <RequestBody />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={1}>
          <RequestHeaders />
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={2}>
          <RequestCode />
        </CustomTabPanel>
      </Box>
      <Box>
        <Typography>Response</Typography>
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
          the reponse code will be here
        </Paper>
      </Box>
    </Stack>
  );
};

export default Client;
