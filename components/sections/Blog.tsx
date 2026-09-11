import { getLatestPosts } from '@/lib/posts'
import { BlogSection } from './BlogSection'

export async function Blog() {
  // Posts are bilingual, so every post appears in both languages; the cards
  // just show the title/excerpt for the active language.
  const posts = await getLatestPosts(3)
  return <BlogSection posts={posts} />
}
