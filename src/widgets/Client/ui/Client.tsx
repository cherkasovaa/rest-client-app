'use client';
import { Box, Paper, Tab, Tabs, Typography, Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

import { RequestBody } from '@/features/RequestBody';
import { RequestHeaders } from '@/features/RequestHeaders/ui/RequestHeaders';
import { RequestCode } from '@/features/RequestCode';
import { CustomTabPanel } from '@/shared/ui/CustomPanel/CustomPanel';
import { a11yProps } from '../model/a11yProps';
import {
  HTTP_CONFIG,
  isValidHttpMethod,
  type HttpMethod,
} from '../../../shared/config/httpSettings';
import { usePathname } from 'next/navigation';
import { ClientFormControl } from '@/features/ClientFormControl';
import { decodeBase64, encodeBase64 } from '../model/base64';

const Client = () => {
  const [tab, setTab] = useState(0);
  const [method, setMethod] = useState<HttpMethod>(HTTP_CONFIG.DEFAULT_METHOD);
  const [endpoint, setEndpoint] = useState('');

  const pathname = usePathname() ?? '';

  const parseUrl = useCallback(() => {
    const parts = pathname.split('/').filter(Boolean);
    if (parts[0] !== 'rest-client') return null;

    const decodedEndpoint = parts[2] ? decodeBase64(parts[2]) : '';

    return {
      method: parts[1]?.toUpperCase(),
      endpoint: decodedEndpoint,
      body: parts[3] ? decodeURIComponent(parts[3]) : '',
    };
  }, [pathname]);

  useEffect(() => {
    const parsed = parseUrl();
    if (!parsed) return;

    const validMethod =
      parsed.method && isValidHttpMethod(parsed.method)
        ? parsed.method
        : HTTP_CONFIG.DEFAULT_METHOD;

    setMethod(validMethod);
    setEndpoint(parsed.endpoint || '');

    const encodedEndpoint = parsed.endpoint
      ? `/${encodeBase64(parsed.endpoint)}`
      : '';

    const newPath = `/rest-client/${validMethod}${encodedEndpoint}`;

    if (pathname !== newPath) {
      window.history.replaceState(null, '', newPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const encodedEndpoint = endpoint ? `/${encodeBase64(endpoint)}` : '';
    const newPath = `/rest-client/${method}${encodedEndpoint}`;

    if (window.location.pathname !== newPath) {
      window.history.replaceState(null, '', newPath);
    }
  }, [method, endpoint]);

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
          {'the response will be here soon'}
        </Paper>
      </Box>
    </Stack>
  );
};

export default Client;
