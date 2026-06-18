import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { subHours } from "date-fns"

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const twelveHoursAgo = subHours(new Date(), 12)

  const approvedSubmissions = await prisma.taskSubmission.findMany({
    where: {
      status: "APPROVED",
      reviewedAt: { lte: twelveHoursAgo }
    },
    include: { worker: true, task: true }
  })

  for (const sub of approvedSubmissions) {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: sub.workerId },
        data: {
          available: { increment: sub.task.reward },
          pending: { decrement: sub.task.reward }
        }
      })
    ])
  }

  return NextResponse.json({ processed: approvedSubmissions.length })
}
