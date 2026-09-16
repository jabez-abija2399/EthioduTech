import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getCourses } from "@/lib/data/course"
import { getStudentPortfolio } from "@/lib/data/portfolio"
import { getStudentGamificationStats } from "@/lib/data/gamification"
import Link from "next/link"
import Navbar from "@/components/navbar"
import { XPBadgeDisplay } from "@/components/xp-badge-display"

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

  let gamificationStats = null
  try {
    if (studentData?.id) {
      gamificationStats = await getStudentGamificationStats(studentData.id)
    }
  } catch (err) {
    console.warn("Dashboard gamification data load warning:", err)
  }

  const portfolioProjects = studentData?.portfolios?.flatMap((p: any) => p.projects || []) || []

  return (
    <>
      <header className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Student Dashboard</h1>
          <p className="text-[#DDDCDB]/70 mt-1">Welcome back, {session.user.name || "Student"}</p>
        </div>

        {studentData?.id && (
          <Link
            href={`/portfolio/${studentData.id}`}
            className="px-5 py-2.5 bg-[#FD7B41] hover:bg-[#FD7B41]/90 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center gap-2"
          >
            <span>🌐 View Public Portfolio</span>
            <span>&rarr;</span>
          </Link>
        )}
      </header>

      {gamificationStats && (
        <section className="mb-8">
          <XPBadgeDisplay
            xp={gamificationStats.xp}
            streakDays={gamificationStats.streakDays}
            badges={gamificationStats.allBadges}
          />
        </section>
      )}
      
      <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Courses */}
        <div className="p-6 bg-[#3C4044] rounded-2xl shadow-sm border border-[#DDDCDB]/10 md:col-span-2">
          <h2 className="font-bold text-xl mb-4 text-white">Your Enrolled Courses</h2>
          
          {courses.length === 0 ? (
            <div className="flex items-center justify-center h-32 border-2 border-dashed border-[#DDDCDB]/20 rounded-xl text-[#DDDCDB]/50">
              No courses found. Please contact an administrator.
            </div>
          ) : (
            <div className="space-y-4">
              {courses.map((course: any) => {
                const firstLessonId = course.modules[0]?.units[0]?.lessons[0]?.id
                
                return (
                  <div key={course.id} className="p-5 border border-[#DDDCDB]/10 rounded-xl bg-slate-900/50 shadow-sm hover:border-[#FD7B41]/50 transition">
                    <h3 className="font-bold text-lg text-[#FD7B41] mb-1">{course.title}</h3>
                    <p className="text-[#DDDCDB]/70 text-sm mb-4 leading-relaxed">{course.description}</p>
                    
                    <div className="w-full bg-[#3C4044] rounded-full h-2.5 mb-4 border border-[#DDDCDB]/5">
                      <div className="bg-[#FD7B41] h-2.5 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                    
                    {firstLessonId ? (
                      <Link 
                        href={`/courses/${course.id}/lessons/${firstLessonId}`}
                        className="inline-block px-5 py-2.5 bg-[#EDBF9B] text-[#3C4044] text-sm font-bold rounded-lg hover:bg-[#EDBF9B]/90 transition shadow-sm"
                      >
                        Continue Learning &rarr;
                      </Link>
                    ) : (
                      <button disabled className="px-4 py-2 bg-[#3C4044] text-[#DDDCDB]/50 text-sm font-medium rounded-md cursor-not-allowed">
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
        <div className="p-6 bg-[#3C4044] rounded-2xl shadow-sm border border-[#DDDCDB]/10 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-xl text-white">Your Portfolio</h2>
            {studentData?.id && (
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                Public Live
              </span>
            )}
          </div>

          {portfolioProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 h-48 border-2 border-dashed border-[#DDDCDB]/20 rounded-xl text-[#DDDCDB]/50 p-4 text-center">
              <p className="font-medium text-[#DDDCDB]/80">No projects published yet.</p>
              <p className="text-xs mt-2">
                Use the <strong className="text-[#FD7B41]">"🚀 Publish to Portfolio"</strong> button in any lesson code editor to showcase your work!
              </p>
            </div>
          ) : (
            <div className="space-y-3 flex-1">
              {portfolioProjects.map((item: any) => (
                <div key={item.id} className="p-3.5 bg-slate-900/50 border border-[#DDDCDB]/10 rounded-xl flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-white">{item.project.title}</h3>
                    <p className="text-xs text-[#DDDCDB]/60 line-clamp-1">{item.project.description}</p>
                  </div>
                  <span className="text-xs text-emerald-400 font-semibold">✓ Live</span>
                </div>
              ))}

              {studentData?.id && (
                <Link
                  href={`/portfolio/${studentData.id}`}
                  className="block text-center w-full py-2.5 mt-4 text-xs font-bold text-[#FD7B41] hover:bg-[#FD7B41]/10 bg-slate-900 rounded-xl border border-[#FD7B41]/20 transition"
                >
                  View Full Public Showcase &rarr;
                </Link>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
