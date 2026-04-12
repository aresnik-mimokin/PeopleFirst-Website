'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTranslation } from '@/lib/i18n-context'
import { cn } from '@/lib/utils'

interface ToggleDarkProps {
  className?: string
}

export function ToggleDark({ className }: ToggleDarkProps) {
  const { theme, setTheme } = useTheme()
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div
        className={cn(
          'h-9 w-9 rounded-full bg-muted animate-pulse',
          className,
        )}
        aria-hidden="true"
      />
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? t('theme.toggle_light') : t('theme.toggle_dark')}
      className={cn(
        'relative h-9 w-9 rounded-full flex items-center justify-center',
        'text-muted-foreground hover:text-foreground hover:bg-muted',
        'transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
    >
      {isDark ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  )
}
