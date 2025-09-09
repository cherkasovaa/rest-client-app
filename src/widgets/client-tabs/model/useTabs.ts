import { useState } from 'react';

export const useTabs = (initialTab: number = 0) => {
  const [tab, setTab] = useState(initialTab);

  const handleTabChange = (_: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };

  return {
    tab,
    handleTabChange,
  };
};
