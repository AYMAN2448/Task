# Task2 — موقع مهام صغيرة للسوشيال ميديا

هذا المشروع هو موقع ثابت (HTML/CSS/JS) لعرض وإدارة مهام صغيرة متعلقة بوسائل التواصل الاجتماعي.

المحتويات:
- index.html — الصفحة الرئيسية (واجهة عربية).
- css/style.css — أنماط التصميم.
- js/app.js — منطق عرض/حفظ المهام باستخدام localStorage.
- manifest.json, sw.js — دعم PWA وأوفلاين.
- wrangler.toml — مثال لإعداد Cloudflare Wrangler.

كيفية الاستخدام محلياً:
1. انسخ المجلد إلى جهازك.
2. افتح `index.html` في المتصفح (أو شغله عبر خادم محلي بسيط):
   - Python3: `python -m http.server 8080` ثم زيارة http://localhost:8080

نشر على Cloudflare Pages (الطريقة الأسهل — عبر GitHub):
1. ارفع هذا المشروع إلى مستودع GitHub جديد (مثلاً `AYMAN2448/task2`).
2. افتح لوحة Cloudflare > Pages > Create a project.
3. اربط حساب GitHub واختر المستودع `task2`.
4. إعدادات البناء (Build settings):
   - Framework: None
   - Build command: اتركه فارغاً
   - Build output directory: `/` أو اترك فارغاً
5. أنشئ المشروع وسيتم نشر الموقع تلقائياً.

نشر باستخدام Wrangler (من جهازك مباشرة):
1. ثبت wrangler: `npm install -g @cloudflare/wrangler`
2. سجل الدخول: `wrangler login` أو إعداد توكن.
3. في مجلد المشروع:
   - `wrangler pages publish ./ --project-name task2`
   - إذا طُلب account_id ضع حسابك، للحصول على account_id من صفحة Overview في Cloudflare Dashboard.

ملاحظات أمنية:
- لا تضع مفاتيح API أو توكنات داخل المستودع العام.
- wrangler.toml في الريبو المثال لا يحتوي account_id أو api_token — أضفها محلياً إذا لزم.

هل تريد مني:
- رفع الملفات إلى مستودع GitHub عند تزويدي باسم المستودع (owner/repo) والصلاحيات؟
- أو أعدّ لك zip جاهز للتحميل هنا؟
