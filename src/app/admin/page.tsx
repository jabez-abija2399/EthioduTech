import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getAdminPlatformMetrics } from "@/lib/data/admin"
import Navbar from "@/components/navbar"
import Link from "next/link"
import { Shield, Users, BookOpen, Rocket, Activity, Database, Lock } from "lucide-react"

export default async function AdminPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const role = ((session.user as any)?.role || "STUDENT").toUpperCase()
  if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
    redirect("/dashboard")
  }

  const metrics = await getAdminPlatformMetrics()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Navbar />
      
      <main className="max-w-7xl mx-auto p-6 md:p-12 space-y-8">
        {/* Page Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="p-2 bg-blue-600/20 border border-blue-500/30 rounded-xl text-blue-400">
                <Shield className="w-6 h-6" />
              </span>
              <h1 className="text-3xl font-extrabold text-white tracking-tight">Platform Admin Control Center</h1>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold rounded-full">
                {role === "SUPER_ADMIN" ? "⚡ Super Admin Override" : "🛡️ Admin"}
              </span>
            </div>
            <p className="text-slate-400 text-xs">System health, global metrics, user roles, and security audit logs.</p>
          </div>

          <div className="flex items-center space-x-3">
            <Link
              href="/teacher"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold rounded-xl transition"
            >
              👩‍🏫 Teacher Portal
            </Link>
            <Link
              href="/parent"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold rounded-xl transition"
            >
              👨‍👩‍👧 Parent Portal
            </Link>
            <Link
              href="/dashboard"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow transition"
            >
              🎓 Student View &rarr;
            </Link>
          </div>
        </header>

        {/* Metrics Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Users</div>
              <div className="text-3xl font-black text-white mt-1">{metrics.totalUsers}</div>
              <div className="text-[11px] text-slate-500 mt-1">
                Students: {metrics.studentsCount} • Teachers: {metrics.teachersCount}
              </div>
            </div>
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Curriculum Courses</div>
              <div className="text-3xl font-black text-emerald-400 mt-1">{metrics.totalCoursesCount}</div>
              <div className="text-[11px] text-slate-500 mt-1">Web Creator Foundations</div>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <BookOpen className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Published Projects</div>
              <div className="text-3xl font-black text-indigo-400 mt-1">{metrics.publishedProjectsCount}</div>
              <div className="text-[11px] text-slate-500 mt-1">Public Showcase Artifacts</div>
            </div>
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <Rocket className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex items-center justify-between shadow-lg">
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">System Status</div>
              <div className="text-3xl font-black text-emerald-400 mt-1 flex items-center gap-2">
                <span>Healthy</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Database & Auth Operational</div>
            </div>
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <Activity className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Database & Infrastructure Section */}
        <section className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-400" />
            <span>Infrastructure & Connection Security</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="font-bold text-slate-300">Database Engine</div>
              <div className="text-slate-400 mt-1 font-mono">Supabase PostgreSQL (Cloud) / SQLite (Local)</div>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="font-bold text-slate-300">Connection Mode</div>
              <div className="text-slate-400 mt-1 font-mono">Prisma Singleton (HMR Protected)</div>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
              <div className="font-bold text-slate-300">Session Cookie Security</div>
              <div className="text-slate-400 mt-1 font-mono">Multi-Header HTTPS Resolver (__Secure-)</div>
            </div>
          </div>
        </section>

        {/* Security Audit Logs */}
        <section className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-400" />
              <span>Recent System Security Audit Logs</span>
            </h2>
            <span className="text-xs text-slate-500 font-mono">Top 10 entries</span>
          </div>

          {metrics.recentAuditLogs.length === 0 ? (
            <div className="p-12 text-center text-slate-500 text-sm">
              No recent security audit logs recorded in database. System functioning normally.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-3">Timestamp</th>
                    <th className="px-6 py-3">Action</th>
                    <th className="px-6 py-3">Entity</th>
                    <th className="px-6 py-3">User Email</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono">
                  {metrics.recentAuditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-800/50 transition">
                      <td className="px-6 py-3.5 text-slate-400">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-3.5 text-blue-400 font-bold">{log.action}</td>
                      <td className="px-6 py-3.5 text-slate-300">{log.entity} ({log.entityId.substring(0, 8)}...)</td>
                      <td className="px-6 py-3.5 text-emerald-400">{log.userEmail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
