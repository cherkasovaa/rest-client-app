import { a11yProps } from '@/widgets/client-tabs/model/a11yProps';
import { Box, Tab, Tabs } from '@mui/material';
import { useTabs } from '../model/useTabs';
import { CustomTabPanel } from '@/shared/ui/CustomPanel/CustomPanel';
import type { JSX } from 'react';

export const ClientTabs = ({
  body,
  headers,
  code,
}: {
  body: JSX.Element;
  headers: JSX.Element;
  code: JSX.Element;
}) => {
  const { tab, handleTabChange } = useTabs();

  return (
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
        {body}
      </CustomTabPanel>
      <CustomTabPanel value={tab} index={1}>
        {headers}
      </CustomTabPanel>
      <CustomTabPanel value={tab} index={2}>
        {code}
      </CustomTabPanel>
    </Box>
  );
};
