import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getTeacherOverview } from "@/lib/data/teacher"
import Navbar from "@/components/navbar"
import { TeacherRosterClient } from "./teacher-roster-client"

export default async function TeacherDashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const userId = session.user.id || (session.user as any)?.sub || ""
  const teacherData = await getTeacherOverview(userId)

  const teacherName = session.user.name || "Educator"
  const school = teacherData?.teacherProfile?.school || "Addis STEM Academy"
  const students = (teacherData?.students || []) as any[]
  const stats = teacherData?.stats || { totalStudents: 0, totalLessonsCompleted: 0, totalSubmissions: 0 }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto p-6 md:p-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-xs font-extrabold rounded-md uppercase border border-blue-200">
              Teacher Portal
            </span>
            <span className="text-xs text-slate-500 font-medium">• {school}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Classroom Analytics & Progress</h1>
          <p className="text-slate-600 text-sm mt-1">Welcome back, {teacherName}. Monitor student learning outcomes in real time.</p>
        </div>

        {/* Analytics Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Students</span>
              <span className="p-2 bg-blue-50 text-blue-600 rounded-xl text-lg font-bold">👥</span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900">{stats.totalStudents}</div>
            <p className="text-xs text-slate-500 mt-1">Enrolled across all web courses</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Completed Lessons</span>
              <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl text-lg font-bold">📚</span>
            </div>
            <div className="text-3xl font-extrabold text-emerald-600">{stats.totalLessonsCompleted}</div>
            <p className="text-xs text-slate-500 mt-1">Total interactive lessons finished</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Portfolio Projects</span>
              <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl text-lg font-bold">🚀</span>
            </div>
            <div className="text-3xl font-extrabold text-indigo-600">
              {students.reduce((acc, s) => acc + (s.portfolios?.[0]?.projects?.length || 0), 0)}
            </div>
            <p className="text-xs text-slate-500 mt-1">Published live web creations</p>
          </div>
        </div>

        {/* Roster Client Component */}
        <TeacherRosterClient students={students} />
      </main>
    </div>
  )
}
