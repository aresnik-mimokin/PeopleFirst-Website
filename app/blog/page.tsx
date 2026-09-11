import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import { BlogIndex } from '@/components/blog/BlogIndex'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on hiring, talent, and building great engineering & AI teams — from the PeopleFirst team.',
  alternates: { canonical: '/blog' },
}

export default async function BlogPage() {
  const posts = await getAllPosts()
  return <BlogIndex posts={posts} />
}
