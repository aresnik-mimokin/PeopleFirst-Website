'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'
import { useTranslation } from '@/lib/i18n-context'
import { DEFAULTS } from '@/lib/content-defaults'

export function About() {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const credentials = [
    t('about.credential1'),
    t('about.credential2'),
    t('about.credential3'),
    t('about.credential4'),
  ]

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-padding bg-background"
    >
      <div className="container" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Photo side */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 rounded-3xl overflow-hidden">
              {/* Placeholder gradient background */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-navy-900 flex items-center justify-center"
                aria-hidden="true"
              >
                <div className="text-center">
                  <div className="h-20 w-20 rounded-full bg-purple-500/20 ring-2 ring-purple-500/30 mx-auto mb-3 flex items-center justify-center">
                    <span className="font-display font-bold text-2xl text-purple-300">CC</span>
                  </div>
                  <p className="text-white/40 text-sm">Photo coming soon</p>
                </div>
              </div>
              {/* Replace src with actual photo path: /images/carla-costantini.jpg */}
              {/* Uncomment when photo is available:
              <Image
                src="/images/carla-costantini.jpg"
                alt={t('about.image_alt')}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={false}
              />
              */}
            </div>

            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-4 -right-4 lg:-right-8 rounded-2xl border border-purple-500/20 bg-card/90 backdrop-blur-sm p-4 shadow-xl"
              aria-hidden="true"
            >
              <p className="text-xs text-muted-foreground mb-1">Founded</p>
              <p className="font-display font-bold text-2xl gradient-text">PeopleFirst</p>
              <p className="text-xs text-muted-foreground mt-0.5">by Carla Costantini</p>
            </motion.div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-500 mb-3">
              About
            </p>
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight mb-3"
            >
              {t('about.title')}
            </h2>
            <p className="text-purple-400/80 font-medium mb-6">{t('about.subtitle')}</p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {t('about.bio')}
            </p>

            <ul className="flex flex-col gap-4" aria-label="Carla's credentials">
              {credentials.map((cred, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2
                    className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed">{cred}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
