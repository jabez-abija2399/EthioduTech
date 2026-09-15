import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { LoginForm } from "./login-form"

export default async function LoginPage() {
  const session = await auth()

  if (session?.user) {
    const role = ((session.user as any).role || "STUDENT").toUpperCase()
    if (role === "ADMIN" || role === "SUPER_ADMIN") redirect("/admin")
    if (role === "TEACHER") redirect("/teacher")
    if (role === "PARENT") redirect("/parent")
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-center relative overflow-hidden">
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="py-8 px-4 sm:px-6 lg:px-8 relative z-10">
        <LoginForm />
      </div>
    </div>
  )
}
