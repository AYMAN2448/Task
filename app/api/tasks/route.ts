import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function POST(req: Request) {
  const session = await auth()
  if (!session || session.user.role !== "CLIENT") {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 })
  }

  const { title, description, reward, category, proofType, proofInstruction } = await req.json()

  if (!title || !description || !reward) {
    return NextResponse.json({ error: "بيانات ناقصة" }, { status: 400 })
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      reward,
      category,
      proofType,
      proofInstruction,
      clientId: session.user.id
    }
  })

  return NextResponse.json(task)
}
