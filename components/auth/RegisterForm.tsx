"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { registerUser } from "@/lib/actions/auth"

export default function RegisterForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      try {
        await registerUser(formData)
        setSuccess(true)
        setTimeout(() => router.push("/login?registered=true"), 1000)
      } catch (err: any) {
        setError(err.message || "حدث خطأ أثناء التسجيل")
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" dir="rtl">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          الاسم الكامل
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          البريد الإلكتروني
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          required
          dir="ltr"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          كلمة المرور (6 أحرف على الأقل)
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="w-full px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-blue-500 outline-none"
          required
          minLength={6}
          dir="ltr"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
          تأكيد كلمة المرور
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
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

      {success && (
        <div className="text-green-500 text-sm text-center bg-green-500/10 p-2 rounded-lg">
          ✅ تم التسجيل بنجاح! جاري التوجيه...
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition disabled:opacity-50"
      >
        {isPending ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
      </button>

      <p className="text-center text-sm text-gray-400">
        لديك حساب بالفعل؟{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          تسجيل الدخول
        </Link>
      </p>
    </form>
  )
}
