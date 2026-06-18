"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"

export default function NewTaskPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const reward = parseFloat(formData.get("reward") as string)
    const category = formData.get("category") as string
    const proofType = formData.get("proofType") as string
    const proofInstruction = formData.get("proofInstruction") as string

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          reward,
          category,
          proofType,
          proofInstruction
        })
      })

      if (response.ok) {
        router.push("/client/tasks")
        router.refresh()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div dir="rtl" className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">إنشاء مهمة جديدة</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div>
          <label className="block text-sm font-medium mb-1">عنوان المهمة</label>
          <input
            name="title"
            type="text"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">الوصف</label>
          <textarea
            name="description"
            rows={4}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">المكافأة (USDT)</label>
          <input
            name="reward"
            type="number"
            step="0.01"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">التصنيف</label>
          <select
            name="category"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="SOCIAL">سوشيال ميديا</option>
            <option value="MAPS">خرائط</option>
            <option value="CUSTOM">مخصص</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">نوع الإثبات</label>
          <select
            name="proofType"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="TEXT">نص</option>
            <option value="IMAGE">صورة</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">تعليمات الإثبات (اختياري)</label>
          <input
            name="proofInstruction"
            type="text"
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "جاري النشر..." : "نشر المهمة"}
        </button>
      </form>
    </div>
  )
}
