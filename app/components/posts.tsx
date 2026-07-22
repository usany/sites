import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";

export function BlogPosts({ locale }: { locale?: string }) {
  let allBlogs = getBlogPosts(locale);
  const resolvedLocale = locale;

  return (
    <div className="grid gap-3 pb-8">
      {allBlogs
        .sort((a, b) => a.metadata.title.localeCompare(b.metadata.title))
        .map((post) => (
          <Link
            key={post.slug}
            href={`/${resolvedLocale}/blog/${post.slug}`}
            className="group block border border-neutral-200 dark:border-neutral-700 rounded-xl p-4 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-600 hover:shadow-md dark:hover:shadow-xl transition-all duration-200"
          >
            <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
              <p className="text-xs md:text-sm font-semibold text-neutral-500 dark:text-neutral-400 tabular-nums uppercase tracking-wider flex-shrink-0">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="text-base md:text-lg font-semibold text-neutral-900 dark:text-white group-hover:text-neutral-700 dark:group-hover:text-neutral-50 transition-colors tracking-tight flex-1">
                {post.metadata.title}
              </p>
              <span className="text-neutral-400 dark:text-neutral-600 group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors flex-shrink-0 hidden md:inline">
                →
              </span>
            </div>
          </Link>
        ))}
    </div>
  );
}
