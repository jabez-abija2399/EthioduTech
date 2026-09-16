import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { VerifyEmailForm } from "./verify-email-form"

export default async function VerifyEmailPage() {
  const session = await auth()

  if (session?.user) {
    redirect("/dashboard")
  }

  return <VerifyEmailForm />
}
