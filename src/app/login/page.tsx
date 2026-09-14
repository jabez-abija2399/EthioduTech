import { auth, signIn } from "@/auth"
import { redirect } from "next/navigation"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const session = await auth()
  const params = await searchParams
  const error = params?.error

  if (session?.user) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-sm border border-slate-100">
        <h1 className="text-2xl font-bold text-center mb-2 text-slate-900">Sign in to Edutech</h1>
        <p className="text-center text-slate-500 text-sm mb-6">Enter your credentials to access your courses</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md text-center">
            Invalid email or password. Please try again.
          </div>
        )}
        
        <form
          action={async (formData: FormData) => {
            "use server"
            const email = formData.get("email") as string
            const password = formData.get("password") as string
            try {
              await signIn("credentials", {
                email,
                password,
                redirectTo: "/dashboard",
              })
            } catch (err: any) {
              if (err?.message?.includes("NEXT_REDIRECT") || err?.digest?.startsWith("NEXT_REDIRECT")) {
                throw err
              }
              redirect("/login?error=CredentialsSignin")
            }
          }}
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
          <button 
            type="submit"
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer transition"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
