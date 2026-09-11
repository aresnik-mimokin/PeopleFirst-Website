import { getAllPosts } from '@/lib/posts'
import { BlogSection } from './BlogSection'

export async function Blog() {
  // Pass all posts; the client component filters by the active language and
  // shows the latest few, so switching language re-filters the list.
  const posts = await getAllPosts()
  return <BlogSection posts={posts} />
}
