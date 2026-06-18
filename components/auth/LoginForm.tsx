"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة")
    } else {
      router.push("/dashboard")
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          البريد الإلكتروني
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          required
          dir="ltr"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          كلمة المرور
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          required
          dir="ltr"
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded-lg">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition disabled:opacity-50"
      >
        {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
      </button>

      <p className="text-center text-sm text-gray-400">
        ليس لديك حساب؟{" "}
        <Link href="/register" className="text-blue-500 hover:underline">
          إنشاء حساب جديد
        </Link>
      </p>
    </form>
  )
}
