import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getCourses } from "@/lib/data/course"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  const courses = await getCourses()

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Student Dashboard</h1>
        <p className="text-slate-600">Welcome back, {session.user.name}</p>
      </header>
      
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-100 md:col-span-2">
          <h2 className="font-semibold text-xl mb-4 text-slate-800">Your Courses</h2>
          
          {courses.length === 0 ? (
            <div className="flex items-center justify-center h-32 border-2 border-dashed border-slate-200 rounded-lg text-slate-500">
              No courses found. Please contact an administrator.
            </div>
          ) : (
            <div className="space-y-4">
              {courses.map(course => {
                const firstLessonId = course.modules[0]?.units[0]?.lessons[0]?.id
                
                return (
                  <div key={course.id} className="p-4 border border-slate-200 rounded-lg shadow-sm">
                    <h3 className="font-bold text-lg text-blue-600">{course.title}</h3>
                    <p className="text-slate-600 mb-4">{course.description}</p>
                    
                    <div className="w-full bg-slate-200 rounded-full h-2.5 mb-4">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '0%' }}></div>
                    </div>
                    
                    {firstLessonId ? (
                      <Link 
                        href={`/courses/${course.id}/lessons/${firstLessonId}`}
                        className="inline-block px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-slate-800 transition"
                      >
                        Start Learning
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
        
        <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-100">
          <h2 className="font-semibold text-xl mb-4 text-slate-800">Portfolio</h2>
          <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-200 rounded-lg text-slate-500 p-4 text-center">
            <p>No projects completed yet.</p>
            <p className="text-sm mt-2">Finish a course challenge to add it to your portfolio!</p>
          </div>
        </div>
      </main>
    </div>
  )
}
