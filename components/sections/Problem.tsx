'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Target, Zap } from 'lucide-react'
import { useTranslation } from '@/lib/i18n-context'

const icons = [Users, Target, Zap]

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export function Problem() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const cards = [
    {
      title: t('problem.card1_title'),
      description: t('problem.card1_description'),
      Icon: icons[0],
    },
    {
      title: t('problem.card2_title'),
      description: t('problem.card2_description'),
      Icon: icons[1],
    },
    {
      title: t('problem.card3_title'),
      description: t('problem.card3_description'),
      Icon: icons[2],
    },
  ]

  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="section-padding bg-background"
    >
      <div className="container" ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-500 mb-3">
            The Challenge
          </p>
          <h2
            id="problem-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight mb-4"
          >
            {t('problem.title')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('problem.subtitle')}
          </p>
        </motion.div>

        {/* Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          role="list"
          aria-label="Key challenges"
        >
          {cards.map(({ title, description, Icon }, i) => (
            <motion.article
              key={title}
              role="listitem"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="group relative rounded-2xl border border-border/60 bg-card p-7 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5"
            >
              {/* Gradient accent top bar */}
              <div
                aria-hidden="true"
                className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 ring-1 ring-purple-500/20">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>

              <h3 className="font-display font-semibold text-lg mb-3">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
