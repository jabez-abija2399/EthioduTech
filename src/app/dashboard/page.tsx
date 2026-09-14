import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Student Dashboard</h1>
        <p className="text-slate-600">Welcome back, {session.user.name}</p>
      </header>
      
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-100">
          <h2 className="font-semibold text-lg mb-2">Web Creator Foundations</h2>
          <p className="text-sm text-slate-500 mb-4">Module 1: HTML Basics</p>
          <div className="w-full bg-slate-200 rounded-full h-2.5 mb-4">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
          </div>
          <button className="w-full px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 transition">
            Continue Learning
          </button>
        </div>
        
        <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-100 md:col-span-2">
          <h2 className="font-semibold text-lg mb-2">Recent Projects</h2>
          <div className="flex items-center justify-center h-32 border-2 border-dashed border-slate-200 rounded-lg text-slate-500">
            No projects completed yet. Start building!
          </div>
        </div>
      </main>
    </div>
  )
}
