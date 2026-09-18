import { notFound, redirect } from "next/navigation"
import Link from "next/link"
import { getCourseWithFullTree } from "@/lib/data/course"
import { auth } from "@/auth"
import { Play, CheckCircle2, ChevronRight, BookOpen, Clock, Activity, FileText, Code2, Sparkles, Hexagon } from "lucide-react"
import { DownloadCourseButton } from "@/components/curriculum/DownloadCourseButton"

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

  // Flatten lesson URLs for offline caching
  const lessonUrls = course.modules?.flatMap((mod: any) => 
    mod.units?.flatMap((unit: any) => 
      unit.lessons?.map((lesson: any) => `/courses/${courseId}/lessons/${lesson.id}`) || []
    ) || []
  ) || []

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* Immersive Edge-to-Edge Hero Section */}
      <section className="bg-[#0f1115] text-white pt-24 pb-48 px-6 relative overflow-hidden">
        {/* Dynamic Abstract Background Elements */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-[#FD7B41]/20 to-purple-500/10 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4 pointer-events-none" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-black text-[#EDBF9B] uppercase tracking-widest mb-8 backdrop-blur-md shadow-2xl">
            <Sparkles className="w-4 h-4 text-[#FD7B41]" />
            Complete Curriculum
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70">
            {course.title}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            {course.description || "Master the fundamental skills required to build real-world, interactive web applications from scratch."}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            {isEnrolled ? (
              <Link 
                href="/dashboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-[#FD7B41] to-[#f4682c] hover:to-[#e5591c] text-white font-black text-lg rounded-2xl transition-all shadow-xl shadow-[#FD7B41]/20 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#FD7B41]/30"
              >
                <Play className="w-5 h-5 fill-current" />
                Resume in Dashboard
              </Link>
            ) : (
              <Link 
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-[#FD7B41] to-[#f4682c] hover:to-[#e5591c] text-white font-black text-lg rounded-2xl transition-all shadow-xl shadow-[#FD7B41]/20 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#FD7B41]/30"
              >
                Start Learning for Free
              </Link>
            )}
            <Link 
              href="#syllabus"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-bold text-lg rounded-2xl transition-all border border-white/10 backdrop-blur-md transform hover:-translate-y-1"
            >
              View Syllabus
            </Link>
          </div>
          
          <div className="mt-8 flex justify-center w-full">
            <DownloadCourseButton courseId={courseId} lessonUrls={lessonUrls} />
          </div>
        </div>
      </section>

      {/* Floating Glassmorphic Stats Bar */}
      <div className="max-w-5xl mx-auto -mt-24 relative z-20 px-6 mb-20">
        <div className="bg-white/80 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-white p-2 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-200/60">
          <div className="flex-1 p-6 flex flex-col items-center text-center group hover:bg-slate-50/50 rounded-3xl transition-colors duration-500">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-orange-50 text-[#FD7B41] mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
              <Hexagon className="w-7 h-7" />
            </div>
            <p className="text-3xl font-black text-slate-800 tracking-tight">{totalModules}</p>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Modules</p>
          </div>
          
          <div className="flex-1 p-6 flex flex-col items-center text-center group hover:bg-slate-50/50 rounded-3xl transition-colors duration-500">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-50 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
              <FileText className="w-7 h-7" />
            </div>
            <p className="text-3xl font-black text-slate-800 tracking-tight">{totalLessons}</p>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Lessons</p>
          </div>
          
          <div className="flex-1 p-6 flex flex-col items-center text-center group hover:bg-slate-50/50 rounded-3xl transition-colors duration-500">
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
              <Code2 className="w-7 h-7" />
            </div>
            <p className="text-3xl font-black text-slate-800 tracking-tight">Project-Based</p>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Methodology</p>
          </div>
        </div>
      </div>

      {/* Interactive Timeline Syllabus Section */}
      <section id="syllabus" className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">Course Syllabus</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">Everything you will learn and build in this carefully structured curriculum.</p>
        </div>

        <div className="space-y-12">
          {course.modules?.map((mod: any, index: number) => (
            <div key={mod.id} className="relative pl-8 md:pl-0">
              {/* Desktop Timeline Line */}
              <div className="hidden md:block absolute left-10 top-24 bottom-[-3rem] w-0.5 bg-gradient-to-b from-slate-200 to-transparent" />
              
              <div className="bg-white rounded-3xl border border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden relative group">
                
                {/* Module Header */}
                <div className="p-8 md:p-10 border-b border-slate-100/80 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden bg-slate-50/30">
                  {/* Decorative number background */}
                  <div className="absolute -right-6 -top-10 text-[180px] font-black text-slate-900/[0.02] pointer-events-none select-none">
                    {index + 1}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#FD7B41]/10 flex items-center justify-center border border-[#FD7B41]/20">
                        <span className="text-[#FD7B41] font-black text-sm">{index + 1}</span>
                      </div>
                      <p className="text-sm font-black text-[#FD7B41] uppercase tracking-widest">Module</p>
                    </div>
                    <h3 className="text-3xl font-black text-slate-800 tracking-tight">{mod.title}</h3>
                  </div>
                  <div className="px-5 py-2 bg-white rounded-xl border border-slate-200/60 shadow-sm text-slate-500 font-bold whitespace-nowrap relative z-10 self-start md:self-auto">
                    {mod.units?.reduce((acc: number, u: any) => acc + (u.lessons?.length || 0), 0)} lessons
                  </div>
                </div>
                
                {/* Module Content / Units */}
                <div className="p-8 md:p-10 space-y-4 bg-white relative">
                  {mod.units?.map((unit: any, uIndex: number) => (
                    <details key={unit.id} className="group/unit relative border border-slate-200 rounded-2xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                      <summary className="flex items-center justify-between p-5 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
                        <h4 className="text-lg font-extrabold text-slate-700 flex items-center gap-3">
                          <span className="w-1.5 h-5 bg-blue-500 rounded-full" />
                          {unit.title}
                        </h4>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200">
                            {unit.lessons?.length || 0} lessons
                          </span>
                          <ChevronRight className="w-5 h-5 text-slate-400 transition-transform group-open/unit:rotate-90" />
                        </div>
                      </summary>
                      
                      <div className="p-5 bg-white border-t border-slate-100">
                        <ul className="space-y-3">
                          {unit.lessons?.map((lesson: any) => (
                            <li key={lesson.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors duration-300 group/lesson cursor-default">
                              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 group-hover/lesson:bg-emerald-100 group-hover/lesson:text-emerald-500 transition-colors duration-300 mt-0.5 text-slate-400">
                                <CheckCircle2 className="w-4 h-4" />
                              </div>
                              <div className="flex-1">
                                <p className="font-bold text-slate-700 group-hover/lesson:text-[#FD7B41] transition-colors duration-300 text-base leading-tight">
                                  {lesson.title}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {!isEnrolled && (
           <div className="mt-24 text-center">
             <div className="relative inline-block group">
               <div className="absolute inset-0 bg-[#FD7B41] rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
               <Link 
                 href="/register"
                 className="relative inline-flex items-center justify-center px-12 py-6 bg-slate-900 hover:bg-black text-white font-black text-xl rounded-3xl transition-all duration-300 shadow-2xl hover:-translate-y-1"
               >
                 Create an account to start
               </Link>
             </div>
           </div>
        )}
      </section>
    </div>
  )
}
