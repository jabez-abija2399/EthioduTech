import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getTeacherOverview } from "@/lib/data/teacher"
import Navbar from "@/components/navbar"
import Link from "next/link"

export default async function TeacherDashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const userId = session.user.id || (session.user as any)?.sub || ""
  const teacherData = await getTeacherOverview(userId)

  const teacherName = session.user.name || "Educator"
  const school = teacherData?.teacherProfile?.school || "Addis STEM Academy"
  const students = teacherData?.students || []
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

        {/* Student Roster Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Student Roster</h2>
              <p className="text-xs text-slate-500 mt-0.5">Individual learning progress and project showcases</p>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              {students.length} Student(s) Total
            </span>
          </div>

          {students.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              No active students enrolled yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                    <th className="p-4 pl-6">Student Name</th>
                    <th className="p-4">Email Address</th>
                    <th className="p-4">Lessons Completed</th>
                    <th className="p-4">Projects</th>
                    <th className="p-4 text-right pr-6">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {students.map((student) => {
                    const fullName = `${student.user.profile?.firstName || "Student"} ${student.user.profile?.lastName || ""}`.trim()
                    const completedCount = student.progress.length
                    const projectCount = student.portfolios?.[0]?.projects?.length || 0

                    return (
                      <tr key={student.id} className="hover:bg-slate-50/80 transition">
                        <td className="p-4 pl-6 font-bold text-slate-900 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                            {fullName.charAt(0)}
                          </div>
                          <span>{fullName}</span>
                        </td>
                        <td className="p-4 text-slate-600 text-xs font-mono">{student.user.email}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-slate-900">{completedCount}</span>
                            <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div
                                className="bg-emerald-500 h-full rounded-full"
                                style={{ width: `${Math.min(completedCount * 33, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-bold text-indigo-600">{projectCount} Project(s)</td>
                        <td className="p-4 text-right pr-6">
                          <Link
                            href={`/portfolio/${student.id}`}
                            className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg transition inline-flex items-center gap-1"
                          >
                            <span>View Portfolio</span>
                            <span>&rarr;</span>
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
