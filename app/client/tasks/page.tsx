import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function ClientTasksPage() {
  const session = await auth()
  if (!session || session.user.role !== "CLIENT") redirect("/dashboard")

  const tasks = await prisma.task.findMany({
    where: { clientId: session.user.id },
    include: {
      acceptedWorker: true,
      submissions: true
    },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div dir="rtl" className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">مهامي</h1>
        <Link href="/client/tasks/new" className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
          + مهمة جديدة
        </Link>
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-400">لم تنشر أي مهام بعد</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-400 text-sm">{task.description}</p>
              <div className="flex gap-4 mt-2 text-sm">
                <span>المكافأة: {task.reward} USDT</span>
                <span>الحالة: {task.status}</span>
                <span>التقديمات: {task.submissions.length}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
