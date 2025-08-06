import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle internationalization first
  const intlResponse = intlMiddleware(request);
  
  // If intl middleware returns a response (redirect), use it
  if (intlResponse) {
    return intlResponse;
  }

  // Extract locale from pathname
  const locale = pathname.split('/')[1] || routing.defaultLocale;
  const pathnameWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

  // Assume a cookie `auth_token` is used to check for authentication
  const isAuthenticated = request.cookies.has('auth_token');

  const publicRoutes = ['/login', '/register', '/privacy', '/terms'];

  if (!isAuthenticated && !publicRoutes.includes(pathnameWithoutLocale)) {
    return NextResponse.redirect(new URL(`/${locale}/register`, request.url));
  }

  if (isAuthenticated && publicRoutes.includes(pathnameWithoutLocale)) {
    return NextResponse.redirect(new URL(`/${locale}/`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};