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
  // Set output to export for smaller static builds
  // Remove this line if your app uses API routes or server components
  // output: 'export', 
  
  // For server-side rendering, use standalone mode
  output: 'standalone',
  
  // Disable production source maps to reduce bundle size
  productionBrowserSourceMaps: false,
  // Default build output directory
  distDir: '.next',
  // Add trailing slash for better compatibility with static hosting
  trailingSlash: true,
  // Ensure public assets are correctly copied to the output
  poweredByHeader: false,
  // File tracing settings to minimize bundle size
  outputFileTracingRoot: process.cwd(),
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@swc/core-*/**/*',
      'node_modules/esbuild/**/*',
      'node_modules/webpack/**/*',
      'node_modules/terser/**/*',
      'node_modules/sharp/**/*',
      'node_modules/react/cjs/**/*',
      'node_modules/react-dom/cjs/**/*',
      'node_modules/scheduler/cjs/**/*',
      'node_modules/postcss-preset-env/**/*',
      'node_modules/@babel/**/*',
      'node_modules/@react-three/**/*',
      'node_modules/three/**/*',
      'node_modules/@types/**/*',
      'node_modules/typescript/**/*',
      '**/*.map',
      '**/*.d.ts',
      '.git/**/*',
      'node_modules/.cache/**/*',
    ],
  },
  // Exclude specific large files from build
  experimental: {
    // Exclude specific pages to reduce size if needed
    // excludeDefaultMomentLocales: true,
    optimizeCss: true,  // Minimize CSS 
    optimizeServerReact: true, // Optimize server components
  }
}

module.exports = nextConfig 