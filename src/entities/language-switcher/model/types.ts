import type { LANG } from '@/entities/language-switcher/config/langs';

export type Lang = (typeof LANG)[keyof typeof LANG];
