import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getParentOverview } from "@/lib/data/parent"
import Navbar from "@/components/navbar"
import Link from "next/link"

export default async function ParentDashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const userId = session.user.id || (session.user as any)?.sub || ""
  const parentData = await getParentOverview(userId)

  const parentName = session.user.name || "Parent"
  const children = parentData?.children || []

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <main className="max-w-6xl mx-auto p-6 md:p-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-md uppercase border border-emerald-200">
              Parent Portal
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Family Learning Overview</h1>
          <p className="text-slate-600 text-sm mt-1">Welcome back, {parentName}. Track your children's coding progress and portfolio creations.</p>
        </div>

        {/* Children Progress Cards */}
        {children.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-200 text-center text-slate-500">
            <p className="text-lg font-bold text-slate-800">No linked children profiles found.</p>
            <p className="text-sm mt-2">Connect your child's student account to monitor their web learning journey.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {children.map((child) => {
              const childName = `${child.user.profile?.firstName || "Child"} ${child.user.profile?.lastName || ""}`.trim()
              const completedCount = child.progress.length
              const projects = child.portfolios?.[0]?.projects || []

              return (
                <div key={child.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between">
                  <div className="p-6 border-b border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-extrabold text-lg flex items-center justify-center shadow-md shadow-emerald-500/20">
                          {childName.charAt(0)}
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-slate-900">{childName}</h2>
                          <p className="text-xs text-slate-500">{child.user.email}</p>
                        </div>
                      </div>

                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                        Active Student
                      </span>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div>
                        <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                          <span>Web Creator Course Progress</span>
                          <span className="text-emerald-600">{completedCount} Lessons Finished</span>
                        </div>
                        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.min(completedCount * 33, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Portfolio Projects ({projects.length})</h3>
                        {projects.length === 0 ? (
                          <p className="text-xs text-slate-400 italic">No published projects yet.</p>
                        ) : (
                          <div className="space-y-2">
                            {projects.map((proj) => (
                              <div key={proj.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                                <span className="font-bold text-slate-800">{proj.project.title}</span>
                                <span className="text-emerald-600 font-semibold">✓ Live Creation</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Verified Parent View</span>
                    <Link
                      href={`/portfolio/${child.id}`}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition inline-flex items-center gap-1.5"
                    >
                      <span>View Public Showcase</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
