'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Code2 } from 'lucide-react'
import { useTranslation } from '@/lib/i18n-context'
import { DEFAULTS } from '@/lib/content-defaults'

const colIcons = [Brain, Code2]
const accentColors = [
  'text-purple-400 bg-purple-500/10 ring-purple-500/20',
  'text-blue-400 bg-blue-500/10 ring-blue-500/20',
]
const hoverColors = [
  'hover:border-purple-500/40 hover:shadow-purple-500/5',
  'hover:border-blue-500/40 hover:shadow-blue-500/5',
]

export function Specializations() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const columns = DEFAULTS.specializations.columns.map((col, i) => ({
    ...col,
    Icon: colIcons[i],
    accent: accentColors[i],
    hover: hoverColors[i],
    titleKey: ['specializations.col1_title', 'specializations.col2_title'][i],
  }))

  return (
    <section
      id="specializations"
      aria-labelledby="spec-heading"
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
            Specializations
          </p>
          <h2
            id="spec-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight"
          >
            {t('specializations.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto" role="list" aria-label="Specialization areas">
          {columns.map(({ title, titleKey, Icon, accent, hover, roles }, i) => (
            <motion.article
              key={title}
              role="listitem"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative rounded-2xl border border-border/60 bg-card p-7 transition-all duration-300 hover:shadow-lg ${hover}`}
            >
              {/* Icon */}
              <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl ring-1 ${accent}`}>
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>

              <h3 className="font-display font-bold text-xl mb-5">{t(titleKey)}</h3>

              <ul className="flex flex-col gap-2.5" aria-label={`${t(titleKey)} roles`}>
                {roles.map((role) => (
                  <li
                    key={role}
                    className="flex items-center gap-2.5 text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 rounded-full bg-purple-500/60 flex-shrink-0"
                    />
                    {role}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
