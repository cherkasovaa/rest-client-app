export const ROUTES = {
  HOME: '/',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  REST_CLIENT: '/rest-client',
  HISTORY: '/history',
  VARS: '/variables',
} as const;

export type Path = (typeof ROUTES)[keyof typeof ROUTES];
