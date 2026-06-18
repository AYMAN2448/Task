/** @type {import('next').NextConfig} */
const nextConfig = {
  // تمكين Strict Mode لمزيد من الأمان والأداء
  reactStrictMode: true,

  // إعدادات الصور - مهم جداً لـ Cloudflare Pages
  images: {
    // إلغاء تحسين الصور لأن Cloudflare Pages لا تدعم معالج الصور الافتراضي لـ Next.js
    unoptimized: true,
  },

  // إعدادات تجريبية (مطلوبة لـ Server Actions في Next.js 14)
  experimental: {
    serverActions: {
      // تحديد حجم أقصى للـ body (لرفع الصور أو النصوص الكبيرة)
      bodySizeLimit: '5mb',
    },
  },

  // (اختياري) إضافة رؤوس أمان إضافية لتحسين الحماية
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

// تصدير التكوين كـ ES Module (لأن الملف امتداده .mjs)
export default nextConfig;
