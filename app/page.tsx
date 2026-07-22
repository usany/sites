import { redirect } from 'next/navigation';
import { getPreferredLanguage } from './lib/language';

export default async function RootPage() {
  const lang = await getPreferredLanguage();
  redirect(`/${lang}`);
}
