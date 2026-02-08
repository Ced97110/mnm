import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './lib/i18n/config';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, API routes, and special Next.js paths
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') || // files with extensions
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already includes a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname already has a locale, continue
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Get the preferred locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  let preferredLocale = defaultLocale;

  if (acceptLanguage) {
    // Simple language detection - check if Spanish is preferred
    const languages = acceptLanguage.split(',').map((lang) => {
      const [code] = lang.trim().split(';');
      return code.toLowerCase();
    });

    // Check if Spanish is in the accepted languages
    const hasSpanish = languages.some(
      (lang) => lang.startsWith('es')
    );

    if (hasSpanish) {
      preferredLocale = 'es';
    }
  }

  // If preferred locale is English, don't redirect (English is at root)
  if (preferredLocale === defaultLocale) {
    return NextResponse.next();
  }

  // Redirect to the Spanish version
  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Match all pathnames except for:
  // - Static files (images, fonts, etc.)
  // - API routes
  // - _next (Next.js internals)
  matcher: [
    '/((?!_next|api|favicon.ico|.*\\..*).*)',
  ],
};
