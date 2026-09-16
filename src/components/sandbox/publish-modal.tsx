"use client"

import { useState } from "react"

interface PublishModalProps {
  isOpen: boolean
  onClose: () => void
  onPublish: (title: string, description: string, reflection: string) => void
  isPublishing: boolean
  publishMessage: string | null
}

export function PublishModal({
  isOpen,
  onClose,
  onPublish,
  isPublishing,
  publishMessage
}: PublishModalProps) {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [reflection, setReflection] = useState("")

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onPublish(title, desc, reflection)
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#3C4044]/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#3C4044] border border-[#DDDCDB]/20 rounded-2xl w-full max-w-lg p-8 shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] space-y-6">
        <div className="flex items-center justify-between border-b border-[#DDDCDB]/10 pb-4">
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
            <span className="text-2xl">🚀</span> Publish to Portfolio
          </h3>
          <button
            onClick={onClose}
            className="text-[#DDDCDB]/60 hover:text-white transition w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-800"
          >
            ✕
          </button>
        </div>

        {publishMessage && (
          <div className="p-4 bg-[#FD7B41]/10 border border-[#FD7B41]/30 text-[#FD7B41] text-sm font-bold rounded-xl text-center">
            {publishMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-[#DDDCDB] mb-1.5 uppercase tracking-wide">Project Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. My Interactive Web Card"
              required
              className="w-full bg-slate-900 border border-[#DDDCDB]/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FD7B41] focus:ring-1 focus:ring-[#FD7B41]/50 transition-all shadow-inner"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#DDDCDB] mb-1.5 uppercase tracking-wide">Short Description</label>
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="e.g. Built using HTML and custom CSS styles."
              className="w-full bg-slate-900 border border-[#DDDCDB]/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FD7B41] focus:ring-1 focus:ring-[#FD7B41]/50 transition-all shadow-inner"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#DDDCDB] mb-1.5 uppercase tracking-wide">Reflection / Learnings</label>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Share a short reflection about how you built this project..."
              rows={3}
              className="w-full bg-slate-900 border border-[#DDDCDB]/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FD7B41] focus:ring-1 focus:ring-[#FD7B41]/50 transition-all shadow-inner leading-relaxed resize-none"
            />
          </div>

          <div className="flex items-center justify-end space-x-4 pt-4 border-t border-[#DDDCDB]/10">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-bold text-[#DDDCDB]/60 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPublishing}
              className="px-6 py-2.5 bg-gradient-to-r from-[#FD7B41] to-[#EDBF9B] hover:opacity-90 disabled:opacity-50 text-[#3C4044] font-extrabold text-sm rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              {isPublishing ? "Publishing..." : "Publish Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
