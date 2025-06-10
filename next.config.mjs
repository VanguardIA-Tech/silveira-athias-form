import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
export default {
  output: 'export',          // mantém geração da pasta out/
  basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  eslint:      { ignoreDuringBuilds: true },
  typescript:  { ignoreBuildErrors: true },
  images:      { unoptimized: true },

  webpack(config) {
    const r = (p) => path.resolve(__dirname, p);

    // 👉 preserva os aliases que o Next cria
    config.resolve.alias = {
      ...config.resolve.alias,           // NÃO remova esta linha!
      '@':            r('components'),
      '@/components': r('components'),
      '@/lib':        r('lib'),
      '@/hooks':      r('hooks'),
      '@/ui':         r('components/ui'),
    };

    return config;
  },
};
