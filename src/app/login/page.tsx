import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { LoginForm } from "./login-form"

export default async function LoginPage() {
  const session = await auth()

  if (session?.user) {
    const role = (session.user as any).role
    if (role === "TEACHER") redirect("/teacher")
    if (role === "PARENT") redirect("/parent")
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 font-sans">
      <LoginForm />
    </div>
  )
}
