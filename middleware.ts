import { clientConfig, serverConfig } from '@/shared/config/firebaseConfig.ts';
import { ROUTES } from '@/shared/config/routes.ts';
import {
  authMiddleware,
  redirectToHome,
  redirectToLogin,
} from 'next-firebase-auth-edge';
import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = [ROUTES.SIGNIN, ROUTES.SIGNUP, ROUTES.HOME] as string[];

const AUTH_PATHS = [ROUTES.SIGNIN, ROUTES.SIGNUP] as string[];

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: serverConfig.cookieSerializeOptions,
    serviceAccount: serverConfig.serviceAccount,
    handleValidToken: async (_: unknown, headers?: Headers) => {
      if (AUTH_PATHS.includes(request.nextUrl.pathname)) {
        return redirectToHome(request);
      }

      return NextResponse.next({
        request: {
          headers,
        },
      });
    },
    handleInvalidToken: async (reason: unknown) => {
      console.info('Missing or malformed credentials', { reason });

      const res = redirectToLogin(request, {
        path: ROUTES.HOME,
        publicPaths: PUBLIC_PATHS,
      });

      return res;
    },
    handleError: async (error: unknown) => {
      console.error('Unhandled authentication error', { error });

      const res = redirectToLogin(request, {
        path: ROUTES.HOME,
        publicPaths: PUBLIC_PATHS,
      });

      return res;
    },
  });
}

export const config = {
  matcher: [
    '/',
    '/api/proxy/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    '/api/login',
    '/api/logout',
  ],
};
