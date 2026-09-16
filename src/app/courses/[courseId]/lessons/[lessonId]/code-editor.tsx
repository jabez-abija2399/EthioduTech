"use client"

import { useState, useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import { completeLessonAction } from "@/lib/actions/progress"
import { getCodeDraft, saveCodeDraft, addPendingSync, saveLocalPublishedProject } from "@/lib/offline/db"
import { publishToPortfolioAction } from "@/lib/actions/portfolio"
import { validateCodeSubmission } from "@/lib/checker/code-checker"

// Sub-components
import { CodeTabs, TabType } from "@/components/sandbox/code-tabs"
import { EditorToolbar } from "@/components/sandbox/editor-toolbar"
import { EditorPanel } from "@/components/sandbox/editor-panel"
import { PreviewPanel } from "@/components/sandbox/preview-panel"
import { PublishModal } from "@/components/sandbox/publish-modal"
import { ValidationTray, CheckResult } from "@/components/sandbox/validation-tray"
import AiTutorDrawer from "./ai-tutor-drawer"

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
  
  // State
  const [activeTab, setActiveTab] = useState<TabType>("html")
  const [htmlCode, setHtmlCode] = useState(initialHtml)
  const [cssCode, setCssCode] = useState(initialCss)
  const [jsCode, setJsCode] = useState(initialJs)
  
  const [isPending, startTransition] = useTransition()
  const [isPublishing, startPublishTransition] = useTransition()
  const [offlineMessage, setOfflineMessage] = useState<string | null>(null)
  const [showAiTutor, setShowAiTutor] = useState(false)
  const [isCompletedOffline, setIsCompletedOffline] = useState(false)

  // Modals & Trays
  const [showPublishModal, setShowPublishModal] = useState(false)
  const [publishMessage, setPublishMessage] = useState<string | null>(null)
  const [checkResult, setCheckResult] = useState<CheckResult | null>(null)

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

  const handleReset = () => {
    setHtmlCode(initialHtml)
    setCssCode(initialCss)
    setJsCode(initialJs)
  }

  const handleCheckCode = () => {
    const res = validateCodeSubmission(htmlCode, cssCode, jsCode, lessonId)
    setCheckResult(res as CheckResult) // Ensure type matches the new interface
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
        setIsCompletedOffline(true)
        setOfflineMessage("⚡ Lesson Saved Offline! Your progress is stored locally in IndexedDB and will automatically sync when you reconnect to the internet.")
        return
      }

      const result = await completeLessonAction(courseId, lessonId)
      
      if (result?.error === "UNAUTHORIZED") {
        router.push("/login")
        return
      }

      if (result?.success) {
        if (result.nextLessonId) {
          router.push(`/courses/${courseId}/lessons/${result.nextLessonId}`)
        } else {
          router.push("/dashboard")
        }
      }
    })
  }

  const handlePublishSubmit = (title: string, desc: string, reflection: string) => {
    // Save project locally immediately
    const bundledContent = JSON.stringify({ html: htmlCode, css: cssCode, js: jsCode })
    saveLocalPublishedProject({
      id: `local-${Date.now()}`,
      title,
      description: desc || "Interactive Web Project built on Edutech.",
      url: bundledContent,
      reflection: reflection || "Built as part of interactive web development practice.",
      createdAt: Date.now()
    })

    startPublishTransition(async () => {
      try {
        const result = await publishToPortfolioAction({
          title,
          description: desc,
          htmlCode,
          cssCode,
          jsCode,
          reflection
        })
        if (result?.error) {
          setPublishMessage(`Error: ${result.error}`)
        } else if (result?.success) {
          setPublishMessage("🎉 Project published to your Portfolio successfully!")
          setTimeout(() => {
            setShowPublishModal(false)
            setPublishMessage(null)
          }, 1500)
        }
      } catch (err: any) {
        setPublishMessage(`Error: ${err.message || "Failed to publish"}`)
      }
    })
  }

  return (
    <div className="bg-[#3C4044] rounded-2xl shadow-2xl border border-[#DDDCDB]/10 overflow-hidden flex flex-col my-8 relative">
      {/* Offline Notice Banner */}
      {offlineMessage && (
        <div className="bg-[#FD7B41]/20 text-[#FD7B41] px-4 py-2.5 text-xs font-bold text-center border-b border-[#FD7B41]/30">
          {offlineMessage}
        </div>
      )}

      {/* Editor Header Bar */}
      <div className="bg-slate-900/80 px-5 py-4 border-b border-[#DDDCDB]/10 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex space-x-1.5 mr-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          
          <CodeTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        <EditorToolbar 
          onRunCode={() => { /* Not strictly needed anymore since PreviewPanel is debounced and auto-updates */ }}
          onAskAi={() => setShowAiTutor(true)}
          onCheckCode={handleCheckCode}
          onPublish={() => setShowPublishModal(true)}
          onReset={handleReset}
        />
      </div>

      {/* Editor & Preview Split Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#DDDCDB]/10 min-h-[400px]">
        {/* Code Input Area */}
        <EditorPanel 
          activeTab={activeTab}
          htmlValue={htmlCode}
          cssValue={cssCode}
          jsValue={jsCode}
          onChangeHtml={setHtmlCode}
          onChangeCss={setCssCode}
          onChangeJs={setJsCode}
        />

        {/* Live Output Preview Area */}
        <PreviewPanel 
          html={htmlCode}
          css={cssCode}
          js={jsCode}
        />
      </div>

      {/* Code Validation Check Results Tray */}
      <ValidationTray result={checkResult} />

      {/* Editor Footer / Submit Bar */}
      <div className="bg-slate-900/80 px-6 py-4 border-t border-[#DDDCDB]/10 flex items-center justify-between flex-wrap gap-4">
        <div className="text-xs text-[#DDDCDB]/60">
          💡 <span className="text-[#DDDCDB] font-bold">Pro-tip:</span> Test your code output above before completing the lesson!
        </div>

        <button
          onClick={handleComplete}
          disabled={isPending}
          className={`px-6 py-3 disabled:opacity-50 font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5 ${
            isCompletedOffline
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/30"
              : "bg-gradient-to-r from-[#FD7B41] to-[#EDBF9B] text-[#3C4044] hover:opacity-90"
          }`}
        >
          {isPending ? (
            <span>Saving progress...</span>
          ) : isCompletedOffline ? (
            <span>✓ Saved Offline (Will Sync Online)</span>
          ) : (
            <>
              <span>{hasNextLesson ? "Complete & Next Lesson" : "Finish Course & Return Home"}</span>
              <span>&rarr;</span>
            </>
          )}
        </button>
      </div>

      {/* Publish Modal */}
      <PublishModal 
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        onPublish={handlePublishSubmit}
        isPublishing={isPublishing}
        publishMessage={publishMessage}
      />

      {/* AI Tutor Drawer */}
      <AiTutorDrawer
        lessonId={lessonId}
        isOpen={showAiTutor}
        onClose={() => setShowAiTutor(false)}
        codeContext={{ html: htmlCode, css: cssCode, js: jsCode }}
      />
    </div>
  )
}

