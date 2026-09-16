import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getCourses, getUserProgress } from "@/lib/data/course"
import { getStudentPortfolio } from "@/lib/data/portfolio"
import { getStudentGamificationStats } from "@/lib/data/gamification"
import Link from "next/link"
import { Play, FolderKanban, Activity, Code, Map, CheckCircle2, ChevronRight, MessageSquare, Plus } from "lucide-react"

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  const userId = session.user.id || (session.user as any)?.sub || ""

  const [courses, studentData, userProgress] = await Promise.all([
    getCourses(),
    getStudentPortfolio(userId),
    getUserProgress(userId)
  ])

  const activeCourse = courses.length > 0 ? courses[0] : null
  
  // Calculate real progress
  let activeLessonId = ""
  let completedCount = 0
  let totalLessons = 0
  let nextLessonName = "Introduction"
  let currentModuleName = "Module 1"

  if (activeCourse) {
    const completedLessonIds = new Set(
      userProgress.filter((p: any) => p.status === 'COMPLETED').map((p: any) => p.entityId)
    )

    let foundNext = false
    
    // Traverse modules, units, lessons in order
    for (const mod of activeCourse.modules) {
      for (const unit of mod.units) {
        for (const lesson of unit.lessons) {
          totalLessons++
          if (completedLessonIds.has(lesson.id)) {
            completedCount++
          } else if (!foundNext) {
            activeLessonId = lesson.id
            nextLessonName = lesson.title
            currentModuleName = mod.title
            foundNext = true
          }
        }
      }
    }
    
    // If all completed, just point to the last lesson
    if (!foundNext && activeCourse.modules.length > 0) {
      const lastMod = activeCourse.modules[activeCourse.modules.length - 1]
      const lastUnit = lastMod.units[lastMod.units.length - 1]
      activeLessonId = lastUnit.lessons[lastUnit.lessons.length - 1].id
      nextLessonName = "Course Completed!"
      currentModuleName = lastMod.title
    }
  }

  const progressPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

  const portfolioProjects = studentData?.portfolios?.flatMap((p: any) => p.projects || []) || []

  return (
    <div className="space-y-8 pb-12">
      {/* Personalized Hero Area */}
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#3C4044] tracking-tight">
          Good afternoon, {session.user.name?.split(" ")[0] || "Student"} 👋
        </h1>
        <p className="text-[#3C4044]/60 text-lg mt-2">
          Ready to keep building?
        </p>
      </header>

      {/* Hero Continue Learning Block */}
      {activeCourse ? (
        <section className="bg-[#3C4044] rounded-3xl p-6 md:p-10 shadow-xl border border-[#DDDCDB]/20 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 group">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#FD7B41]/20 to-transparent rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="relative z-10 flex-1">
            <div className="text-[10px] font-black uppercase tracking-widest text-[#EDBF9B] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FD7B41] animate-pulse"></span>
              Continue Learning
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2">{activeCourse.title}</h2>
            <p className="text-[#DDDCDB] font-medium text-lg mb-6 max-w-xl">
              {currentModuleName}
            </p>
            
            <div className="mb-6 max-w-md">
              <div className="flex justify-between text-sm mb-2 font-bold">
                <span className="text-[#DDDCDB]/80">Progress</span>
                <span className="text-[#FD7B41]">{progressPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                <div className="h-full bg-[#FD7B41] rounded-full transition-all duration-1000" style={{ width: `${progressPercentage}%` }}></div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm font-medium text-[#DDDCDB]/80 mb-6 bg-white/5 inline-flex px-4 py-2 rounded-xl border border-white/5">
              <span>Next up:</span>
              <span className="text-white font-bold">{nextLessonName}</span>
            </div>
            
            <div>
              <Link
                href={`/courses/${activeCourse.id}/lessons/${activeLessonId}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FD7B41] hover:bg-[#FD7B41]/90 text-white font-black text-base rounded-xl transition shadow-lg shadow-[#FD7B41]/20 transform group-hover:-translate-y-1"
              >
                <Play className="w-5 h-5 fill-current" />
                Continue lesson
              </Link>
            </div>
          </div>
          
          <div className="relative z-10 hidden lg:block w-72 shrink-0">
             <div className="bg-[#2a2d30] border border-white/10 rounded-2xl p-5 shadow-2xl transform rotate-2 hover:rotate-0 transition-transform">
               <div className="flex gap-1.5 border-b border-white/10 pb-3 mb-3">
                 <div className="w-3 h-3 rounded-full bg-red-400"></div>
                 <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                 <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
               </div>
               <div className="font-mono text-sm text-[#DDDCDB]/60">
                 <div className="text-emerald-400 mb-1">{"// Goal: Initialize variables"}</div>
                 <div className="text-[#FD7B41]">let</div> <span className="text-white">playerName</span> = <span className="text-[#EDBF9B]">"Yabets"</span>;
                 <div className="text-[#FD7B41] mt-1">let</div> <span className="text-white">score</span> = <span className="text-blue-400">0</span>;
               </div>
             </div>
          </div>
        </section>
      ) : (
        <section className="bg-white rounded-3xl p-10 border border-[#DDDCDB]/40 text-center shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#FD7B41]/10 flex items-center justify-center mx-auto mb-6 text-[#FD7B41]">
            <Map className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#3C4044] mb-2">Choose a learning path to get started</h2>
          <p className="text-[#3C4044]/60 mb-6">You aren't enrolled in any active courses yet.</p>
          <Link href="/courses" className="inline-flex px-6 py-3 bg-[#3C4044] text-white font-bold rounded-xl hover:bg-black transition">
            Browse Curriculum
          </Link>
        </section>
      )}

      {/* Three Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: What's Next Action List */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-[#3C4044] flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#FD7B41]" />
            What's next?
          </h3>
          
          <div className="space-y-4">
            {/* Practice Item */}
            <div className="bg-white border border-[#DDDCDB]/40 rounded-2xl p-5 shadow-sm hover:border-[#FD7B41]/40 transition group cursor-pointer flex gap-5 items-center">
              <div className="w-12 h-12 rounded-xl bg-[#EDBF9B]/20 flex items-center justify-center text-[#EDBF9B] shrink-0">
                <Code className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-bold text-[#3C4044]/50 uppercase tracking-widest mb-1">Practice</div>
                <h4 className="font-bold text-[#3C4044] text-base group-hover:text-[#FD7B41] transition">Variables & Scope</h4>
                <p className="text-sm text-[#3C4044]/60 line-clamp-1">Complete 3 short interactive exercises to solidify your understanding.</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#3C4044]/30 group-hover:text-[#FD7B41] transition transform group-hover:translate-x-1" />
            </div>

            {/* Project Item */}
            <div className="bg-white border border-[#DDDCDB]/40 rounded-2xl p-5 shadow-sm hover:border-[#FD7B41]/40 transition group cursor-pointer flex gap-5 items-center">
              <div className="w-12 h-12 rounded-xl bg-[#3C4044]/5 flex items-center justify-center text-[#3C4044] shrink-0">
                <FolderKanban className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-bold text-[#3C4044]/50 uppercase tracking-widest mb-1">Project</div>
                <h4 className="font-bold text-[#3C4044] text-base group-hover:text-[#FD7B41] transition">Build the Search Feature</h4>
                <p className="text-sm text-[#3C4044]/60 line-clamp-1">Apply what you learned to your Weather Dashboard project.</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#3C4044]/30 group-hover:text-[#FD7B41] transition transform group-hover:translate-x-1" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-[#3C4044] flex items-center gap-2 pt-6">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            Your Skills
          </h3>
          
          <div className="bg-white border border-[#DDDCDB]/40 rounded-2xl p-6 shadow-sm">
            <div className="space-y-5">
              {[
                { name: "HTML / CSS", level: "Developing", percent: 45, color: "bg-blue-500" },
                { name: "JavaScript", level: "Starting", percent: 15, color: "bg-yellow-400" },
                { name: "Problem Solving", level: "Developing", percent: 35, color: "bg-emerald-500" }
              ].map(skill => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span className="text-[#3C4044]">{skill.name}</span>
                    <span className="text-[#3C4044]/50">{skill.level}</span>
                  </div>
                  <div className="w-full h-2 bg-[#f8f9fa] rounded-full overflow-hidden border border-[#DDDCDB]/20">
                    <div className={`h-full ${skill.color} rounded-full`} style={{ width: `${skill.percent}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Portfolio & AI */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-[#3C4044]">Portfolio</h3>
          
          <div className="bg-white border border-[#DDDCDB]/40 rounded-2xl overflow-hidden shadow-sm flex flex-col">
            {portfolioProjects.length === 0 ? (
              <div className="p-8 text-center bg-[#f8f9fa]">
                <div className="w-12 h-12 rounded-xl bg-white border border-[#DDDCDB]/20 flex items-center justify-center mx-auto mb-4 text-[#3C4044]/40">
                  <FolderKanban className="w-6 h-6" />
                </div>
                <p className="font-bold text-[#3C4044] mb-1">No projects yet</p>
                <p className="text-xs text-[#3C4044]/60 mb-4">Build something you're proud to show.</p>
                <Link href="/dashboard" className="px-4 py-2 bg-[#FD7B41]/10 text-[#FD7B41] font-bold text-xs rounded-lg hover:bg-[#FD7B41]/20 transition block">
                  Start a project
                </Link>
              </div>
            ) : (
              <div className="p-1">
                {portfolioProjects.slice(0, 3).map((item: any) => (
                  <div key={item.id} className="p-4 hover:bg-[#f8f9fa] transition border-b border-[#DDDCDB]/10 last:border-0">
                    <h4 className="font-bold text-sm text-[#3C4044] truncate">{item.project.title}</h4>
                    <p className="text-xs text-[#3C4044]/50 truncate mt-0.5">{item.project.description}</p>
                  </div>
                ))}
              </div>
            )}
            
            <div className="p-4 bg-[#f8f9fa] border-t border-[#DDDCDB]/20">
              <Link href={`/portfolio/${studentData?.id || ''}`} className="text-sm font-bold text-[#FD7B41] hover:text-[#FD7B41]/80 flex items-center justify-center gap-2">
                View public portfolio <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <h3 className="text-xl font-bold text-[#3C4044] pt-4">AI Tutor</h3>
          <div className="bg-gradient-to-br from-[#3C4044] to-[#2a2d30] border border-[#3C4044] rounded-2xl p-6 shadow-xl text-white relative overflow-hidden group cursor-pointer">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FD7B41]/20 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#FD7B41] shrink-0 border border-white/5 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Need help?</h4>
                <p className="text-sm text-[#DDDCDB]/70 mb-4 leading-relaxed">
                  Ask a question, understand an error, or get a hint without giving up the answer.
                </p>
                <span className="inline-flex px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-lg transition border border-white/10">
                  Ask for a hint
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
