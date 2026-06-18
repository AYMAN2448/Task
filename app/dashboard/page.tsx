import { auth } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { redirect } from "next/navigation"
import { Wallet, Clock, CheckCircle, Plus } from "lucide-react"

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      tasks: true,
      submissions: {
        include: { task: true }
      }
    }
  })

  if (!user) return <div>المستخدم غير موجود</div>

  // إحصائيات سريعة
  const completedTasks = user.submissions.filter(s => s.status === "APPROVED").length
  const pendingTasks = user.submissions.filter(s => s.status === "PENDING").length

  return (
    <div className="space-y-6" dir="rtl">
      <h1 className="text-3xl font-bold">لوحة التحكم</h1>

      {/* بطاقات الرصيد */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-green-400">
            <Wallet className="w-5 h-5" />
            <span className="text-sm">الرصيد المتاح</span>
          </div>
          <p className="text-2xl font-bold mt-2">{user.available.toFixed(2)} USDT</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-yellow-400">
            <Clock className="w-5 h-5" />
            <span className="text-sm">رصيد معلق</span>
          </div>
          <p className="text-2xl font-bold mt-2">{user.pending.toFixed(2)} USDT</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-blue-400">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm">المهام المنجزة</span>
          </div>
          <p className="text-2xl font-bold mt-2">{completedTasks}</p>
        </div>
      </div>

      {/* معلومات المحافظ */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">🔗 محافظ الدفع</h2>
        <div className="space-y-2 text-gray-300">
          <p>USDT (TRC20): {user.usdtWallet || "غير مضاف"}</p>
          <p>Momo (SSP): {user.momoNumber || "غير مضاف"}</p>
          <p>Cash (SDG): {user.cashNumber || "غير مضاف"}</p>
        </div>
      </div>

      {/* المهام قيد الانتظار */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">⏳ المهام قيد المراجعة</h2>
        {pendingTasks === 0 ? (
          <p className="text-gray-400">لا توجد مهام قيد المراجعة</p>
        ) : (
          <p className="text-gray-300">لديك {pendingTasks} مهمة تنتظر الموافقة</p>
        )}
      </div>
    </div>
  )
}
