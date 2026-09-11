import type { ReactNode } from 'react'
import { NavBar } from '@/components/ui/NavBar'
import { Footer } from '@/components/ui/Footer'

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar alwaysSolid />
      <main id="main-content" className="min-h-screen pt-16">
        {children}
      </main>
      <Footer />
    </>
  )
}
