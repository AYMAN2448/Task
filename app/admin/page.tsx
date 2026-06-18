import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function AdminPage() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") redirect("/")

  const [users, tasks, submissions, withdrawals] = await Promise.all([
    prisma.user.count(),
    prisma.task.count(),
    prisma.taskSubmission.count(),
    prisma.withdrawal.count()
  ])

  const recentSubmissions = await prisma.taskSubmission.findMany({
    take: 10,
    orderBy: { createdAt: "desc" },
    include: {
      task: true,
      worker: true
    }
  })

  return (
    <div dir="rtl" className="space-y-6">
      <h1 className="text-3xl font-bold">لوحة تحكم الأدمن</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">المستخدمين</p>
          <p className="text-2xl font-bold">{users}</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">المهام</p>
          <p className="text-2xl font-bold">{tasks}</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">التقديمات</p>
          <p className="text-2xl font-bold">{submissions}</p>
        </div>
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <p className="text-gray-400 text-sm">طلبات السحب</p>
          <p className="text-2xl font-bold">{withdrawals}</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">أحدث التقديمات</h2>
        {recentSubmissions.length === 0 ? (
          <p className="text-gray-400">لا توجد تقديمات</p>
        ) : (
          <div className="space-y-3">
            {recentSubmissions.map((sub) => (
              <div key={sub.id} className="flex justify-between items-center border-b border-gray-800 pb-2">
                <div>
                  <p className="text-white">{sub.worker.name || "مجهول"} - {sub.task.title}</p>
                  <p className="text-gray-400 text-sm">الحالة: {sub.status}</p>
                </div>
                <Link href={`/admin/submissions/${sub.id}`} className="text-blue-500 text-sm hover:underline">
                  مراجعة
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Link href="/admin/settings" className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
          إعدادات الأسعار
        </Link>
      </div>
    </div>
  )
}
