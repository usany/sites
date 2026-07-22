import { getBlogPosts } from '@/blog/utils'

export const baseUrl = 'https://portfolio-blog-starter.vercel.app'

const locales = ['en', 'ko']

export default async function sitemap() {
  let blogs = getBlogPosts().flatMap((post) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: post.metadata.publishedAt,
    }))
  )

  let routes = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date().toISOString().split('T')[0],
    },
    {
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date().toISOString().split('T')[0],
    },
  ])

  return [...routes, ...blogs]
}
