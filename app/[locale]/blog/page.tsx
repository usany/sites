import { BlogPosts } from '../../components/posts'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default async function Page({ params }) {
  const { locale } = await params
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">My Blog</h1>
      <BlogPosts locale={locale} />
    </section>
  )
}
