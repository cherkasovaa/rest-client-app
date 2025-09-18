import { ROUTES } from '@/shared/config/routes';
import type { WORKSPACE_LINK } from '@/widgets/workspace-navigator/model/types';

export const WORKSPACE_LINKS: WORKSPACE_LINK[] = [
  { name: 'restClient', path: ROUTES.REST_CLIENT },
  { name: 'history', path: ROUTES.HISTORY },
  { name: 'variables', path: ROUTES.VARS },
];
