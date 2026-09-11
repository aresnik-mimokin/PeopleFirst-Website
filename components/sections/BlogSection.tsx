'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from '@/lib/i18n-context'
import { PostCard } from '@/components/blog/PostCard'
import type { PostSummary } from '@/lib/posts'

export function BlogSection({ posts }: { posts: PostSummary[] }) {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  if (posts.length === 0) return null

  return (
    <section
      id="blog"
      aria-labelledby="blog-heading"
      className="section-padding bg-background"
    >
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-purple-500">
            {t('blog.eyebrow', 'Blog')}
          </p>
          <h2
            id="blog-heading"
            className="mb-4 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl"
          >
            {t('blog.title', 'Insights & Ideas')}
          </h2>
          <p className="leading-relaxed text-muted-foreground">
            {t('blog.subtitle', 'Perspectives on hiring, talent, and building great tech teams.')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <PostCard key={post.slug} post={post} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-purple-500/40 hover:text-purple-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t('blog.view_all', 'View all posts')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
