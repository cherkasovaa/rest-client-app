import { a11yProps } from '@/widgets/client-tabs/model/a11yProps';
import { Box, Tab, Tabs } from '@mui/material';
import { useTabs } from '../model/useTabs';
import type { JSX } from 'react';
import { CustomTabPanel } from '@/shared/ui/custom-panel/CustomPanel';
import { useTranslations } from 'next-intl';

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

  const t = useTranslations();

  return (
    <Box>
      <Tabs
        value={tab}
        onChange={handleTabChange}
        aria-label="basic tabs example"
        indicatorColor="secondary"
        textColor="secondary"
      >
        <Tab label={t('BODY')} {...a11yProps(0)} />
        <Tab label={t('HEADERS')} {...a11yProps(1)} />
        <Tab label={t('GENERATE_CODE')} {...a11yProps(2)} />
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
