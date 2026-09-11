import { Metadata } from 'next'
import { NavBar } from '@/components/ui/NavBar'
import { Footer } from '@/components/ui/Footer'
import { Hero } from '@/components/sections/Hero'
import { Problem } from '@/components/sections/Problem'
import { Specializations } from '@/components/sections/Specializations'
import { About } from '@/components/sections/About'
import { Process } from '@/components/sections/Process'
import { GlobalReach } from '@/components/sections/GlobalReach'
import { Clients } from '@/components/sections/Clients'
import { Blog } from '@/components/sections/Blog'
import { Contact } from '@/components/sections/Contact'
import { DEFAULTS } from '@/lib/content-defaults'

export const metadata: Metadata = {
  title: DEFAULTS.seo.siteTitle,
  description: DEFAULTS.seo.siteDescription,
}

export default function HomePage() {
  return (
    <>
      <NavBar />
      <main id="main-content">
        <Hero />
        <Problem />
        <Specializations />
        <About />
        <Process />
        <GlobalReach />
        <Clients />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
