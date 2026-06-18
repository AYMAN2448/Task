import { prisma } from "@/lib/db"
import TaskCard from "@/components/tasks/TaskCard"
import { auth } from "@/lib/auth"

export default async function TasksPage() {
  const session = await auth()
  const tasks = await prisma.task.findMany({
    where: {
      status: "OPEN",
      ...(session?.user?.role === "WORKER" ? {} : {})
    },
    include: {
      client: true
    },
    orderBy: { createdAt: "desc" }
  })

  return (
    <div dir="rtl" className="space-y-6">
      <h1 className="text-3xl font-bold">المهام المتاحة</h1>

      {tasks.length === 0 ? (
        <p className="text-gray-400">لا توجد مهام متاحة حالياً</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  )
}
