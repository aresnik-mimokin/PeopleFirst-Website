'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from '@/lib/i18n-context'
import { DEFAULTS } from '@/lib/content-defaults'
import { TESTIMONIALS, type Testimonial } from '@/lib/testimonials'

function TestimonialCard({
  item,
  delay,
  inView,
}: {
  item: Testimonial
  delay: number
  inView: boolean
}) {
  const { t, locale } = useTranslation()
  const [expanded, setExpanded] = useState(false)

  const text = locale === 'es' ? item.quote.es : item.quote.en
  const paragraphs = text.split('\n\n')
  const hasMore = paragraphs.length > 1
  const visible = expanded || !hasMore ? text : paragraphs[0]

  return (
    <motion.figure
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-6 rounded-2xl border border-border/60 bg-card p-7"
    >
      <blockquote className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
        {`“${visible}${hasMore && !expanded ? '…' : ''}”`}
      </blockquote>

      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="self-start text-xs font-semibold uppercase tracking-widest text-purple-500 hover:text-purple-400 transition-colors"
        >
          {expanded ? t('clients.read_less') : t('clients.read_more')}
        </button>
      )}

      <figcaption className="mt-auto">
        {item.linkedinUrl ? (
          <a
            href={item.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display font-semibold text-sm hover:text-purple-400 transition-colors"
          >
            {item.name}
          </a>
        ) : (
          <span className="font-display font-semibold text-sm">{item.name}</span>
        )}
        <p className="text-xs text-muted-foreground mt-0.5">{item.role}</p>
      </figcaption>
    </motion.figure>
  )
}

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

        {/* Client recommendations */}
        <h3 className="font-display font-bold text-2xl sm:text-3xl text-center mt-20 mb-10">
          {t('clients.recommendations_title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((item, i) => (
            <TestimonialCard key={item.name} item={item} delay={i * 0.08} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
