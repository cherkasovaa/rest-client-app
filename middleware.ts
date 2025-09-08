import { NextRequest, NextResponse } from 'next/server';
import {
  authMiddleware,
  redirectToHome,
  redirectToLogin,
} from 'next-firebase-auth-edge';
import { clientConfig, serverConfig } from './config';

const PUBLIC_PATHS = ['/signin', '/signup'];

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
      if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
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
        path: '/signin',
        publicPaths: PUBLIC_PATHS,
      });

      return res;
    },
    handleError: async (error: unknown) => {
      console.error('Unhandled authentication error', { error });

      const res = redirectToLogin(request, {
        path: '/signin',
        publicPaths: PUBLIC_PATHS,
      });

      return res;
    },
  });
}

export const config = {
  matcher: ['/', '/((?!_next|api|.*\\.).*)', '/api/login', '/api/logout'],
};
