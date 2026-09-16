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
    <div className="min-h-screen bg-[#3C4044] text-[#DDDCDB] flex flex-col md:flex-row font-sans">
      {/* Sidebar Course Navigation */}
      <aside className="w-full md:w-72 bg-slate-900/80 border-r border-[#DDDCDB]/10 flex-shrink-0 p-5 sticky top-0 md:h-screen overflow-y-auto">
        <Link 
          href="/dashboard" 
          className="text-xs font-bold text-[#DDDCDB]/60 hover:text-white mb-6 inline-flex items-center gap-1.5 transition"
        >
          <span>&larr;</span> Back to Dashboard
        </Link>

        <h2 className="font-extrabold text-lg text-white mb-1 leading-snug">
          {courseTree.title}
        </h2>
        <p className="text-xs text-[#FD7B41] mb-6">Interactive Course</p>

        {/* Modules & Units Navigation List */}
        <div className="space-y-6">
          {courseTree.modules.map((moduleItem: any, modIdx: number) => (
            <div key={moduleItem.id} className="space-y-3">
              <div className="text-xs font-bold text-[#DDDCDB]/50 uppercase tracking-wider flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#DDDCDB]/10 text-[#DDDCDB] flex items-center justify-center text-[10px]">
                  {modIdx + 1}
                </span>
                {moduleItem.title}
              </div>

              {moduleItem.units.map((unitItem: any) => (
                <div key={unitItem.id} className="pl-3 space-y-1 border-l-2 border-[#DDDCDB]/10">
                  <div className="text-xs font-semibold text-[#DDDCDB]/80 mb-1.5">
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
                              ? "bg-[#FD7B41]/10 text-[#FD7B41] font-bold border border-[#FD7B41]/20"
                              : "text-[#DDDCDB]/60 hover:bg-slate-800 hover:text-[#DDDCDB]"
                          }`}
                        >
                          <span className="truncate pr-2">{lessonItem.title}</span>
                          {isCompleted ? (
                            <span className="text-emerald-400 text-xs font-bold" title="Completed">
                              ✓
                            </span>
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DDDCDB]/20"></span>
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
        <div className="flex items-center justify-between text-xs text-[#DDDCDB]/60 mb-6 bg-slate-900/50 p-3 rounded-xl border border-[#DDDCDB]/10 shadow-sm">
          <div className="flex items-center gap-2 truncate">
            <span>{lesson.unit.module.title}</span>
            <span>/</span>
            <span className="font-semibold text-white">{lesson.unit.title}</span>
          </div>

          <div className="flex items-center space-x-3 flex-shrink-0">
            {prevLesson ? (
              <Link
                href={`/courses/${courseId}/lessons/${prevLesson.id}`}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-[#DDDCDB] font-medium rounded-lg transition"
              >
                &larr; Prev
              </Link>
            ) : null}
            {nextLesson ? (
              <Link
                href={`/courses/${courseId}/lessons/${nextLesson.id}`}
                className="px-3 py-1 bg-[#FD7B41]/10 hover:bg-[#FD7B41]/20 text-[#FD7B41] font-bold rounded-lg transition"
              >
                Next &rarr;
              </Link>
            ) : null}
          </div>
        </div>

        {/* Lesson Reading Content */}
        <div className="bg-slate-900/60 rounded-2xl shadow-sm border border-[#DDDCDB]/10 p-6 md:p-10 mb-8">
          <article className="prose prose-invert max-w-none prose-headings:font-extrabold prose-h1:text-white prose-h2:text-[#DDDCDB] prose-a:text-[#FD7B41] prose-code:text-[#EDBF9B] prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-p:text-[#DDDCDB]/90 prose-li:text-[#DDDCDB]/90">
            <ReactMarkdown>{lesson.content}</ReactMarkdown>
          </article>
        </div>

        {/* Interactive Code Editor Workspace */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <span className="text-[#FD7B41] font-mono text-2xl">{"< / >"}</span> Interactive Practice Workspace
          </h2>
          <p className="text-sm text-[#DDDCDB]/70 mb-6">
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
