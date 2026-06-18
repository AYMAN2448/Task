/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  images: {
    unoptimized: true, // ضروري لـ Cloudflare Pages
  },
  
  // إعدادات webpack - تعطيل الـ Cache في الإنتاج
  webpack: (config, { isServer }) => {
    // تعطيل التخزين المؤقت (Cache) في بيئة الإنتاج فقط
    if (process.env.NODE_ENV === 'production') {
      config.cache = false;
    }
    return config;
  },

  // إزالة أي إعدادات تجريبية غير ضرورية (لتجنب التعارض)
  // يمكنك إضافة experimental إذا كنت بحاجة فعلاً
};

export default nextConfig;
