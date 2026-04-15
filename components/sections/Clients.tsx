'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from '@/lib/i18n-context'
import { DEFAULTS } from '@/lib/content-defaults'

export function Clients() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const clients = DEFAULTS.clients.list

  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className="section-padding bg-muted/30 dark:bg-navy-900/50"
    >
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-500 mb-3">
            Clients
          </p>
          <h2
            id="clients-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight mb-4"
          >
            {t('clients.title')}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t('clients.subtitle')}
          </p>
        </motion.div>

        {/* Client grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
          role="list"
          aria-label="Client companies"
        >
          {clients.map(({ name, url }, i) => (
            <motion.a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="group flex items-center justify-center rounded-xl border border-border/60 bg-card px-5 py-6 hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-300 cursor-pointer"
            >
              <span className="font-display font-semibold text-sm text-center text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
                {name}
              </span>
            </motion.a>
          ))}

          {/* "And more" card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: clients.length * 0.07 }}
            className="flex items-center justify-center rounded-xl border border-dashed border-border/40 bg-transparent px-5 py-6"
            aria-hidden="true"
          >
            <span className="text-xs text-muted-foreground/50 text-center">& more</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
