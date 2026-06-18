"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const router = useRouter()
  const [rates, setRates] = useState({
    usdt: 0,
    trx: 0,
    sdgCash: 0,
    sspMomo: 0
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch("/api/admin/settings")
      .then(res => res.json())
      .then(data => {
        setRates(data.rates || { usdt: 0, trx: 0, sdgCash: 0, sspMomo: 0 })
        setLoading(false)
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rates })
    })

    setSaving(false)
    router.refresh()
  }

  if (loading) return <div className="text-white">جاري التحميل...</div>

  return (
    <div dir="rtl" className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">إعدادات الأسعار</h1>

      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">سعر USDT (بالـ SDG)</label>
          <input
            type="number"
            value={rates.usdt}
            onChange={(e) => setRates({ ...rates, usdt: parseFloat(e.target.value) })}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">سعر TRX (بالـ SDG)</label>
          <input
            type="number"
            value={rates.trx}
            onChange={(e) => setRates({ ...rates, trx: parseFloat(e.target.value) })}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">سعر SDG Cash (بالـ SDG)</label>
          <input
            type="number"
            value={rates.sdgCash}
            onChange={(e) => setRates({ ...rates, sdgCash: parseFloat(e.target.value) })}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">سعر SSP Momo (بالـ SSP)</label>
          <input
            type="number"
            value={rates.sspMomo}
            onChange={(e) => setRates({ ...rates, sspMomo: parseFloat(e.target.value) })}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
        </button>
      </form>
    </div>
  )
}
