import { getLesson } from "@/lib/data/course"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import Link from "next/link"
import { auth } from "@/auth"

// In Next.js App Router, page params are awaited in Server Components
export default async function LessonPage({
  params
}: {
  params: Promise<{ courseId: string; lessonId: string }>
}) {
  const session = await auth()
  const { courseId, lessonId } = await params

  const lesson = await getLesson(lessonId)
  
  if (!lesson) {
    notFound()
  }

  // Placeholder for the "Practice" phase UI. 
  // We'll replace this with the real code editor in the next milestone.
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex-shrink-0 p-4 sticky top-0 md:h-screen overflow-y-auto">
        <Link href="/dashboard" className="text-sm font-semibold text-slate-500 hover:text-slate-900 mb-6 inline-block">
          &larr; Back to Dashboard
        </Link>
        <h2 className="font-bold text-lg text-slate-900 mb-4">{lesson.unit.module.course.title}</h2>
        <div className="space-y-4">
          <div className="font-medium text-slate-700 text-sm">
            {lesson.unit.module.title}
          </div>
          <div className="pl-2 space-y-2">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {lesson.unit.title}
            </div>
            {/* Since we only fetched this specific lesson, we don't have the sibling lessons here in this simplistic UI for the MVP, 
                so we'll just show the current lesson as active. */}
            <div className="pl-2 py-1 text-sm text-blue-600 bg-blue-50 rounded font-medium border-l-2 border-blue-600">
              {lesson.title}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-w-4xl mx-auto">
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
          {/* Lesson Content Rendered via Markdown */}
          <article className="prose prose-slate prose-blue max-w-none prose-headings:font-bold prose-h1:text-3xl prose-a:text-blue-600">
            <ReactMarkdown>{lesson.content}</ReactMarkdown>
          </article>
        </div>

        {/* Interactive Exercise Placeholder */}
        <div className="bg-slate-900 rounded-xl shadow-lg border border-slate-800 p-8 text-white">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-blue-400">{'< >'}</span> Practice Area
            </h3>
            <span className="px-3 py-1 bg-slate-800 text-xs font-semibold rounded-full text-slate-400">
              Terminal
            </span>
          </div>
          
          <div className="bg-black/50 p-6 rounded-lg font-mono text-sm text-green-400 mb-6 border border-slate-800 h-48 flex items-center justify-center">
            {/* Placeholder for real browser editor */}
            <p className="text-slate-500">
              Interactive Code Editor will be integrated in Milestone 5.<br/><br/>
              <span className="text-green-500">$ waiting for input...</span>
            </p>
          </div>

          <div className="flex justify-end">
            <form action={async () => {
              "use server"
              // Server action placeholder to mark progress
              console.log(`User ${session?.user?.id} completed lesson ${lessonId}`)
              // redirect to next lesson logic goes here
            }}>
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded shadow transition-colors">
                Run Code & Continue &rarr;
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
