import { createReader } from '@keystatic/core/reader'
import keystaticConfig from '@/keystatic.config'

const reader = createReader(process.cwd(), keystaticConfig)

export interface PostSummary {
  slug: string
  title: string
  titleEs: string
  publishedDate: string
  author: string
  excerpt: string
  excerptEs: string
  coverImage: string | null
  tags: string[]
  draft: boolean
}

function toSummary(slug: string, entry: any): PostSummary {
  return {
    slug,
    title: entry.title ?? '',
    titleEs: entry.titleEs ?? '',
    publishedDate: entry.publishedDate,
    author: entry.author,
    excerpt: entry.excerpt ?? '',
    excerptEs: entry.excerptEs ?? '',
    coverImage: entry.coverImage ?? null,
    tags: [...(entry.tags ?? [])],
    draft: entry.draft ?? false,
  }
}

/** All published posts, newest first. Drafts are excluded. */
export async function getAllPosts(): Promise<PostSummary[]> {
  const posts = await reader.collections.posts.all()
  return posts
    .map((p) => toSummary(p.slug, p.entry))
    .filter((p) => !p.draft)
    .sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1))
}

/** The N most recent published posts. */
export async function getLatestPosts(limit = 3): Promise<PostSummary[]> {
  return (await getAllPosts()).slice(0, limit)
}

/** A single published post with both language bodies (Markdown), or null. */
export async function getPost(slug: string) {
  const entry = await reader.collections.posts.read(slug)
  if (!entry || entry.draft) return null

  return {
    ...toSummary(slug, entry),
    content: entry.content ?? '',
    contentEs: entry.contentEs ?? '',
  }
}
