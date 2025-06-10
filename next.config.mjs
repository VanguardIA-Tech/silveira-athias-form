import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default {
  output: 'export',
  basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack(config) {
    const r = (p) => path.resolve(__dirname, p);
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': r('components'),
      '@/components': r('components'),
      '@/lib': r('lib'),
      '@/hooks': r('hooks'),
      '@/ui': r('components/ui'),
    };
    return config;
  },
};
