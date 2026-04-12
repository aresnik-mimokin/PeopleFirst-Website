'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Globe } from 'lucide-react'
import { useTranslation } from '@/lib/i18n-context'

export function GlobalReach() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const panels = [
    {
      title: t('global_reach.latam_title'),
      countries: t('global_reach.latam_countries'),
      description: t('global_reach.latam_description'),
      gradient: 'from-purple-900/60 to-purple-800/20',
      accentColor: 'text-purple-300',
      borderColor: 'border-purple-500/20',
      glowColor: 'bg-purple-500/10',
    },
    {
      title: t('global_reach.europe_title'),
      countries: t('global_reach.europe_countries'),
      description: t('global_reach.europe_description'),
      gradient: 'from-blue-900/60 to-blue-800/20',
      accentColor: 'text-blue-300',
      borderColor: 'border-blue-500/20',
      glowColor: 'bg-blue-500/10',
    },
  ]

  return (
    <section
      id="reach"
      aria-labelledby="reach-heading"
      className="section-padding bg-background"
    >
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-500 mb-3">
            Coverage
          </p>
          <h2
            id="reach-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight"
          >
            {t('global_reach.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {panels.map(({ title, countries, description, gradient, accentColor, borderColor, glowColor }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`relative rounded-2xl border ${borderColor} overflow-hidden p-8 md:p-10 bg-gradient-to-br ${gradient}`}
            >
              {/* Background glow */}
              <div
                aria-hidden="true"
                className={`absolute -top-16 -right-16 w-64 h-64 rounded-full ${glowColor} blur-3xl`}
              />

              <div className="relative z-10">
                <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl ${glowColor} ring-1 ${borderColor} mb-6`}>
                  <Globe className={`h-6 w-6 ${accentColor}`} aria-hidden="true" />
                </div>

                <h3 className="font-display font-bold text-2xl md:text-3xl mb-3">{title}</h3>

                <p className={`text-sm font-medium ${accentColor} mb-4 tracking-wide`}>
                  {countries}
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
