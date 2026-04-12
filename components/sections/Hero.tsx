'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useTranslation } from '@/lib/i18n-context'
import { Button } from '@/components/ui/Button'
import { DEFAULTS } from '@/lib/content-defaults'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export function Hero() {
  const { t } = useTranslation()

  const scrollToNext = () => {
    document.getElementById('problem')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden grain-overlay bg-navy-900 dark:bg-navy-900"
      style={{ background: 'var(--hero-bg, #0A0A1A)' }}
    >
      {/* Background gradient orbs */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-purple-700/20 blur-[120px]" />
        <div className="absolute top-1/2 -right-60 w-[500px] h-[400px] rounded-full bg-blue-500/15 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full bg-purple-900/20 blur-[80px]" />
      </div>

      {/* Grid lines overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container relative z-10 flex flex-col items-center text-center pt-24 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6 max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-medium text-purple-300 tracking-wide">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
              </span>
              IT · Data · AI Recruiting
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.05] tracking-tight"
          >
            {t('hero.headline')}
            <br />
            <span className="gradient-text">{t('hero.headline_accent')}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed"
          >
            {t('hero.subheadline')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-3 mt-2"
          >
            <Button
              asChild
              variant="gradient"
              size="lg"
              className="group"
            >
              <a
                href={DEFAULTS.hero.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('hero.cta_primary')}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToNext}
              className="border-white/20 text-white/70 hover:bg-white/5 hover:border-white/40 hover:text-white"
            >
              {t('hero.cta_secondary')}
            </Button>
          </motion.div>

          {/* Social proof line */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 mt-4 text-sm text-white/40"
          >
            <span>Trusted by</span>
            <span className="text-white/70 font-medium">Hotel Engine · dLocal · Stay AI · Deepcell</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        aria-label="Scroll to next section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full p-2"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5" aria-hidden="true" />
        </motion.div>
      </button>
    </section>
  )
}
