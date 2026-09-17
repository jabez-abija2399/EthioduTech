import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { getCourseWithFullTree } from "@/lib/data/course"
import { auth } from "@/auth"
import { Play, CheckCircle2, ChevronRight, BookOpen, Clock, Activity, FileText } from "lucide-react"

export default async function CourseLandingPage({
  params
}: {
  params: Promise<{ courseId: string }>
}) {
  const { courseId } = await params
  const session = await auth()
  
  const course = await getCourseWithFullTree(courseId)
  
  if (!course) {
    notFound()
  }

  const isEnrolled = !!session?.user // Simplification for MVP: anyone logged in is "enrolled" in free courses

  // Calculate stats
  const totalModules = course.modules?.length || 0
  const totalLessons = course.modules?.reduce((acc: number, mod: any) => {
    return acc + mod.units?.reduce((uAcc: number, unit: any) => uAcc + (unit.lessons?.length || 0), 0)
  }, 0) || 0

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* Dynamic Hero Section */}
      <section className="bg-slate-950 text-white pt-24 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FD7B41]/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold text-white uppercase tracking-widest mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Active Course
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
            {course.title}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
            {course.description || "Master the fundamental skills required to build real-world, interactive web applications from scratch."}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {isEnrolled ? (
              <Link 
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FD7B41] hover:bg-[#FD7B41]/90 text-white font-black text-lg rounded-xl transition shadow-lg shadow-[#FD7B41]/20 transform hover:-translate-y-1"
              >
                <Play className="w-5 h-5 fill-current" />
                Resume in Dashboard
              </Link>
            ) : (
              <Link 
                href="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FD7B41] hover:bg-[#FD7B41]/90 text-white font-black text-lg rounded-xl transition shadow-lg shadow-[#FD7B41]/20 transform hover:-translate-y-1"
              >
                Start Learning for Free
              </Link>
            )}
            <Link 
              href="#syllabus"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-xl transition border border-white/10 backdrop-blur-sm"
            >
              View Syllabus
            </Link>
          </div>
        </div>
      </section>

      {/* Course Stats Banner */}
      <div className="max-w-4xl mx-auto -mt-12 relative z-20 px-6 mb-16">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 md:p-8 flex flex-wrap gap-8 justify-around items-center">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100 text-[#FD7B41] mx-auto mb-3">
              <BookOpen className="w-6 h-6" />
            </div>
            <p className="text-2xl font-black text-slate-800">{totalModules}</p>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Modules</p>
          </div>
          
          <div className="hidden md:block w-px h-16 bg-slate-100" />
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mx-auto mb-3">
              <FileText className="w-6 h-6" />
            </div>
            <p className="text-2xl font-black text-slate-800">{totalLessons}</p>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Lessons</p>
          </div>

          <div className="hidden md:block w-px h-16 bg-slate-100" />
          
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 mx-auto mb-3">
              <Activity className="w-6 h-6" />
            </div>
            <p className="text-2xl font-black text-slate-800">Project-Based</p>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Learning Style</p>
          </div>
        </div>
      </div>

      {/* Syllabus Section */}
      <section id="syllabus" className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-800 mb-4">Course Syllabus</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Everything you will learn and build in this curriculum.</p>
        </div>

        <div className="space-y-6">
          {course.modules?.map((mod: any, index: number) => (
            <div key={mod.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-[#FD7B41] uppercase tracking-wider mb-2">Module {index + 1}</p>
                  <h3 className="text-2xl font-bold text-slate-800">{mod.title}</h3>
                </div>
                <div className="px-4 py-2 bg-slate-100 rounded-lg text-slate-600 text-sm font-bold whitespace-nowrap">
                  {mod.units?.reduce((acc: number, u: any) => acc + (u.lessons?.length || 0), 0)} lessons
                </div>
              </div>
              
              <div className="bg-slate-50 p-6 md:p-8 space-y-8">
                {mod.units?.map((unit: any) => (
                  <div key={unit.id}>
                    <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                      {unit.title}
                    </h4>
                    <ul className="space-y-3 pl-7">
                      {unit.lessons?.map((lesson: any) => (
                        <li key={lesson.id} className="flex items-start gap-3 group">
                          <CheckCircle2 className="w-5 h-5 text-slate-300 mt-0.5 shrink-0" />
                          <div>
                            <p className="font-medium text-slate-700 group-hover:text-[#FD7B41] transition cursor-default">
                              {lesson.title}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {!isEnrolled && (
           <div className="mt-16 text-center">
             <Link 
               href="/register"
               className="inline-flex items-center justify-center px-10 py-5 bg-[#3C4044] hover:bg-black text-white font-black text-xl rounded-2xl transition shadow-xl"
             >
               Create an account to start
             </Link>
           </div>
        )}
      </section>
    </div>
  )
}
