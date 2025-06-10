// next.config.mjs  (ESM)
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const basePath  = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',                 // gera ./out no `next build`
  basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  images:      { unoptimized: true },
  eslint:      { ignoreDuringBuilds: true },
  typescript:  { ignoreBuildErrors: true },

  webpack(cfg) {
    const r = (p) => path.resolve(__dirname, p);
    cfg.resolve.alias = {
      ...cfg.resolve.alias,
      '@':            r('components'),
      '@/components': r('components'),
      '@/lib':        r('lib'),
      '@/hooks':      r('hooks'),
      '@/ui':         r('components/ui')
    };
    return cfg;
  },
};

export default nextConfig;
