'use client'

import Link from 'next/link'
import { Linkedin, Mail } from 'lucide-react'
import { useTranslation } from '@/lib/i18n-context'
import { ToggleDark } from './ToggleDark'
import { ToggleLang } from './ToggleLang'
import { DEFAULTS } from '@/lib/content-defaults'

const footerLinks = [
  { key: 'nav.about', href: '#about' },
  { key: 'nav.services', href: '#specializations' },
  { key: 'nav.process', href: '#process' },
  { key: 'nav.clients', href: '#clients' },
  { key: 'nav.contact', href: '#contact' },
]

export function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer
      role="contentinfo"
      className="border-t border-border/50 bg-background"
    >
      <div className="container mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" aria-label="PeopleFirst Agency — home" className="w-fit">
              <span className="font-display font-bold text-xl tracking-tight">
                People<span className="text-purple-500">First</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href={DEFAULTS.nav.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="PeopleFirst on LinkedIn"
                className="h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href={`mailto:${DEFAULTS.contact.email}`}
                aria-label={`Email ${DEFAULTS.contact.email}`}
                className="h-9 w-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navigation column */}
          <nav aria-label="Footer navigation">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Navigation
            </p>
            <ul className="flex flex-col gap-2" role="list">
              {footerLinks.map(({ key, href }) => (
                <li key={key}>
                  <a
                    href={href}
                    onClick={(e) => handleClick(e, href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(key)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact column */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
              Contact
            </p>
            <ul className="flex flex-col gap-2" role="list">
              <li>
                <a
                  href={`mailto:${DEFAULTS.contact.email}`}
                  className="text-sm text-muted-foreground hover:text-purple-400 transition-colors"
                >
                  {DEFAULTS.contact.email}
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-2 mt-6">
              <ToggleLang />
              <ToggleDark />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            {t('footer.copyright').replace('{year}', String(year))}
          </p>
          <p className="text-xs text-muted-foreground">
            Founder:{' '}
            <a
              href={`mailto:${DEFAULTS.contact.email}`}
              className="hover:text-purple-400 transition-colors"
            >
              Carla Costantini
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
