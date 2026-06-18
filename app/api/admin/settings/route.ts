import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const settings = await prisma.setting.findUnique({
    where: { id: "single" }
  })

  return NextResponse.json({ rates: settings?.rates || {} })
}

export async function POST(req: Request) {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { rates } = await req.json()

  await prisma.setting.upsert({
    where: { id: "single" },
    update: { rates },
    create: { id: "single", rates }
  })

  return NextResponse.json({ success: true })
}
