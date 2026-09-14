import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getCourses } from "@/lib/data/course"
import { getStudentPortfolio } from "@/lib/data/portfolio"
import Link from "next/link"
import Navbar from "@/components/navbar"

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  const userId = session.user.id || (session.user as any)?.sub || ""

  const [courses, studentData] = await Promise.all([
    getCourses(),
    getStudentPortfolio(userId)
  ])

  const portfolioProjects = studentData?.portfolios?.[0]?.projects || []

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <div className="p-6 md:p-12">
      <header className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Student Dashboard</h1>
          <p className="text-slate-600 mt-1">Welcome back, {session.user.name || "Student"}</p>
        </div>

        {studentData?.id && (
          <Link
            href={`/portfolio/${studentData.id}`}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center gap-2"
          >
            <span>🌐 View Public Portfolio</span>
            <span>&rarr;</span>
          </Link>
        )}
      </header>
      
      <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Courses */}
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 md:col-span-2">
          <h2 className="font-bold text-xl mb-4 text-slate-800">Your Enrolled Courses</h2>
          
          {courses.length === 0 ? (
            <div className="flex items-center justify-center h-32 border-2 border-dashed border-slate-200 rounded-xl text-slate-500">
              No courses found. Please contact an administrator.
            </div>
          ) : (
            <div className="space-y-4">
              {courses.map(course => {
                const firstLessonId = course.modules[0]?.units[0]?.lessons[0]?.id
                
                return (
                  <div key={course.id} className="p-5 border border-slate-200 rounded-xl shadow-sm hover:border-blue-200 transition">
                    <h3 className="font-bold text-lg text-blue-600 mb-1">{course.title}</h3>
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">{course.description}</p>
                    
                    <div className="w-full bg-slate-100 rounded-full h-2.5 mb-4">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    
                    {firstLessonId ? (
                      <Link 
                        href={`/courses/${course.id}/lessons/${firstLessonId}`}
                        className="inline-block px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition"
                      >
                        Continue Learning &rarr;
                      </Link>
                    ) : (
                      <button disabled className="px-4 py-2 bg-slate-300 text-slate-500 text-sm font-medium rounded-md cursor-not-allowed">
                        Coming Soon
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
        
        {/* Right Column: Portfolio Showcase Summary */}
        <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-xl text-slate-800">Your Portfolio</h2>
            {studentData?.id && (
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Public Live
              </span>
            )}
          </div>

          {portfolioProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 h-48 border-2 border-dashed border-slate-200 rounded-xl text-slate-500 p-4 text-center">
              <p className="font-medium text-slate-700">No projects published yet.</p>
              <p className="text-xs text-slate-500 mt-2">
                Use the <strong>"🚀 Publish to Portfolio"</strong> button in any lesson code editor to showcase your work!
              </p>
            </div>
          ) : (
            <div className="space-y-3 flex-1">
              {portfolioProjects.map((item) => (
                <div key={item.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{item.project.title}</h3>
                    <p className="text-xs text-slate-500 line-clamp-1">{item.project.description}</p>
                  </div>
                  <span className="text-xs text-blue-600 font-semibold">✓ Live</span>
                </div>
              ))}

              {studentData?.id && (
                <Link
                  href={`/portfolio/${studentData.id}`}
                  className="block text-center w-full py-2.5 mt-4 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 rounded-xl border border-blue-100 transition"
                >
                  View Full Public Showcase &rarr;
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
      </div>
    </div>
  )
}
