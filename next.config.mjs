// next.config.mjs  (ESM)
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
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
