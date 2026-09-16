"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Eye, ExternalLink, X, Rocket, Award, CheckCircle } from 'lucide-react'

export interface ParentChild {
  id: string
  user: {
    email: string | null
    profile: {
      firstName: string
      lastName: string
    } | null
  }
  progress: any[]
  portfolios: Array<{
    id: string
    projects: Array<{
      id: string
      url: string | null
      reflection: string | null
      project: {
        title: string
        description: string
      }
    }>
  }>
}

export function ParentClient({ children }: { children: ParentChild[] }) {
  const [selectedChild, setSelectedChild] = useState<ParentChild | null>(null)
  const [previewProject, setPreviewProject] = useState<{
    title: string
    codeBundle: { html: string; css: string; js: string }
    reflection?: string
  } | null>(null)

  const openPreview = (child: ParentChild, projectItem: any) => {
    setSelectedChild(child)
    if (projectItem && projectItem.url) {
      try {
        const bundle = JSON.parse(projectItem.url)
        setPreviewProject({
          title: projectItem.project.title,
          codeBundle: bundle,
          reflection: projectItem.reflection || undefined,
        })
      } catch {
        setPreviewProject(null)
      }
    } else {
      setPreviewProject(null)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {children.map((child) => {
          const childName = `${child.user.profile?.firstName || "Child"} ${child.user.profile?.lastName || ""}`.trim()
          const completedCount = child.progress.length
          const projects = child.portfolios?.[0]?.projects || []

          return (
            <div key={child.id} className="bg-[#3C4044] rounded-2xl shadow-sm border border-[#DDDCDB]/10 overflow-hidden flex flex-col justify-between hover:border-[#FD7B41]/50 transition">
              <div className="p-6 border-b border-[#DDDCDB]/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FD7B41] to-[#EDBF9B] text-[#3C4044] font-extrabold text-lg flex items-center justify-center shadow-md shadow-[#FD7B41]/20">
                      {childName.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">{childName}</h2>
                      <p className="text-xs text-[#DDDCDB]/60">{child.user.email}</p>
                    </div>
                  </div>

                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30">
                    Active Student
                  </span>
                </div>

                <div className="space-y-4 pt-2">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-[#DDDCDB]/70 mb-1.5">
                      <span>Web Creator Course Progress</span>
                      <span className="text-[#FD7B41]">{completedCount} Lessons Finished</span>
                    </div>
                    <div className="w-full bg-slate-900 border border-[#DDDCDB]/10 h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-[#FD7B41] h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(completedCount * 33, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <h3 className="text-xs font-bold text-[#DDDCDB]/50 uppercase tracking-wider mb-2">Portfolio Projects ({projects.length})</h3>
                    {projects.length === 0 ? (
                      <p className="text-xs text-[#DDDCDB]/40 italic">No published projects yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {projects.map((proj) => (
                          <div key={proj.id} className="p-3 bg-slate-900/50 border border-[#DDDCDB]/10 rounded-xl flex items-center justify-between text-xs hover:border-emerald-400/50 transition">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-emerald-400" />
                              <span className="font-bold text-white">{proj.project.title}</span>
                            </div>

                            <button
                              onClick={() => openPreview(child, proj)}
                              className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg transition inline-flex items-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>Live Preview</span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-900/30 border-t border-[#DDDCDB]/10 flex items-center justify-between">
                <span className="text-xs text-[#DDDCDB]/60 flex items-center gap-1">
                  <Award className="w-4 h-4 text-[#EDBF9B]" />
                  Verified Parent View
                </span>
                <Link
                  href={`/portfolio/${child.id}`}
                  className="px-4 py-2 bg-[#FD7B41] hover:bg-[#FD7B41]/90 text-white font-bold text-xs rounded-xl shadow transition inline-flex items-center gap-1.5"
                >
                  <span>View Public Showcase</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Preview Modal */}
      {selectedChild && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-emerald-400" />
                  <span>Child Project Live Preview</span>
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedChild.user.profile?.firstName} {selectedChild.user.profile?.lastName}
                </p>
              </div>
              <button
                onClick={() => setSelectedChild(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {previewProject ? (
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-extrabold text-sm text-emerald-400 mb-1">{previewProject.title}</h4>
                  {previewProject.reflection && (
                    <p className="text-xs text-slate-300 italic mb-3">"{previewProject.reflection}"</p>
                  )}

                  <div className="w-full h-64 bg-white rounded-lg overflow-hidden border border-slate-800">
                    <iframe
                      srcDoc={`
                        <!DOCTYPE html>
                        <html>
                          <head><style>${previewProject.codeBundle.css}</style></head>
                          <body>${previewProject.codeBundle.html}<script>${previewProject.codeBundle.js}</script></body>
                        </html>
                      `}
                      title="Child Project Live Preview"
                      sandbox="allow-scripts"
                      className="w-full h-full border-none"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs">
                No project code bundle available for preview.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
