'use client'

import { useTranslation } from '@/lib/i18n-context'
import { PostCard } from '@/components/blog/PostCard'
import type { PostSummary } from '@/lib/posts'

export function BlogIndex({ posts }: { posts: PostSummary[] }) {
  const { t, locale } = useTranslation()
  const visible = posts.filter((p) => p.language === locale)

  return (
    <section className="section-padding">
      <div className="container">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-purple-500">
            {t('blog.eyebrow', 'Blog')}
          </p>
          <h1 className="mb-4 font-display text-4xl font-bold leading-tight sm:text-5xl">
            {t('blog.title', 'Insights & Ideas')}
          </h1>
          <p className="leading-relaxed text-muted-foreground">
            {t('blog.subtitle', 'Perspectives on hiring, talent, and building great tech teams.')}
          </p>
        </div>

        {visible.length === 0 ? (
          <p className="text-center text-muted-foreground">
            {t('blog.empty', 'No posts yet — check back soon.')}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
