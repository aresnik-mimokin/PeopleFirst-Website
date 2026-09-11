'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useTranslation } from '@/lib/i18n-context'

export function PostBody({ en, es }: { en: string; es: string }) {
  const { locale } = useTranslation()
  // Show the active language; fall back to the other if that one is empty.
  const preferred = locale === 'es' ? es : en
  const fallback = locale === 'es' ? en : es
  const body = (preferred?.trim() ? preferred : fallback) ?? ''

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children }) => {
          const external = typeof href === 'string' && href.startsWith('http')
          return (
            <a
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          )
        },
      }}
    >
      {body}
    </ReactMarkdown>
  )
}
