import type { Path } from '@/shared/config/routes';

export interface WORKSPACE_LINK {
  name: string;
  path: Path;
}

export type WidgetVariant = 'home' | 'workspace';
