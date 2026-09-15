import { getLesson, getCourseWithFullTree, getUserProgress } from "@/lib/data/course"
import { notFound, redirect } from "next/navigation"
import ReactMarkdown from "react-markdown"
import Link from "next/link"
import { auth } from "@/auth"
import CodeEditor from "./code-editor"

export default async function LessonPage({
  params
}: {
  params: Promise<{ courseId: string; lessonId: string }>
}) {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  const { courseId, lessonId } = await params

  const userId = session?.user?.id || (session?.user as any)?.sub || ""

  const [lesson, courseTree, userProgress] = await Promise.all([
    getLesson(lessonId),
    getCourseWithFullTree(courseId),
    getUserProgress(userId)
  ])
  
  if (!lesson || !courseTree) {
    notFound()
  }

  // Create set of completed lesson IDs for quick lookup
  const completedLessonIds = new Set(
    userProgress
      .filter((p) => p.status === "COMPLETED" && p.entityType === "LESSON")
      .map((p) => p.entityId)
  )

  // Flatten all lessons in order to determine previous and next lessons
  const allLessons: { id: string; title: string }[] = []
  courseTree.modules.forEach((mod: any) => {
    mod.units.forEach((unit: any) => {
      unit.lessons.forEach((l: any) => {
        allLessons.push({ id: l.id, title: l.title })
      })
    })
  })

  const currentIndex = allLessons.findIndex((l) => l.id === lessonId)
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      {/* Sidebar Course Navigation */}
      <aside className="w-full md:w-72 bg-white border-r border-slate-200 flex-shrink-0 p-5 sticky top-0 md:h-screen overflow-y-auto">
        <Link 
          href="/dashboard" 
          className="text-xs font-bold text-slate-500 hover:text-slate-900 mb-6 inline-flex items-center gap-1.5 transition"
        >
          <span>&larr;</span> Back to Dashboard
        </Link>

        <h2 className="font-extrabold text-lg text-slate-900 mb-1 leading-snug">
          {courseTree.title}
        </h2>
        <p className="text-xs text-slate-500 mb-6">Interactive Course</p>

        {/* Modules & Units Navigation List */}
        <div className="space-y-6">
          {courseTree.modules.map((moduleItem: any, modIdx: number) => (
            <div key={moduleItem.id} className="space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px]">
                  {modIdx + 1}
                </span>
                {moduleItem.title}
              </div>

              {moduleItem.units.map((unitItem: any) => (
                <div key={unitItem.id} className="pl-3 space-y-1 border-l-2 border-slate-100">
                  <div className="text-xs font-semibold text-slate-600 mb-1.5">
                    {unitItem.title}
                  </div>

                  <div className="space-y-1">
                    {unitItem.lessons.map((lessonItem: any) => {
                      const isActive = lessonItem.id === lessonId
                      const isCompleted = completedLessonIds.has(lessonItem.id)

                      return (
                        <Link
                          key={lessonItem.id}
                          href={`/courses/${courseId}/lessons/${lessonItem.id}`}
                          className={`flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition ${
                            isActive
                              ? "bg-blue-50 text-blue-700 font-bold border border-blue-200"
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                          }`}
                        >
                          <span className="truncate pr-2">{lessonItem.title}</span>
                          {isCompleted ? (
                            <span className="text-emerald-600 text-xs font-bold" title="Completed">
                              ✓
                            </span>
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </aside>

      {/* Main Lesson Content & Code Workspace */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-5xl mx-auto w-full">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 truncate">
            <span>{lesson.unit.module.title}</span>
            <span>/</span>
            <span className="font-semibold text-slate-700">{lesson.unit.title}</span>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            {prevLesson ? (
              <Link
                href={`/courses/${courseId}/lessons/${prevLesson.id}`}
                className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded transition"
              >
                &larr; Prev
              </Link>
            ) : null}
            {nextLesson ? (
              <Link
                href={`/courses/${courseId}/lessons/${nextLesson.id}`}
                className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded transition"
              >
                Next &rarr;
              </Link>
            ) : null}
          </div>
        </div>

        {/* Lesson Reading Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 mb-8">
          <article className="prose prose-slate prose-blue max-w-none prose-headings:font-extrabold prose-h1:text-3xl prose-h2:text-2xl prose-a:text-blue-600 prose-code:text-blue-700 prose-code:bg-blue-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
            <ReactMarkdown>{lesson.content}</ReactMarkdown>
          </article>
        </div>

        {/* Interactive Code Editor Workspace */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <span className="text-blue-600 font-mono text-2xl">{"< / >"}</span> Interactive Practice Workspace
          </h2>
          <p className="text-sm text-slate-600 mb-4">
            Practice what you just learned directly in your browser. Write code, preview the results in real-time, and click complete to advance!
          </p>

          <CodeEditor
            courseId={courseId}
            lessonId={lessonId}
            hasNextLesson={Boolean(nextLesson)}
            nextLessonId={nextLesson?.id}
          />
        </section>
      </main>
    </div>
  )
}
