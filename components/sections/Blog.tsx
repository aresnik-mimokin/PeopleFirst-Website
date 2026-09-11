import { getLatestPosts } from '@/lib/posts'
import { BlogSection } from './BlogSection'

export async function Blog() {
  const posts = await getLatestPosts(3)
  return <BlogSection posts={posts} />
}
