import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getCourses } from "@/lib/data/course"
import Link from "next/link"
import { BookOpen, Clock, Users, ArrowRight } from "lucide-react"

export default async function CoursesPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  const courses = await getCourses()

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-[#3C4044] tracking-tight mb-4">
          Course Catalog
        </h1>
        <p className="text-lg text-[#3C4044]/70 max-w-2xl">
          Explore our available courses and start building your tech skills today.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.length === 0 ? (
          <div className="col-span-full bg-white p-12 rounded-3xl border border-[#DDDCDB]/40 text-center shadow-sm">
            <BookOpen className="w-12 h-12 text-[#3C4044]/40 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#3C4044] mb-2">No courses published yet</h2>
            <p className="text-[#3C4044]/60">Check back later for new curriculum content.</p>
          </div>
        ) : (
          courses.map((course: any) => (
            <div key={course.id} className="bg-white rounded-3xl border border-[#DDDCDB]/40 shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-[#3C4044] to-[#2a2d30] p-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FD7B41]/20 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                <div className="flex justify-between items-start relative z-10">
                  <span className="px-3 py-1 bg-white/10 border border-white/10 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                    {course.modules?.length || 0} Modules
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white relative z-10 mt-auto">{course.title}</h2>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <p className="text-[#3C4044]/70 mb-6 flex-1 text-sm leading-relaxed">
                  {course.description || "Learn the fundamentals of web development and build real-world projects."}
                </p>
                
                <Link 
                  href={`/courses/${course.id}`}
                  className="inline-flex items-center justify-between w-full px-6 py-3 bg-[#FD7B41] hover:bg-[#FD7B41]/90 text-white font-bold rounded-xl transition"
                >
                  <span>View Syllabus</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
