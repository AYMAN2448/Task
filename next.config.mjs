/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // ⬅️ هذا السطر هو المفتاح
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
