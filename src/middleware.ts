import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import { getRedirectPath } from "@/lib/auth-redirect"

export async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "edutech_secret_key_development_32_bytes_min_length"
  
  // 1. Detect active cookie name for NextAuth v5 / Auth.js (handles HTTPS __Secure- prefixes on Vercel)
  let cookieName: string | undefined = undefined
  if (req.cookies.has("__Secure-authjs.session-token")) {
    cookieName = "__Secure-authjs.session-token"
  } else if (req.cookies.has("authjs.session-token")) {
    cookieName = "authjs.session-token"
  } else if (req.cookies.has("__Secure-next-auth.session-token")) {
    cookieName = "__Secure-next-auth.session-token"
  } else if (req.cookies.has("next-auth.session-token")) {
    cookieName = "next-auth.session-token"
  }

  // 2. Extract authenticated JWT token
  let token = null
  try {
    token = await getToken({ req, secret, cookieName, raw: false })
    if (!token && !cookieName) {
      token = await getToken({ req, secret })
    }
  } catch (err) {
    console.warn("Middleware getToken warning:", err)
  }

  const isAuthenticated = !!token && (!!token.email || !!token.sub || !!token.id)
  const userRole = (token as any)?.role || "STUDENT"

  // 3. Protected Routes Definitions
  const isStudentRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/courses")
  const isTeacherRoute = pathname.startsWith("/teacher")
  const isParentRoute = pathname.startsWith("/parent")
  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register")

  // 4. Unauthenticated User Protection
  if ((isStudentRoute || isTeacherRoute || isParentRoute) && !isAuthenticated) {
    const loginUrl = new URL("/login", req.url)
    if (!searchParams.has("callbackUrl")) {
      loginUrl.searchParams.set("callbackUrl", pathname)
    }
    return NextResponse.redirect(loginUrl)
  }

  // 5. Authenticated User Redirection from Auth Routes
  if (isAuthRoute && isAuthenticated && !searchParams.has("callbackUrl")) {
    const destinationPath = getRedirectPath(userRole)
    return NextResponse.redirect(new URL(destinationPath, req.url))
  }

  // 6. Role-Based Access Control (RBAC) Enforcement
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
