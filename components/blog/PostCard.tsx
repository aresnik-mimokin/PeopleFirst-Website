'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from '@/lib/i18n-context'
import { pickTitle, pickExcerpt, formatDate } from '@/lib/blog-i18n'
import type { PostSummary } from '@/lib/posts'

export function PostCard({ post, index = 0 }: { post: PostSummary; index?: number }) {
  const { locale } = useTranslation()
  const title = pickTitle(post, locale)
  const excerpt = pickExcerpt(post, locale)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group h-full"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:border-purple-500/40 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {/* Cover */}
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div
              className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-blue-500/10 to-transparent"
              aria-hidden="true"
            />
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-6">
          {post.tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-purple-500/10 px-2.5 py-0.5 text-xs font-medium text-purple-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h3 className="font-display text-xl font-bold leading-snug transition-colors group-hover:text-purple-400">
            {title}
          </h3>

          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {excerpt}
          </p>

          <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-4">
            <span className="text-xs text-muted-foreground">
              {formatDate(post.publishedDate, locale)}
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-purple-500">
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
