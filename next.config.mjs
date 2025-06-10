/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: '/silveira-athias',
  assetPrefix: '/silveira-athias/',
  output: 'export'
}

export default nextConfig
