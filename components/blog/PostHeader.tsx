'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { useTranslation } from '@/lib/i18n-context'
import type { PostSummary } from '@/lib/posts'

function formatDate(date: string, language: 'en' | 'es') {
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString(language === 'es' ? 'es-AR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

export function PostHeader({ post }: { post: PostSummary }) {
  const { t } = useTranslation()

  return (
    <header className="mx-auto mb-10 max-w-3xl">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-purple-400"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {t('blog.back', 'Back to blog')}
      </Link>

      {post.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-purple-500/10 px-2.5 py-0.5 text-xs font-medium text-purple-500"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
        {post.title}
      </h1>

      <p className="mt-4 text-sm text-muted-foreground">
        {t('blog.by', 'By')} {post.author} · {formatDate(post.publishedDate, post.language)}
      </p>

      {post.coverImage && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-muted">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
            priority
          />
        </div>
      )}
    </header>
  )
}
