import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const path = req.nextUrl.pathname

  // الصفحات المحمية
  const protectedRoutes = ["/dashboard", "/client", "/tasks", "/admin"]
  const isProtected = protectedRoutes.some(route => path.startsWith(route))

  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // منع المسجلين من دخول login/register
  if ((path === "/login" || path === "/register") && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  // حماية الأدمن
  if (path.startsWith("/admin") && req.auth?.user?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // حماية صفحة العميل - فقط CLIENT
  if (path.startsWith("/client") && req.auth?.user?.role !== "CLIENT") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
}
