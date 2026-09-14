import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { registerUserAction } from "@/lib/actions/auth"

export default async function RegisterPage({
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
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-sm border border-slate-200">
        <div className="text-center mb-6">
          <div className="text-2xl font-extrabold text-blue-600 mb-1">Edutech</div>
          <h1 className="text-2xl font-bold text-slate-900">Create your Account</h1>
          <p className="text-slate-500 text-sm mt-1">Start building real skills today</p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl text-center">
            {error}
          </div>
        )}
        
        <form
          action={async (formData: FormData) => {
            "use server"
            const result = await registerUserAction(formData)
            if (result?.error) {
              redirect(`/register?error=${encodeURIComponent(result.error)}`)
            }
            redirect("/login?registered=true")
          }}
          className="space-y-4"
        >
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">First Name</label>
              <input 
                name="firstName" 
                type="text" 
                placeholder="Abebe"
                required
                className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name</label>
              <input 
                name="lastName" 
                type="text" 
                placeholder="Bikila"
                required
                className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <input 
              name="email" 
              type="email" 
              placeholder="builder@edutech.test"
              required
              className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
            <input 
              name="password" 
              type="password" 
              placeholder="••••••••"
              required
              minLength={6}
              className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">I am joining as a:</label>
            <select
              name="role"
              className="block w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="STUDENT">Student / Learner</option>
              <option value="TEACHER">Teacher / Educator</option>
              <option value="PARENT">Parent / Guardian</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition mt-2"
          >
            Create Account &rarr;
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-blue-600 hover:text-blue-700">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
