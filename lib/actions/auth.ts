"use server"

import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!email || !password || !name) {
    throw new Error("جميع الحقول مطلوبة")
  }
  if (password.length < 6) {
    throw new Error("كلمة المرور يجب أن تكون 6 أحرف على الأقل")
  }
  if (password !== confirmPassword) {
    throw new Error("كلمتا المرور غير متطابقتين")
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  })
  if (existingUser) {
    throw new Error("البريد الإلكتروني مسجل بالفعل")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "WORKER",
    }
  })

  redirect("/login?registered=true")
}
