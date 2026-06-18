"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function acceptTask(taskId: string) {
  const session = await auth()
  if (!session) throw new Error("غير مصرح")

  const task = await prisma.task.findUnique({
    where: { id: taskId }
  })

  if (!task || task.status !== "OPEN" || task.clientId === session.user.id) {
    throw new Error("لا يمكن قبول هذه المهمة")
  }

  await prisma.task.update({
    where: { id: taskId },
    data: {
      status: "IN_PROGRESS",
      acceptedWorkerId: session.user.id
    }
  })

  revalidatePath(`/tasks/${taskId}`)
}

export async function submitProof(taskId: string, proof: string) {
  const session = await auth()
  if (!session) throw new Error("غير مصرح")

  // التحقق من أن المستخدم هو العامل المقبول
  const task = await prisma.task.findFirst({
    where: {
      id: taskId,
      acceptedWorkerId: session.user.id,
      status: "IN_PROGRESS"
    }
  })

  if (!task) throw new Error("لا يمكن تقديم إثبات لهذه المهمة")

  await prisma.taskSubmission.create({
    data: {
      taskId,
      workerId: session.user.id,
      proof,
      status: "PENDING"
    }
  })

  await prisma.task.update({
    where: { id: taskId },
    data: { status: "PENDING_REVIEW" }
  })

  revalidatePath(`/tasks/${taskId}`)
}
