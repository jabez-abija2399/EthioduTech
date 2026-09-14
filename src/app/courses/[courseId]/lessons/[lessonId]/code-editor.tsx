"use client"

import { useState, useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import { completeLessonAction } from "@/lib/actions/progress"
import { getCodeDraft, saveCodeDraft, addPendingSync } from "@/lib/offline/db"

interface CodeEditorProps {
  courseId: string
  lessonId: string
  initialHtml?: string
  initialCss?: string
  initialJs?: string
  hasNextLesson: boolean
  nextLessonId?: string
}

export default function CodeEditor({
  courseId,
  lessonId,
  initialHtml = `<div class="card">\n  <h1>Welcome to Edutech!</h1>\n  <p>Edit this HTML/CSS to see live changes.</p>\n  <button id="btn">Click Me</button>\n</div>`,
  initialCss = `body {\n  font-family: system-ui, sans-serif;\n  background: #0f172a;\n  color: #f8fafc;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  margin: 0;\n}\n\n.card {\n  background: #1e293b;\n  padding: 2rem;\n  border-radius: 1rem;\n  box-shadow: 0 10px 25px rgba(0,0,0,0.5);\n  text-align: center;\n  border: 1px solid #334155;\n}\n\nh1 {\n  color: #38bdf8;\n  margin-bottom: 0.5rem;\n}\n\nbutton {\n  background: #0284c7;\n  color: white;\n  border: none;\n  padding: 0.75rem 1.5rem;\n  border-radius: 0.5rem;\n  font-weight: bold;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n\nbutton:hover {\n  background: #0369a1;\n  transform: translateY(-2px);\n}`,
  initialJs = `document.getElementById('btn')?.addEventListener('click', () => {\n  alert('Great job! You are building real web applications!');\n});`,
  hasNextLesson,
  nextLessonId
}: CodeEditorProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html")
  const [htmlCode, setHtmlCode] = useState(initialHtml)
  const [cssCode, setCssCode] = useState(initialCss)
  const [jsCode, setJsCode] = useState(initialJs)
  const [srcDoc, setSrcDoc] = useState("")
  const [isPending, startTransition] = useTransition()
  const [offlineMessage, setOfflineMessage] = useState<string | null>(null)

  // 1. Load cached draft from IndexedDB if available
  useEffect(() => {
    getCodeDraft(lessonId).then((draft) => {
      if (draft) {
        setHtmlCode(draft.html)
        setCssCode(draft.css)
        setJsCode(draft.js)
      }
    })
  }, [lessonId])

  // 2. Auto-save code draft to IndexedDB on code change
  useEffect(() => {
    saveCodeDraft({
      lessonId,
      html: htmlCode,
      css: cssCode,
      js: jsCode,
      updatedAt: Date.now()
    })
  }, [lessonId, htmlCode, cssCode, jsCode])

  // Generate preview document
  const updatePreview = () => {
    const combined = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode}
        <script>
          try {
            ${jsCode}
          } catch (err) {
            console.error(err);
          }
        </script>
      </body>
      </html>
    `
    setSrcDoc(combined)
  }

  // Update preview on mount and on "Run Code"
  useEffect(() => {
    updatePreview()
  }, [])

  const handleReset = () => {
    setHtmlCode(initialHtml)
    setCssCode(initialCss)
    setJsCode(initialJs)
  }

  const handleComplete = () => {
    startTransition(async () => {
      if (typeof window !== "undefined" && !navigator.onLine) {
        await addPendingSync({
          courseId,
          lessonId,
          timestamp: Date.now(),
          status: "pending"
        })
        setOfflineMessage("⚡ Offline completion saved! Moving to next lesson...")
        setTimeout(() => {
          if (nextLessonId) {
            router.push(`/courses/${courseId}/lessons/${nextLessonId}`)
          } else {
            router.push("/dashboard")
          }
        }, 300)
        return
      }

      await completeLessonAction(courseId, lessonId)
    })
  }

  return (
    <div className="bg-slate-900 rounded-xl shadow-xl border border-slate-800 overflow-hidden flex flex-col my-8">
      {/* Offline Notice Banner */}
      {offlineMessage && (
        <div className="bg-amber-900/90 text-amber-200 px-4 py-2.5 text-xs font-semibold text-center border-b border-amber-700">
          {offlineMessage}
        </div>
      )}

      {/* Editor Header Bar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          
          {/* File Tabs */}
          <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
            <button
              onClick={() => setActiveTab("html")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                activeTab === "html"
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              index.html
            </button>
            <button
              onClick={() => setActiveTab("css")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                activeTab === "css"
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              styles.css
            </button>
            <button
              onClick={() => setActiveTab("js")}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                activeTab === "js"
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              script.js
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded transition border border-slate-800"
          >
            Reset
          </button>
          <button
            onClick={updatePreview}
            className="px-4 py-1.5 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-blue-300 rounded transition border border-slate-700 flex items-center gap-1.5 cursor-pointer"
          >
            <span>▶</span> Run Code
          </button>
        </div>
      </div>

      {/* Editor & Preview Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 min-h-[380px]">
        {/* Code Input Area */}
        <div className="flex flex-col bg-slate-900 p-4 relative">
          <div className="flex justify-between items-center text-xs text-slate-500 font-mono mb-2">
            <span>// {activeTab.toUpperCase()} EDITOR</span>
            <span className="text-emerald-500 text-[11px]">IndexedDB Auto-saved</span>
          </div>

          {activeTab === "html" && (
            <textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              placeholder="<!-- Write HTML here -->"
              className="w-full flex-1 min-h-[320px] bg-slate-950 text-slate-100 font-mono text-sm p-4 rounded-lg border border-slate-800 focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
              spellCheck={false}
            />
          )}

          {activeTab === "css" && (
            <textarea
              value={cssCode}
              onChange={(e) => setCssCode(e.target.value)}
              placeholder="/* Write CSS here */"
              className="w-full flex-1 min-h-[320px] bg-slate-950 text-slate-100 font-mono text-sm p-4 rounded-lg border border-slate-800 focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
              spellCheck={false}
            />
          )}

          {activeTab === "js" && (
            <textarea
              value={jsCode}
              onChange={(e) => setJsCode(e.target.value)}
              placeholder="// Write JavaScript here"
              className="w-full flex-1 min-h-[320px] bg-slate-950 text-slate-100 font-mono text-sm p-4 rounded-lg border border-slate-800 focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
              spellCheck={false}
            />
          )}
        </div>

        {/* Live Output Preview Area */}
        <div className="flex flex-col bg-slate-950 p-4">
          <div className="flex justify-between items-center text-xs text-slate-400 font-medium mb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Sandbox Preview
            </span>
            <span className="text-slate-600">iframe output</span>
          </div>

          <div className="w-full flex-1 min-h-[320px] bg-white rounded-lg overflow-hidden border border-slate-800 relative">
            <iframe
              srcDoc={srcDoc}
              title="Live Output Sandbox"
              sandbox="allow-scripts"
              className="w-full h-full border-none"
            />
          </div>
        </div>
      </div>

      {/* Editor Footer / Submit Bar */}
      <div className="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
        <div className="text-xs text-slate-400">
          💡 <span className="text-slate-300 font-medium">Pro-tip:</span> Test your code output above before completing the lesson!
        </div>

        <button
          onClick={handleComplete}
          disabled={isPending}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
        >
          {isPending ? (
            <span>Saving progress...</span>
          ) : (
            <>
              <span>{hasNextLesson ? "Complete & Next Lesson" : "Finish Course & Return Home"}</span>
              <span>&rarr;</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
