'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from '@/lib/i18n-context'
import { DEFAULTS } from '@/lib/content-defaults'

export function Process() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const steps = DEFAULTS.process.steps.map((step, i) => ({
    ...step,
    title: t([`process.step${i + 1}_title`][0]),
    description: t([`process.step${i + 1}_description`][0]),
  }))

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="section-padding bg-muted/30 dark:bg-navy-900/50"
    >
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-500 mb-3">
            Our Process
          </p>
          <h2
            id="process-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight"
          >
            {t('process.title')}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div
            aria-hidden="true"
            className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-purple-500/60 via-blue-500/40 to-transparent hidden sm:block"
          />

          <ol className="flex flex-col gap-10" aria-label="Recruitment process steps">
            {steps.map(({ number, title, description }, i) => (
              <motion.li
                key={number}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex gap-6 sm:gap-8"
              >
                {/* Step number bubble */}
                <div
                  aria-hidden="true"
                  className="relative flex-shrink-0 h-16 w-16 rounded-full bg-background border-2 border-purple-500/40 flex items-center justify-center z-10"
                >
                  <span className="font-display font-bold text-purple-400 text-lg leading-none">
                    {number}
                  </span>
                  {/* Outer glow */}
                  <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-md -z-10" />
                </div>

                {/* Content */}
                <div className="flex-1 pt-3 pb-2">
                  <h3 className="font-display font-bold text-xl mb-2">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
