import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

import { getRedirectPath } from "@/lib/auth-redirect"

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "edutech_secret_key_development_32_bytes_min_length"
  
  // 1. Get authenticated session token from request cookies
  const token = await getToken({ req, secret })
  const isAuthenticated = !!token
  const userRole = (token as any)?.role || "STUDENT"

  // 2. Protected Routes Definitions
  const isStudentRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/courses")
  const isTeacherRoute = pathname.startsWith("/teacher")
  const isParentRoute = pathname.startsWith("/parent")
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register")

  // 3. Unauthenticated User Protection
  if ((isStudentRoute || isTeacherRoute || isParentRoute) && !isAuthenticated) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // 4. Authenticated User Redirection from Auth Routes
  if (isAuthRoute && isAuthenticated) {
    const destinationPath = getRedirectPath(userRole)
    return NextResponse.redirect(new URL(destinationPath, req.url))
  }

  // 5. Role-Based Access Control (RBAC) Enforcement
  if (isTeacherRoute && userRole !== "TEACHER" && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  if (isParentRoute && userRole !== "PARENT" && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/teacher/:path*",
    "/parent/:path*",
    "/courses/:path*",
    "/login",
    "/register"
  ]
}
