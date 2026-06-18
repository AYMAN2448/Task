import Link from "next/link"
import { Task } from "@prisma/client"

interface TaskCardProps {
  task: Task & { client: { name: string | null } }
}

export default function TaskCard({ task }: TaskCardProps) {
  const statusColors: Record<string, string> = {
    OPEN: "bg-green-500/20 text-green-500",
    IN_PROGRESS: "bg-yellow-500/20 text-yellow-500",
    PENDING_REVIEW: "bg-blue-500/20 text-blue-500",
    COMPLETED: "bg-gray-500/20 text-gray-400",
    EXPIRED: "bg-red-500/20 text-red-500",
  }

  return (
    <Link href={`/tasks/${task.id}`}>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-blue-500 transition">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-white">{task.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[task.status]}`}>
            {task.status === "OPEN" && "مفتوحة"}
            {task.status === "IN_PROGRESS" && "قيد التنفيذ"}
            {task.status === "PENDING_REVIEW" && "قيد المراجعة"}
            {task.status === "COMPLETED" && "مكتملة"}
            {task.status === "EXPIRED" && "منتهية"}
          </span>
        </div>

        <p className="text-gray-400 text-sm mt-2 line-clamp-2">{task.description}</p>

        <div className="flex justify-between items-center mt-4 text-sm">
          <span className="text-green-400 font-medium">{task.reward} USDT</span>
          <span className="text-gray-500">بواسطة: {task.client.name || "مجهول"}</span>
        </div>
      </div>
    </Link>
  )
}
