import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

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
  output: 'export',
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'components')
    config.resolve.alias['@/components'] = path.resolve(__dirname, 'components')
    config.resolve.alias['@/lib'] = path.resolve(__dirname, 'lib')
    config.resolve.alias['@/hooks'] = path.resolve(__dirname, 'hooks')
    config.resolve.alias['@/ui'] = path.resolve(__dirname, 'components/ui')
    return config
  }
}

export default nextConfig
