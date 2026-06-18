import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ShadowTasks - منصة المهام المدفوعة",
  description: "اكسب المال من خلال إنجاز المهام",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className + " bg-black text-white min-h-screen"}>
        <Header />
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
