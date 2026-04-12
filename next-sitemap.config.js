/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://wearepeoplefirst.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/keystatic', '/api'],
      },
    ],
  },
  exclude: ['/keystatic', '/keystatic/*', '/api/*'],
  generateIndexSitemap: false,
  outDir: 'public',
}
