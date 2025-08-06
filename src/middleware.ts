import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const PUBLIC_FILE = /\.(.*)$/; // Files
const locales = routing.locales; // Supported locales from routing
const defaultLocale = routing.defaultLocale; // Default locale from routing

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore public files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon.ico') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // If the pathname already has a locale, proceed with authentication check
    return handleAuth(request);
  }

  // Redirect if there is no locale in the pathname
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is /en/products
  return NextResponse.redirect(request.nextUrl);
}

function getLocale(request: NextRequest) {
  // Negotiator expects a plain object with keys
  // const acceptLanguage = request.headers.get('accept-language');
  // const languages = acceptLanguage ? acceptLanguage.split(',').map(lang => lang.split(';')[0]) : [];
  
  // // Check if any of the preferred languages match our supported locales
  // for (const lang of languages) {
  //   if (locales.includes(lang)) {
  //     return lang;
  //   }
  // }
  return defaultLocale;
}

function handleAuth(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Assume a cookie `auth_token` is used to check for authentication
  const isAuthenticated = request.cookies.has('auth_token');

  // Public routes that do not require authentication, adjusted for i18n
  const publicRoutes = locales.flatMap(locale => [
    `/${locale}/login`,
    `/${locale}/register`,
    `/${locale}/privacy`,
    `/${locale}/terms`,
    '/login', // Fallback for root public routes without locale
    '/register',
    '/privacy',
    '/terms'
  ]);

  // Check if the current path (after locale handling) is a public route
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  if (!isAuthenticated && !isPublicRoute) {
    // Redirect to login page of the current locale if not authenticated and not a public route
    const currentLocale = pathname.split('/')[1]; // Extract locale from path
    const redirectPath = locales.includes(currentLocale) ? `/${currentLocale}/login` : `/${defaultLocale}/login`;
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  if (isAuthenticated && isPublicRoute) {
    // Redirect authenticated users from public routes to the home page of their current locale
    const currentLocale = pathname.split('/')[1];
    const redirectPath = locales.includes(currentLocale) ? `/${currentLocale}` : `/${defaultLocale}`;
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - Any public files (e.g., .svg, .png, .jpg)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};