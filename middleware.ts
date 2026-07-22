import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'ko'];
const defaultLocale = 'en';

function getLocaleFromRequest(request: NextRequest): string {
  const pathname = request.nextUrl.pathname;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return '';

  const locale = request.headers
    .get('accept-language')
    ?.split(',')[0]
    .split('-')[0]
    .toLowerCase();

  return locale && locales.includes(locale) ? locale : defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  if (pathname === '/') {
    const locale = getLocaleFromRequest(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url)
    );
  }

  const locale = getLocaleFromRequest(request);
  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: ['/((?!_next|.*\\..*|api).*)'],
};
