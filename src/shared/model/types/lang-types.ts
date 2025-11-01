import type { LANG } from '@/shared/config/langs';

export type Lang = (typeof LANG)[keyof typeof LANG];
