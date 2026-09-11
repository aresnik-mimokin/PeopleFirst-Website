import type { Locale } from '@/lib/i18n-context'
import type { PostSummary } from '@/lib/posts'

/**
 * Pick the title/excerpt for the active language, falling back to the other
 * language when the selected one is empty. Client-safe (type-only imports).
 */
export function pickTitle(post: Pick<PostSummary, 'title' | 'titleEs'>, locale: Locale): string {
  return locale === 'es' ? post.titleEs || post.title : post.title || post.titleEs
}

export function pickExcerpt(
  post: Pick<PostSummary, 'excerpt' | 'excerptEs'>,
  locale: Locale,
): string {
  return locale === 'es' ? post.excerptEs || post.excerpt : post.excerpt || post.excerptEs
}

export function formatDate(date: string, locale: Locale): string {
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return date
  return d.toLocaleDateString(locale === 'es' ? 'es-AR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
