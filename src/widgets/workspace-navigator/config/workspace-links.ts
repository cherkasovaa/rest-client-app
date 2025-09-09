import { ROUTES } from '@/shared/config/routes';
import type { WORKSPACE_LINK } from '@/widgets/workspace-navigator/model/types';

export const WORKSPACE_LINKS: WORKSPACE_LINK[] = [
  { name: 'REST Client', path: ROUTES.REST_CLIENT },
  { name: 'History', path: ROUTES.HISTORY },
  { name: 'Variables', path: ROUTES.VARS },
];
