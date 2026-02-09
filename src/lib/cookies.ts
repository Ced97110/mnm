// Cookie utility functions for client-side cookie management

export interface CookieOptions {
  days?: number;
  path?: string;
  sameSite?: 'strict' | 'lax' | 'none';
  secure?: boolean;
}

/**
 * Set a cookie
 */
export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  if (typeof window === 'undefined') return;

  const {
    days = 365,
    path = '/',
    sameSite = 'lax',
    secure = true,
  } = options;

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    cookieString += `; expires=${date.toUTCString()}`;
  }

  cookieString += `; path=${path}`;
  cookieString += `; SameSite=${sameSite}`;

  if (secure) {
    cookieString += '; Secure';
  }

  document.cookie = cookieString;
}

/**
 * Get a cookie value
 */
export function getCookie(name: string): string | null {
  if (typeof window === 'undefined') return null;

  const nameEQ = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(
        cookie.substring(nameEQ.length, cookie.length)
      );
    }
  }

  return null;
}

/**
 * Delete a cookie
 */
export function deleteCookie(name: string, path: string = '/'): void {
  if (typeof window === 'undefined') return;

  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
}

/**
 * Check if user has consented to cookies
 */
export function hasConsentedToCookies(): boolean {
  return getCookie('cookie_consent') === 'true';
}

/**
 * Set cookie consent
 */
export function setConsentToCookies(consented: boolean): void {
  setCookie('cookie_consent', consented ? 'true' : 'false', { days: 365 });
}

/**
 * Get preferred language
 */
export function getPreferredLanguage(): 'en' | 'es' | null {
  const lang = getCookie('preferred_language');
  return lang === 'en' || lang === 'es' ? lang : null;
}

/**
 * Set preferred language
 */
export function setPreferredLanguage(language: 'en' | 'es'): void {
  setCookie('preferred_language', language, { days: 365 });
}

/**
 * Get saved location for travel calculator
 */
export function getSavedLocation(): { lat: number; lng: number } | null {
  const location = getCookie('last_location');
  if (!location) return null;

  try {
    return JSON.parse(location);
  } catch {
    return null;
  }
}

/**
 * Save location for travel calculator
 */
export function saveLocation(lat: number, lng: number): void {
  const location = JSON.stringify({ lat, lng });
  setCookie('last_location', location, { days: 30 });
}
