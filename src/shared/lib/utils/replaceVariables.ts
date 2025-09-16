import type { Variables } from '@/widgets/variables-table/model/constants';

export const replaceVariables = (str: string, values: Variables): string => {
  return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    if (key in values) {
      return values[key];
    }
    return match;
  });
};
