import { cookies } from 'next/headers';

export async function getPreferredLanguage(): Promise<string> {
  try {
    const cookieStore = await cookies();
    const langCookie = cookieStore.get('language');
    if (langCookie?.value && ['en', 'ko'].includes(langCookie.value)) {
      return langCookie.value;
    }
  } catch {
    // Cookies unavailable
  }
  return 'en';
}
