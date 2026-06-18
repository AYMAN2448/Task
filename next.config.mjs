/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  // تحديد أن كل الصفحات و API Routes تعمل في بيئة Node.js (وليس Edge)
  runtime: 'nodejs', // هذا يجبر كل شيء على استخدام Node.js
  // إذا أردت تحديداً لبعض المسارات، يمكنك استخدام:
  // pageExtensions: ['tsx', 'ts'],
  // ولكن الأسهل هو تعيين runtime على مستوى التطبيق.
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
