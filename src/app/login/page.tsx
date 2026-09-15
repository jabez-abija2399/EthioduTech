import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { loginUserFormAction } from "@/lib/actions/auth"
import { SubmitButton } from "@/components/submit-button"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; registered?: string }>
}) {
  const session = await auth()
  const params = await searchParams
  const error = params?.error
  const registered = params?.registered

  if (session?.user) {
    const role = (session.user as any).role
    if (role === "TEACHER") redirect("/teacher")
    if (role === "PARENT") redirect("/parent")
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
        <h1 className="text-2xl font-bold text-center mb-1 text-slate-900">Sign in to Edutech</h1>
        <p className="text-center text-slate-500 text-sm mb-6">Enter your credentials to access your courses</p>

        {registered && (
          <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-xl text-center">
            🎉 Account created successfully! Please sign in below.
          </div>
        )}

        {error && (
          <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl text-center">
            Invalid email or password. Please check your credentials and try again.
          </div>
        )}
        
        <form
          action={loginUserFormAction}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input 
              name="email" 
              type="email" 
              defaultValue="student@edutech.test"
              required
              className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-900" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input 
              name="password" 
              type="password" 
              defaultValue="password"
              required
              className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-slate-900" 
            />
          </div>
          <SubmitButton loadingText="Signing in..." className="bg-blue-600 hover:bg-blue-700">
            Sign in &rarr;
          </SubmitButton>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Don't have an account yet?{" "}
          <a href="/register" className="font-bold text-blue-600 hover:text-blue-700">
            Create an Account
          </a>
        </div>
      </div>
    </div>
  )
}
