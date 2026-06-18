export const runtime = 'nodejs'
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { acceptTask, submitProof } from "@/lib/actions/task"
import { notFound, redirect } from "next/navigation"
import Link from "next/link"

export default async function TaskDetailPage({ params }: { params: { id: string } }) {
  const session = await auth()
  const task = await prisma.task.findUnique({
    where: { id: params.id },
    include: {
      client: true,
      acceptedWorker: true,
      submissions: {
        where: { workerId: session?.user?.id || "" },
        orderBy: { createdAt: "desc" }
      }
    }
  })

  if (!task) notFound()

  const isOwner = session?.user?.id === task.clientId
  const isAccepted = task.acceptedWorkerId === session?.user?.id
  const canAccept = task.status === "OPEN" && !isOwner && session?.user?.role === "WORKER"
  const canSubmit = task.status === "IN_PROGRESS" && isAccepted

  return (
    <div dir="rtl" className="max-w-3xl mx-auto space-y-6">
      <Link href="/tasks" className="text-blue-500 hover:underline">
        ← العودة إلى المهام
      </Link>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <p className="text-gray-300">{task.description}</p>

        <div className="flex flex-wrap gap-4 text-sm">
          <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">
            المكافأة: {task.reward} USDT
          </span>
          <span className="bg-gray-700/30 text-gray-400 px-3 py-1 rounded-full">
            النوع: {task.category}
          </span>
          <span className="bg-gray-700/30 text-gray-400 px-3 py-1 rounded-full">
            الحالة: {
              task.status === "OPEN" ? "مفتوحة" :
              task.status === "IN_PROGRESS" ? "قيد التنفيذ" :
              task.status === "PENDING_REVIEW" ? "قيد المراجعة" :
              "مكتملة"
            }
          </span>
        </div>

        {task.proofInstruction && (
          <div className="bg-gray-800/50 p-4 rounded-lg">
            <p className="text-sm text-gray-400">تعليمات الإثبات:</p>
            <p className="text-white">{task.proofInstruction}</p>
          </div>
        )}

        {/* أزرار الإجراءات */}
        {canAccept && (
          <form action={async () => {
            "use server"
            await acceptTask(task.id)
          }}>
            <button className="bg-green-600 px-6 py-2 rounded-lg hover:bg-green-700">
              قبول المهمة
            </button>
          </form>
        )}

        {canSubmit && (
          <form action={async (formData: FormData) => {
            "use server"
            const proof = formData.get("proof") as string
            await submitProof(task.id, proof)
          }}>
            <textarea
              name="proof"
              placeholder="أدخل إثباتك هنا (نص أو رابط)..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white"
              rows={3}
              required
            />
            <button type="submit" className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 mt-2">
              إرسال الإثبات
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
