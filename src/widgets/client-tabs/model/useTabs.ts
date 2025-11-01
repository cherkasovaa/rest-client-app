import {
  LS,
  LS_REST_CLIENTS_ACTIVE_TAB,
} from '@/shared/lib/utils/localStorage';
import { useState } from 'react';

export const useTabs = () => {
  const [tab, setTab] = useState(LS.get(LS_REST_CLIENTS_ACTIVE_TAB) || 0);

  const handleTabChange = (_: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
    LS.set(LS_REST_CLIENTS_ACTIVE_TAB, newTab);
  };

  return {
    tab,
    handleTabChange,
  };
};
