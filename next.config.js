/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['Jobspring.org']
  },
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during build
  },
  typescript: {
    ignoreBuildErrors: true, // Disables type checking during build
  },
}

module.exports = nextConfig 