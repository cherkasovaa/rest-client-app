import type { Variables } from '@/widgets/variables-table/model/constants';

export const LS_VARIABLES = 'variables';
export const LS_TEST = 'test';
export const LS_REST_CLIENTS_ACTIVE_TAB = 'rest_clients_active_tab';

type LocalStorageKeys =
  | typeof LS_VARIABLES
  | typeof LS_TEST
  | typeof LS_REST_CLIENTS_ACTIVE_TAB;

type LocalStorageData = {
  variables: Variables;
  rest_clients_active_tab: number;
  test: string;
};

export const LS = {
  set<Key extends LocalStorageKeys>(key: Key, data: LocalStorageData[Key]) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  get<Key extends LocalStorageKeys>(key: Key): LocalStorageData[Key] | null {
    const data = localStorage.getItem(key);
    console.log('LocalStorageKeys', data);
    return data ? (JSON.parse(data) as LocalStorageData[Key]) : null;
  },
};
