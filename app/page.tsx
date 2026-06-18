import Link from "next/link"
import { auth } from "@/lib/auth"

export default async function Home() {
  const session = await auth()

  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
        ShadowTasks
      </h1>
      <p className="text-gray-400 text-lg md:text-xl mt-4 max-w-2xl">
        منصة المهام المدفوعة – أنجز مهام، واحصل على مكافآت بالعملات الرقمية.
      </p>

      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        {session ? (
          <Link href="/tasks" className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700 transition">
            استعرض المهام
          </Link>
        ) : (
          <>
            <Link href="/register" className="bg-blue-600 px-6 py-3 rounded-xl hover:bg-blue-700 transition">
              ابدأ الآن
            </Link>
            <Link href="/login" className="border border-gray-700 px-6 py-3 rounded-xl hover:bg-gray-800 transition">
              تسجيل الدخول
            </Link>
          </>
        )}
      </div>
    </section>
  )
}
