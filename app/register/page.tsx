import RegisterForm from "@/components/auth/RegisterForm"
import { Suspense } from "react"

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900 rounded-2xl shadow-2xl border border-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">✨ إنشاء حساب</h1>
          <p className="text-gray-400 mt-2">انضم إلى ShadowTasks وابدأ في كسب المال</p>
        </div>

        <Suspense fallback={<div className="text-white">جاري التحميل...</div>}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  )
}
