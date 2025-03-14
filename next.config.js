/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jobspring.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during build
  },
  typescript: {
    ignoreBuildErrors: true, // Disables type checking during build
  },
  // Add output configuration for production
  output: 'standalone',
  // Disable production source maps to reduce bundle size
  productionBrowserSourceMaps: false
}

module.exports = nextConfig 