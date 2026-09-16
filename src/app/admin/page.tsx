import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getAdminPlatformMetrics } from "@/lib/data/admin"
import Link from "next/link"
import { Shield, Users, BookOpen, Rocket, Activity, Database, Lock, AlertTriangle, CheckCircle, Search, SlidersHorizontal } from "lucide-react"

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
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#DDDCDB]/20 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2.5 bg-[#3C4044] rounded-xl text-white shadow-sm border border-[#DDDCDB]/40">
              <Shield className="w-6 h-6" />
            </span>
            <h1 className="text-3xl font-extrabold text-[#3C4044] tracking-tight">Platform Operations</h1>
            <span className="px-3 py-1 bg-[#FD7B41]/10 border border-[#FD7B41]/20 text-[#FD7B41] text-xs font-bold rounded-full ml-2">
              {role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
            </span>
          </div>
          <p className="text-[#3C4044]/60 text-sm">
            Monitor system health, manage users, and review security audit logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#DDDCDB]/40 text-[#3C4044] text-sm font-bold rounded-xl shadow-sm hover:bg-[#f8f9fa] transition">
            <SlidersHorizontal className="w-4 h-4" />
            Platform Settings
          </button>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-[#3C4044] hover:bg-[#3C4044]/90 text-white text-sm font-bold rounded-xl shadow transition"
          >
            Student View &rarr;
          </Link>
        </div>
      </header>

      {/* Metrics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border border-[#DDDCDB]/40 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-blue-500/10 text-blue-600 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">+12%</span>
          </div>
          <div>
            <div className="text-3xl font-black text-[#3C4044]">{metrics.totalUsers}</div>
            <div className="text-sm font-bold text-[#3C4044]/60 mt-1">Total Users</div>
            <div className="text-[11px] text-[#3C4044]/40 mt-1 uppercase tracking-wider">
              {metrics.studentsCount} Students • {metrics.teachersCount} Teachers
            </div>
          </div>
        </div>

        <div className="bg-white border border-[#DDDCDB]/40 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-indigo-500/10 text-indigo-600 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#3C4044]">{metrics.totalCoursesCount}</div>
            <div className="text-sm font-bold text-[#3C4044]/60 mt-1">Active Courses</div>
            <div className="text-[11px] text-[#3C4044]/40 mt-1 uppercase tracking-wider">Across 4 Subjects</div>
          </div>
        </div>

        <div className="bg-white border border-[#DDDCDB]/40 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-[#FD7B41]/10 text-[#FD7B41] rounded-xl">
              <Rocket className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">+45 this week</span>
          </div>
          <div>
            <div className="text-3xl font-black text-[#3C4044]">{metrics.publishedProjectsCount}</div>
            <div className="text-sm font-bold text-[#3C4044]/60 mt-1">Published Projects</div>
            <div className="text-[11px] text-[#3C4044]/40 mt-1 uppercase tracking-wider">Live in Portfolios</div>
          </div>
        </div>

        <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl flex flex-col justify-between shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-700 rounded-xl relative">
              <Activity className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></span>
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-emerald-700 flex items-center gap-2">
              Healthy
            </div>
            <div className="text-sm font-bold text-emerald-700/70 mt-1">System Status</div>
            <div className="text-[11px] text-emerald-700/50 mt-1 uppercase tracking-wider">All services operational</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Col */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Security Audit Logs */}
          <section className="bg-white border border-[#DDDCDB]/40 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-[#DDDCDB]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#f8f9fa]">
              <h2 className="text-lg font-bold text-[#3C4044] flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#3C4044]/50" />
                Security Audit Logs
              </h2>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#3C4044]/40" />
                <input
                  type="text"
                  placeholder="Filter logs..."
                  className="pl-9 pr-4 py-2 border border-[#DDDCDB]/40 rounded-lg text-xs text-[#3C4044] focus:outline-none focus:border-[#FD7B41] bg-white w-full sm:w-64"
                />
              </div>
            </div>

            {metrics.recentAuditLogs.length === 0 ? (
              <div className="p-12 text-center text-[#3C4044]/50 text-sm">
                No recent security audit logs recorded.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#f8f9fa] border-b border-[#DDDCDB]/20 text-[#3C4044]/60 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3">Timestamp</th>
                      <th className="px-6 py-3">Action</th>
                      <th className="px-6 py-3">Entity</th>
                      <th className="px-6 py-3">User</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DDDCDB]/10 font-mono text-[#3C4044]/80">
                    {metrics.recentAuditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-[#f8f9fa] transition">
                        <td className="px-6 py-3">
                          {new Date(log.timestamp).toLocaleString(undefined, {
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
                          })}
                        </td>
                        <td className="px-6 py-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            log.action.includes('DELETE') ? 'bg-red-500/10 text-red-600' :
                            log.action.includes('UPDATE') ? 'bg-amber-500/10 text-amber-600' :
                            'bg-blue-500/10 text-blue-600'
                          }`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-[#3C4044]/60">
                          {log.entity} <span className="text-[#3C4044]/40">({log.entityId.substring(0, 8)})</span>
                        </td>
                        <td className="px-6 py-3 font-bold text-[#3C4044]">{log.userEmail}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="p-3 border-t border-[#DDDCDB]/20 bg-[#f8f9fa] text-center">
              <button className="text-xs font-bold text-[#FD7B41] hover:text-[#FD7B41]/80">View all logs</button>
            </div>
          </section>

          {/* Infrastructure Health */}
          <section className="bg-white border border-[#DDDCDB]/40 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-bold text-[#3C4044] mb-6 flex items-center gap-2">
              <Database className="w-5 h-5 text-[#3C4044]/50" />
              Infrastructure & Systems
            </h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-xl border border-[#DDDCDB]/20">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-emerald-500" />
                  <div>
                    <div className="font-bold text-[#3C4044]">Primary Database</div>
                    <div className="text-xs text-[#3C4044]/60">Supabase PostgreSQL</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  <CheckCircle className="w-3 h-3" /> Connected
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-xl border border-[#DDDCDB]/20">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-emerald-500" />
                  <div>
                    <div className="font-bold text-[#3C4044]">Authentication API</div>
                    <div className="text-xs text-[#3C4044]/60">NextAuth.js v5</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  <CheckCircle className="w-3 h-3" /> Operational
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-xl border border-[#DDDCDB]/20">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <div>
                    <div className="font-bold text-[#3C4044]">Storage Bucket</div>
                    <div className="text-xs text-[#3C4044]/60">S3 / R2 (Assets)</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-amber-600 font-bold text-xs bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                  <AlertTriangle className="w-3 h-3" /> 85% Capacity
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Right Col: Admin Actions */}
        <div className="space-y-6">
          <div className="bg-[#3C4044] rounded-2xl p-6 shadow-xl text-white">
            <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition border border-white/5 text-sm font-bold">
                <span>Invite New Instructor</span>
                <Users className="w-4 h-4 text-[#FD7B41]" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition border border-white/5 text-sm font-bold">
                <span>Manage Roles</span>
                <Shield className="w-4 h-4 text-[#FD7B41]" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition border border-white/5 text-sm font-bold">
                <span>Generate API Key</span>
                <Lock className="w-4 h-4 text-[#FD7B41]" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition border border-white/5 text-sm font-bold">
                <span>System Backup</span>
                <Database className="w-4 h-4 text-[#FD7B41]" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
