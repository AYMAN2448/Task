import { PrismaClient } from "@prisma/client"
import { PrismaD1 } from "@prisma/adapter-d1"
import { getBindings } from "./bindings"

declare global {
  var prisma: PrismaClient | undefined
}

// إنشاء دالة لإنشاء PrismaClient مع المحول المناسب
function createPrismaClient() {
  // في بيئة الإنتاج (Cloudflare)، نحاول استخدام محول D1
  if (process.env.NODE_ENV === "production") {
    try {
      const env = getBindings()
      if (env.DB) {
        const adapter = new PrismaD1(env.DB)
        return new PrismaClient({ adapter })
      }
    } catch (e) {
      console.warn("Failed to create D1 adapter, falling back to standard PrismaClient")
    }
  }
  // في بيئة التطوير أو إذا فشل المحول، استخدم PrismaClient العادي مع DATABASE_URL
  return new PrismaClient()
}

// استخدام نفس الكائن في جميع أنحاء التطبيق (لتجنب اتصالات متعددة)
export const prisma = global.prisma || createPrismaClient()

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma
}
