"use client"

import { Play, RotateCcw, Sparkles, UploadCloud, CheckCircle2 } from "lucide-react"

interface EditorToolbarProps {
  onRunCode: () => void
  onAskAi: () => void
  onCheckCode: () => void
  onPublish: () => void
  onReset: () => void
}

export function EditorToolbar({
  onRunCode,
  onAskAi,
  onCheckCode,
  onPublish,
  onReset
}: EditorToolbarProps) {
  return (
    <div className="flex items-center gap-2.5 flex-wrap">
      <button
        onClick={onAskAi}
        className="px-3 py-1.5 text-xs font-bold bg-[#EDBF9B]/10 hover:bg-[#EDBF9B]/20 text-[#EDBF9B] border border-[#EDBF9B]/20 rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-sm"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Ask AI Tutor</span>
      </button>

      <button
        onClick={onCheckCode}
        className="px-3 py-1.5 text-xs font-bold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-sm"
      >
        <CheckCircle2 className="w-3.5 h-3.5" />
        <span>Auto-Check Code</span>
      </button>

      <button
        onClick={onPublish}
        className="px-3 py-1.5 text-xs font-bold bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 rounded-lg transition flex items-center gap-1.5 cursor-pointer shadow-sm"
      >
        <UploadCloud className="w-3.5 h-3.5" />
        <span>Publish to Portfolio</span>
      </button>

      <div className="w-px h-5 bg-[#DDDCDB]/10 mx-1"></div>

      <button
        onClick={onReset}
        className="px-2.5 py-1.5 text-xs font-medium text-[#DDDCDB]/60 hover:text-white hover:bg-slate-800 rounded-lg transition flex items-center gap-1 cursor-pointer"
        title="Reset to default code"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={onRunCode}
        className="px-4 py-1.5 text-xs font-bold bg-[#FD7B41] hover:bg-[#FD7B41]/90 text-white rounded-lg transition shadow-md hover:shadow-lg flex items-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5"
      >
        <Play className="w-3.5 h-3.5 fill-current" />
        <span>Run Code</span>
      </button>
    </div>
  )
}
