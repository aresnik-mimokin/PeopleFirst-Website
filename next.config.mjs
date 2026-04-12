/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  experimental: {
    serverComponentsExternalPackages: ['@keystatic/core'],
  },
}

export default nextConfig
