/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'sanjanabonagiri.vercel.app', 'sanjanabonagiri.com'],
  },
  distDir: '.next',
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Explicitly set the source directory
  experimental: {
    appDir: true,
  },
};

export default nextConfig; 