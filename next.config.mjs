/* next.config.mjs — sintaxe ESM correta */
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd    = process.env.NODE_ENV === 'production';
const basePath  = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
export default {
  output: 'export',                  // gera ./out no next build
  basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  images:      { unoptimized: true },
  eslint:      { ignoreDuringBuilds: true },
  typescript:  { ignoreBuildErrors: true },

  webpack(config) {
    const r = (p) => path.resolve(__dirname, p);
    // preserva os aliases internos do Next
    config.resolve.alias = {
      ...config.resolve.alias,
      '@':            r('components'),
      '@/components': r('components'),
      '@/lib':        r('lib'),
      '@/hooks':      r('hooks'),
      '@/ui':         r('components/ui'),
    };
    return config;
  },
};
