'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from '@/lib/i18n-context'
import { cn } from '@/lib/utils'

const pricingKeys = [
  { value: 'pricing.card1_value', title: 'pricing.card1_title', desc: 'pricing.card1_description', highlight: true },
  { value: 'pricing.card2_value', title: 'pricing.card2_title', desc: 'pricing.card2_description', highlight: false },
  { value: 'pricing.card3_value', title: 'pricing.card3_title', desc: 'pricing.card3_description', highlight: false },
  { value: 'pricing.card4_value', title: 'pricing.card4_title', desc: 'pricing.card4_description', highlight: false },
]

export function Pricing() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
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
            Pricing
          </p>
          <h2
            id="pricing-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight mb-4"
          >
            {t('pricing.title')}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          role="list"
          aria-label="Pricing details"
        >
          {pricingKeys.map(({ value: valueKey, title: titleKey, desc: descKey, highlight }, i) => (
            <motion.article
              key={titleKey}
              role="listitem"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'relative rounded-2xl border p-7 flex flex-col transition-all duration-300',
                highlight
                  ? 'border-purple-500/50 bg-gradient-to-b from-purple-500/10 to-purple-500/5 shadow-lg shadow-purple-500/10'
                  : 'border-border/60 bg-card hover:border-purple-500/30 hover:shadow-md hover:shadow-purple-500/5',
              )}
            >
              {highlight && (
                <div
                  aria-hidden="true"
                  className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                />
              )}

              {/* Value */}
              <div className="mb-4">
                <span
                  className={cn(
                    'font-display font-bold text-5xl leading-none',
                    highlight ? 'gradient-text' : 'text-foreground',
                  )}
                  aria-label={t(valueKey)}
                >
                  {t(valueKey)}
                </span>
              </div>

              <h3 className="font-display font-semibold text-lg mb-3">{t(titleKey)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{t(descKey)}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
