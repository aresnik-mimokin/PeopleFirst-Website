'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import en from '@/public/locales/en/common.json'
import es from '@/public/locales/es/common.json'

export type Locale = 'en' | 'es'

type TranslationValue = string | Record<string, unknown> | TranslationValue[]
type Translations = Record<string, TranslationValue>

const translations: Record<Locale, Translations> = { en, es }

interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, fallback?: string) => string
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  setLocale: () => {},
  t: (key) => key,
})

function getNestedValue(obj: Translations, key: string): string {
  const parts = key.split('.')
  let current: TranslationValue = obj
  for (const part of parts) {
    if (typeof current !== 'object' || current === null || Array.isArray(current)) {
      return key
    }
    current = (current as Record<string, TranslationValue>)[part]
    if (current === undefined) return key
  }
  return typeof current === 'string' ? current : key
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    const stored = localStorage.getItem('pf-locale') as Locale | null
    if (stored && (stored === 'en' || stored === 'es')) {
      setLocaleState(stored)
    }
  }, [])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('pf-locale', newLocale)
    document.documentElement.lang = newLocale
  }, [])

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const result = getNestedValue(translations[locale], key)
      if (result === key && fallback) return fallback
      return result
    },
    [locale],
  )

  return <I18nContext.Provider value={{ locale, setLocale, t }}>{children}</I18nContext.Provider>
}

export function useTranslation() {
  return useContext(I18nContext)
}
