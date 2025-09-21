import { clientConfig, serverConfig } from '@/shared/config/firebaseConfig.ts';
import { ROUTES } from '@/shared/config/routes.ts';
import {
  authMiddleware,
  redirectToHome,
  redirectToLogin,
} from 'next-firebase-auth-edge';
import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/shared/config/i18n/routing.ts';

const PUBLIC_PATHS = [ROUTES.SIGNIN, ROUTES.SIGNUP, ROUTES.HOME] as string[];

const AUTH_PATHS = [ROUTES.SIGNIN, ROUTES.SIGNUP] as string[];

const getNormalizedPathname = (path: string) => {
  return path
    .replace(/\/ru\//, '\/')
    .replace(/\/ru/, '\/')
    .replace(/\/en\//, '\/')
    .replace(/\/en/, '\/');
};

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const normalizedPathname = getNormalizedPathname(request.nextUrl.pathname);

  return authMiddleware(request, {
    loginPath: '/_api/login',
    logoutPath: '/_api/logout',
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    cookieSerializeOptions: serverConfig.cookieSerializeOptions,
    serviceAccount: serverConfig.serviceAccount,
    handleValidToken: async (_: unknown, headers?: Headers) => {
      if (normalizedPathname.includes('404-animation.json')) {
        return NextResponse.next({
          request,
        });
      }

      if (AUTH_PATHS.includes(normalizedPathname)) {
        return redirectToHome(request);
      }

      if (normalizedPathname.includes('api/proxy/')) {
        return NextResponse.next({
          request: {
            headers,
          },
        });
      }

      return handleI18nRouting(
        new NextRequest(request, {
          headers,
        })
      );
    },

    handleInvalidToken: async (reason: unknown) => {
      console.info(normalizedPathname, 'Missing or malformed credentials', {
        reason,
      });

      if (!PUBLIC_PATHS.includes(normalizedPathname)) {
        return redirectToLogin(request, {
          path: ROUTES.HOME,
          publicPaths: PUBLIC_PATHS,
        });
      }

      return handleI18nRouting(request);
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
    '/((?!_next/static|favicon.ico|sitemap.xml|robots.txt|rss-logo.svg|404-animation.json).*)',
    '/_api/login',
    '/_api/logout',
  ],
};
