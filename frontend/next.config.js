import path from 'path';
import { fileURLToPath } from 'url';
import withPWA from 'next-pwa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
};

export default withPWA({
  ...nextConfig,
  pwa: {
    dest: 'public',
    disable: process.env.NEXT_PUBLIC_ENV === 'development',
  },
});