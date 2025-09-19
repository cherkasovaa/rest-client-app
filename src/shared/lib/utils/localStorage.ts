import type { Lang } from '@/shared/model/types/lang-types';
import type { Variables } from '@/widgets/variables-table/model/constants';

export const LS_VARIABLES = 'variables';
export const LS_TEST = 'test';
export const LS_LANG = 'lang';

type LocalStorageKeys = 'variables' | 'test' | 'lang';

type LocalStorageData = {
  variables: Variables;
  test: string;
  lang: Lang;
};

export const LS = {
  set<Key extends LocalStorageKeys>(key: Key, data: LocalStorageData[Key]) {
    localStorage.setItem(key, JSON.stringify(data));
  },

  get<Key extends LocalStorageKeys>(key: Key): LocalStorageData[Key] | null {
    const data = localStorage.getItem(key);

    return data ? (JSON.parse(data) as LocalStorageData[Key]) : null;
  },
};
