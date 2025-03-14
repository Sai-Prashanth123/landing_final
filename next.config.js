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
    unoptimized: true, // Needed for static exports on Azure
  },
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during build
  },
  typescript: {
    ignoreBuildErrors: true, // Disables type checking during build
  },
  // Set output to export for static site generation
  output: 'export',
  // Disable production source maps to reduce bundle size
  productionBrowserSourceMaps: false,
  // Default build output directory
  distDir: '.next',
  // Add trailing slash for better compatibility with static hosting
  trailingSlash: true,
  // Ensure public assets are correctly copied to the output
  poweredByHeader: false
}

module.exports = nextConfig 