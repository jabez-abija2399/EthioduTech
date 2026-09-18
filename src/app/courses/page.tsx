import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getCourses } from "@/lib/data/course"
import Link from "next/link"
import { BookOpen, Clock, Users, ArrowRight, PlayCircle, Sparkles, Layout, Layers, Terminal } from "lucide-react"

export default async function CoursesPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  const courses = await getCourses()

  // Function to get an icon based on course title
  const getCourseIcon = (title: string) => {
    const t = title.toLowerCase();
    if (t.includes('html')) return <Layout className="w-6 h-6 text-[#FD7B41]" />;
    if (t.includes('css')) return <Layers className="w-6 h-6 text-blue-400" />;
    if (t.includes('javascript') || t.includes('js')) return <Terminal className="w-6 h-6 text-yellow-400" />;
    return <Code className="w-6 h-6 text-emerald-400" />;
  }

  // Generate unique gradients based on index
  const getGradient = (index: number) => {
    const gradients = [
      "from-[#FD7B41] to-[#EDBF9B]",
      "from-blue-500 to-cyan-400",
      "from-emerald-500 to-teal-400",
      "from-purple-500 to-pink-500",
      "from-rose-500 to-orange-400"
    ];
    return gradients[index % gradients.length];
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FD7B41]/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/2" />
      
      {/* Hero Section */}
      <header className="relative pt-24 pb-20 px-6 max-w-7xl mx-auto z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 border border-[#DDDCDB]/40 rounded-full text-xs font-bold text-[#FD7B41] uppercase tracking-widest mb-6 backdrop-blur-md shadow-sm">
          <Sparkles className="w-4 h-4" />
          The Academy
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tight mb-6">
          Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FD7B41] to-[#EDBF9B]">Modern Web</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
          Embark on a guided journey through our premium curriculum. Build real-world projects, earn experience, and become a professional engineer.
        </p>
      </header>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {courses.length === 0 ? (
            <div className="col-span-full bg-white/60 p-16 rounded-3xl border border-[#DDDCDB]/40 text-center shadow-xl backdrop-blur-xl">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-slate-400" />
              </div>
              <h2 className="text-3xl font-black text-slate-800 mb-3">No courses published yet</h2>
              <p className="text-slate-500 text-lg">Check back later for new cutting-edge curriculum content.</p>
            </div>
          ) : (
            courses.map((course: any, index: number) => (
              <Link 
                href={`/courses/${course.id}`} 
                key={course.id} 
                className="group relative bg-white rounded-[2rem] border border-slate-200/60 shadow-lg hover:shadow-2xl hover:shadow-[#FD7B41]/10 overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image / Graphic Area */}
                <div className="h-56 p-6 flex flex-col justify-between relative overflow-hidden bg-slate-900">
                  <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(index)} opacity-20 group-hover:opacity-40 transition-opacity duration-700 mix-blend-overlay`} />
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none" />
                  
                  {/* Glowing Orbs */}
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[40px] bg-gradient-to-br ${getGradient(index)} opacity-40 translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700`} />
                  
                  <div className="flex justify-between items-start relative z-10 w-full">
                    <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-xs font-black text-white uppercase tracking-widest shadow-sm">
                      {course.modules?.length || 0} Modules
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-sm">
                      {getCourseIcon(course.title)}
                    </div>
                  </div>
                  
                  <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h2 className="text-2xl font-black text-white leading-tight">{course.title}</h2>
                  </div>
                </div>
                
                {/* Content Area */}
                <div className="p-8 flex-1 flex flex-col bg-white">
                  <p className="text-slate-500 mb-8 flex-1 text-sm leading-relaxed font-medium line-clamp-3">
                    {course.description || "Master the fundamental skills required to build real-world, interactive web applications from scratch."}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-slate-800 transition-colors">
                      <Clock className="w-4 h-4" />
                      <span>Self-paced</span>
                    </div>
                    
                    <div className="w-12 h-12 rounded-full bg-slate-50 group-hover:bg-[#FD7B41] text-slate-400 group-hover:text-white flex items-center justify-center transition-colors duration-300">
                      <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function Code({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="16 18 22 12 16 6"></polyline>
      <polyline points="8 6 2 12 8 18"></polyline>
    </svg>
  );
}
