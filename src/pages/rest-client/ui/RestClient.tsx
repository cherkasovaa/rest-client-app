import { useTabs } from '@/shared/hooks/useTabs';
import { useUrlParams } from '../model/useUrlParams';
import {
  isValidHttpMethod,
  type HttpMethod,
} from '@/shared/config/httpSettings';
import { Box, Paper, Stack, Tab, Tabs, Typography } from '@mui/material';
import { a11yProps } from '../model/a11yProps';
import { CustomTabPanel } from '@/shared/ui/CustomPanel/CustomPanel';
import { RequestBody } from '@/widgets/RequestBody';
import { RequestHeaders } from '@/widgets/RequestHeaders/ui/RequestHeaders';
import { RequestCode } from '@/widgets/RequestCode';
import { ClientFormControl } from '@/widgets/ClientFormControl';

const RestClientPage = () => {
  const { tab, handleTabChange } = useTabs();

  const { method, endpoint, setMethod, setEndpoint } = useUrlParams();

  const handleRequest = async () => {
    console.log('will fetch data');
  };

  const handleMethodChange = (value: string) => {
    if (isValidHttpMethod(value.toUpperCase())) {
      setMethod(value.toUpperCase() as HttpMethod);
    }
  };

  const handleEndpointChange = (value: string) => {
    setEndpoint(value);
  };

  return (
    <Stack spacing={3} p={3}>
      <Box>
        <ClientFormControl
          method={method}
          handleMethodChange={handleMethodChange}
          endpoint={endpoint}
          handleEndpointChange={handleEndpointChange}
          handleRequest={handleRequest}
        />
      </Box>
      <Box>
        <Tabs
          value={tab}
          onChange={handleTabChange}
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
          {'the response will be here soon'}
        </Paper>
      </Box>
    </Stack>
  );
};

export default RestClientPage;
