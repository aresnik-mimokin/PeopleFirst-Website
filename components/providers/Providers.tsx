'use client'

import type { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { I18nProvider } from '@/lib/i18n-context'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <I18nProvider>{children}</I18nProvider>
    </ThemeProvider>
  )
}
