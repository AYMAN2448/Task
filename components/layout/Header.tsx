import Link from "next/link"
import { auth } from "@/lib/auth"
import { signOut } from "@/lib/auth"

export default async function Header() {
  const session = await auth()
  const user = session?.user

  return (
    <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-500">
          ShadowTasks
        </Link>

        <nav className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard" className="text-gray-300 hover:text-white">
                لوحة التحكم
              </Link>
              {user.role === "CLIENT" && (
                <Link href="/client/tasks" className="text-gray-300 hover:text-white">
                  مهامي
                </Link>
              )}
              {user.role === "ADMIN" && (
                <Link href="/admin" className="text-gray-300 hover:text-white">
                  الأدمن
                </Link>
              )}
              <form action={async () => {
                "use server"
                await signOut()
              }}>
                <button type="submit" className="text-red-400 hover:text-red-300">
                  تسجيل خروج
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-300 hover:text-white">
                دخول
              </Link>
              <Link href="/register" className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
                إنشاء حساب
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
