'use client'

import { useTranslation, type Locale } from '@/lib/i18n-context'
import { cn } from '@/lib/utils'

interface ToggleLangProps {
  className?: string
}

export function ToggleLang({ className }: ToggleLangProps) {
  const { locale, setLocale, t } = useTranslation()

  const toggle = () => {
    const next: Locale = locale === 'en' ? 'es' : 'en'
    setLocale(next)
  }

  return (
    <button
      onClick={toggle}
      aria-label={locale === 'en' ? t('lang.switch_to_es') : t('lang.switch_to_en')}
      className={cn(
        'h-9 px-2.5 rounded-full flex items-center gap-1 text-sm font-medium',
        'text-muted-foreground hover:text-foreground hover:bg-muted',
        'transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
    >
      <span
        className={cn(
          'transition-colors',
          locale === 'en' ? 'text-foreground font-semibold' : 'text-muted-foreground',
        )}
        aria-current={locale === 'en' ? 'true' : undefined}
      >
        EN
      </span>
      <span className="text-muted-foreground/50">/</span>
      <span
        className={cn(
          'transition-colors',
          locale === 'es' ? 'text-foreground font-semibold' : 'text-muted-foreground',
        )}
        aria-current={locale === 'es' ? 'true' : undefined}
      >
        ES
      </span>
    </button>
  )
}
