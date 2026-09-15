import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { RegisterForm } from "./register-form"

export default async function RegisterPage() {
  const session = await auth()

  if (session?.user) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 font-sans">
      <RegisterForm />
    </div>
  )
}
