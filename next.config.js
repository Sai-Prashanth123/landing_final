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
  // Set output to standalone for Azure Static Web Apps
  output: 'standalone',
  // Disable production source maps to reduce bundle size
  productionBrowserSourceMaps: false,
  // Default build output directory
  distDir: '.next',
  // Add trailing slash for better compatibility with static hosting
  trailingSlash: true,
  // Ensure public assets are correctly copied to the output
  poweredByHeader: false,
  // File tracing settings
  outputFileTracingRoot: process.cwd(),
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@swc/core-linux-x64-gnu',
      'node_modules/@swc/core-linux-x64-musl',
      'node_modules/@esbuild/linux-x64',
    ],
  }
}

module.exports = nextConfig 