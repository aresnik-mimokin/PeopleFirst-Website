import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Providers } from '@/components/providers/Providers'
import { DEFAULTS } from '@/lib/content-defaults'
import '@fontsource-variable/dm-sans'
import '@fontsource-variable/syne'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://wearepeoplefirst.com'),
  title: {
    default: DEFAULTS.seo.siteTitle,
    template: `%s | PeopleFirst Agency`,
  },
  description: DEFAULTS.seo.siteDescription,
  keywords: [
    'IT recruiting LATAM',
    'AI talent acquisition',
    'engineering recruiting',
    'tech recruiting agency',
    'data science recruitment',
    'software engineering jobs',
    'LATAM tech talent',
    'scale-up recruiting',
  ],
  authors: [{ name: 'Carla Costantini', url: 'https://wearepeoplefirst.com' }],
  creator: 'PeopleFirst Agency',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://wearepeoplefirst.com',
    siteName: 'PeopleFirst Agency',
    title: DEFAULTS.seo.siteTitle,
    description: DEFAULTS.seo.siteDescription,
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'PeopleFirst Agency — IT & AI Recruiting for Tech Scale-ups',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULTS.seo.siteTitle,
    description: DEFAULTS.seo.siteDescription,
    images: ['/images/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PeopleFirst Agency',
  url: 'https://wearepeoplefirst.com',
  logo: 'https://wearepeoplefirst.com/images/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'carla@wearepeoplefirst.com',
    contactType: 'customer service',
    areaServed: ['LATAM', 'US', 'EU'],
    availableLanguage: ['English', 'Spanish'],
  },
  founder: {
    '@type': 'Person',
    name: 'Carla Costantini',
    email: 'carla@wearepeoplefirst.com',
    jobTitle: 'Founder & Lead Recruiter',
  },
  description: DEFAULTS.seo.siteDescription,
  sameAs: ['https://www.linkedin.com/in/carlacostantini'],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {/* GEOMetrics — AI/LLM traffic analytics */}
        <script
          src="https://llmometrics.b-cdn.net/metric.js"
          data-token="c7029f0f-b139-44bf-a4fc-3d674f200620"
          async
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  )
}
