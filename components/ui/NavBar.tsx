'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTranslation } from '@/lib/i18n-context'
import { ToggleDark } from './ToggleDark'
import { ToggleLang } from './ToggleLang'
import { Button } from './Button'
import { cn } from '@/lib/utils'
import { DEFAULTS } from '@/lib/content-defaults'

const navLinks = [
  { key: 'nav.about', href: '/#about' },
  { key: 'nav.services', href: '/#specializations' },
  { key: 'nav.process', href: '/#process' },
  { key: 'nav.clients', href: '/#clients' },
  { key: 'nav.blog', href: '/blog' },
  { key: 'nav.contact', href: '/#contact' },
]

export function NavBar({ alwaysSolid = false }: { alwaysSolid?: boolean }) {
  const { t } = useTranslation()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const solid = scrolled || alwaysSolid

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // In-page anchors: smooth-scroll only when we're already on the homepage.
    // Otherwise let the browser navigate to /#section from the current page.
    if (href.startsWith('/#') && pathname === '/') {
      e.preventDefault()
      const el = document.querySelector(href.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        setMenuOpen(false)
      }
    } else {
      setMenuOpen(false)
    }
  }

  return (
    <>
      <header
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          solid
            ? 'bg-background/90 backdrop-blur-md border-b border-border/50 shadow-sm'
            : 'bg-transparent',
        )}
      >
        <nav
          aria-label="Main navigation"
          className="container mx-auto flex h-16 items-center justify-between"
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label="PeopleFirst Agency — home"
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          >
            <span className={cn(
              'font-display font-bold text-lg tracking-tight transition-colors',
              solid
                ? 'text-foreground group-hover:text-purple-400'
                : 'text-white group-hover:text-purple-300',
            )}>
              People<span className="text-purple-500">First</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-6" role="list">
            {navLinks.map(({ key, href }) => (
              <li key={key}>
                <a
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={cn(
                    'text-sm text-muted-foreground hover:text-foreground transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded',
                  )}
                >
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <ToggleLang />
            <ToggleDark />
            <Button
              asChild
              size="sm"
              className="ml-2"
            >
              <a
                href={DEFAULTS.nav.bookCallUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('nav.book_call')}
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center justify-center h-9 w-9 rounded-full hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-x-0 top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg md:hidden"
          >
            <div className="container py-6 flex flex-col gap-4">
              <ul className="flex flex-col gap-1" role="list">
                {navLinks.map(({ key, href }) => (
                  <li key={key}>
                    <a
                      href={href}
                      onClick={(e) => handleNavClick(e, href)}
                      className="block py-2.5 px-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      {t(key)}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                <ToggleLang />
                <ToggleDark />
                <Button asChild size="sm" className="ml-auto">
                  <a
                    href={DEFAULTS.nav.bookCallUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('nav.book_call')}
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
