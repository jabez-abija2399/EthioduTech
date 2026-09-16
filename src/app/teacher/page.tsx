import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getTeacherOverview } from "@/lib/data/teacher"
import { MetricCard } from "@/components/dashboard/shared/metric-card"
import { TeacherRosterClient } from "./teacher-roster-client"
import { Users, FileCheck2, AlertCircle, CalendarDays, TrendingUp, BookOpen, Activity } from "lucide-react"

export default async function TeacherDashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const userId = session.user.id || (session.user as any)?.sub || ""
  const teacherData = await getTeacherOverview(userId)

  const teacherName = session.user.name || "Educator"
  const students = (teacherData?.students || []) as any[]
  const stats = teacherData?.stats || { totalStudents: 0, totalLessonsCompleted: 0, totalSubmissions: 0 }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#3C4044] tracking-tight mb-2">
          Good morning, {teacherName.split(" ")[0]}
        </h1>
        <p className="text-[#3C4044]/70 text-lg">
          You have <strong className="text-[#FD7B41]">{stats.totalSubmissions} submissions</strong> to review and <strong className="text-[#FD7B41]">{stats.totalStudents} active students</strong> in your roster.
        </p>
      </header>

      {/* KPI Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Active Students" 
          value={stats.totalStudents || 0} 
          icon={Users} 
        />
        <MetricCard 
          title="Active Courses" 
          value={1} 
          icon={BookOpen} 
          color="brand"
        />
        <MetricCard 
          title="Pending Reviews" 
          value={stats.totalSubmissions || 0} 
          icon={FileCheck2} 
          color="warning"
        />
        <MetricCard 
          title="Completed Lessons" 
          value={stats.totalLessonsCompleted || 0} 
          icon={Activity} 
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Col: Action Center & Course Health */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Action Center */}
          <section>
            <h2 className="text-xl font-bold text-[#3C4044] mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#FD7B41]" />
              Needs your attention
            </h2>
            <div className="bg-white rounded-2xl border border-[#DDDCDB]/40 shadow-sm overflow-hidden">
              <div className="divide-y divide-[#DDDCDB]/20">
                
                <div className="p-5 flex items-center justify-between hover:bg-[#f8f9fa] transition">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
                      <FileCheck2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#3C4044] text-sm">{stats.totalSubmissions} assignments pending review</h4>
                      <p className="text-xs text-[#3C4044]/60 mt-1">Across all active cohorts</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white border border-[#DDDCDB]/40 text-[#3C4044] font-bold text-xs rounded-lg shadow-sm hover:bg-[#f8f9fa] transition">
                    Review now
                  </button>
                </div>

                <div className="p-5 flex items-center justify-between hover:bg-[#f8f9fa] transition">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-600 shrink-0 mt-0.5">
                      <TrendingUp className="w-5 h-5 transform rotate-180" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#3C4044] text-sm">3 students inactive for 7 days</h4>
                      <p className="text-xs text-[#3C4044]/60 mt-1">Eden, Marcus, and Sarah have missed recent milestones.</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white border border-[#DDDCDB]/40 text-[#3C4044] font-bold text-xs rounded-lg shadow-sm hover:bg-[#f8f9fa] transition">
                    Message
                  </button>
                </div>

                <div className="p-5 flex items-center justify-between hover:bg-[#f8f9fa] transition">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                      <CalendarDays className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#3C4044] text-sm">Live session starts in 45 minutes</h4>
                      <p className="text-xs text-[#3C4044]/60 mt-1">JavaScript Basics • 12 enrolled attendees</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[#FD7B41] text-white font-bold text-xs rounded-lg shadow-sm hover:bg-[#FD7B41]/90 transition">
                    Prepare room
                  </button>
                </div>
                
              </div>
            </div>
          </section>

          {/* Roster / Table */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#3C4044] flex items-center gap-2">
                <Users className="w-5 h-5 text-[#3C4044]/70" />
                Learner Overview
              </h2>
              <button className="text-sm font-bold text-[#FD7B41]">View all students</button>
            </div>
            <TeacherRosterClient students={students} />
          </section>

        </div>

        {/* Right Col: Course Health */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-[#3C4044] flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-500" />
            Course Health
          </h2>
          
          <div className="bg-[#3C4044] rounded-2xl p-6 shadow-xl text-white relative overflow-hidden">
            <h3 className="font-bold text-lg mb-1">Web Development Foundations</h3>
            <p className="text-sm text-[#DDDCDB]/70 mb-6">{stats.totalStudents} active students</p>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold text-[#DDDCDB] mb-2">
                  <span>Average Mastery</span>
                  <span className="text-emerald-400">78%</span>
                </div>
                <div className="w-full h-1.5 bg-black/40 rounded-full">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: "78%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-[#DDDCDB] mb-2">
                  <span>Module Completion</span>
                  <span className="text-[#EDBF9B]">72%</span>
                </div>
                <div className="w-full h-1.5 bg-black/40 rounded-full">
                  <div className="h-full bg-[#EDBF9B] rounded-full" style={{ width: "72%" }}></div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <h4 className="text-xs font-bold text-[#DDDCDB]/60 uppercase tracking-widest mb-4">Intervention Insights</h4>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  <p className="text-[#DDDCDB]">Module 6 (Async Logic) has a 40% lower mastery rate than previous modules.</p>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <p className="text-[#DDDCDB]">Projects submitted this week show strong improvement in responsive CSS.</p>
                </div>
              </div>
            </div>
            
            <button className="w-full mt-6 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl transition border border-white/5">
              Open Course Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
