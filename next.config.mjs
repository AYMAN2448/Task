/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    // تعطيل ميزات غير مدعومة في بيئة Cloudflare
    webpackBuildWorker: false,
  },
};

export default nextConfig;
