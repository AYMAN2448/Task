import { PrismaClient } from "@prisma/client"
import { PrismaD1 } from "@prisma/adapter-d1"
import { getBindings } from "@/lib/bindings"

declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") global.prisma = prisma

// لدعم Cloudflare D1 في الإنتاج
export async function getPrismaD1() {
  const env = process.env.NODE_ENV === "production" ? getBindings() : null
  if (env?.DB) {
    const adapter = new PrismaD1(env.DB)
    return new PrismaClient({ adapter })
  }
  return prisma
}
