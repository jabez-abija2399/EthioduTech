"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Search, ExternalLink, Eye, X, BookOpen, Rocket } from 'lucide-react'

export interface RosterStudent {
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

export function TeacherRosterClient({ students }: { students: RosterStudent[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStudent, setSelectedStudent] = useState<RosterStudent | null>(null)
  const [previewProject, setPreviewProject] = useState<{
    title: string
    codeBundle: { html: string; css: string; js: string }
    reflection?: string
  } | null>(null)

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.user.profile?.firstName || ''} ${student.user.profile?.lastName || ''}`.toLowerCase()
    const email = (student.user.email || '').toLowerCase()
    const q = searchQuery.toLowerCase()
    return fullName.includes(q) || email.includes(q)
  })

  const openPreview = (student: RosterStudent) => {
    setSelectedStudent(student)
    const project = student.portfolios?.[0]?.projects?.[0]
    if (project && project.url) {
      try {
        const bundle = JSON.parse(project.url)
        setPreviewProject({
          title: project.project.title,
          codeBundle: bundle,
          reflection: project.reflection || undefined
        })
      } catch {
        setPreviewProject(null)
      }
    } else {
      setPreviewProject(null)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Table Header & Search Input */}
      <div className="p-6 border-b border-slate-200 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Student Roster</h2>
          <p className="text-xs text-slate-500 mt-0.5">Individual learning progress and project showcases</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email..."
              className="pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl w-64 focus:outline-none focus:border-blue-500 focus:bg-white transition"
            />
          </div>

          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200">
            {filteredStudents.length} of {students.length} Student(s)
          </span>
        </div>
      </div>

      {filteredStudents.length === 0 ? (
        <div className="p-12 text-center text-slate-500 text-xs">
          No students match your search filter "{searchQuery}".
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                <th className="p-4 pl-6">Student Name</th>
                <th className="p-4">Email Address</th>
                <th className="p-4">Lessons Completed</th>
                <th className="p-4">Published Projects</th>
                <th className="p-4 text-right pr-6">Quick Preview & Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredStudents.map((student) => {
                const fullName = `${student.user.profile?.firstName || "Student"} ${student.user.profile?.lastName || ""}`.trim()
                const completedCount = student.progress.length
                const projectCount = student.portfolios?.[0]?.projects?.length || 0

                return (
                  <tr key={student.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-4 pl-6 font-bold text-slate-900 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                        {fullName.charAt(0)}
                      </div>
                      <span>{fullName}</span>
                    </td>
                    <td className="p-4 text-slate-600 text-xs font-mono">{student.user.email}</td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900 text-xs">{completedCount}</span>
                        <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-emerald-500 h-full rounded-full"
                            style={{ width: `${Math.min(completedCount * 33, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-bold text-indigo-600 text-xs">{projectCount} Project(s)</td>
                    <td className="p-4 text-right pr-6 space-x-2">
                      {projectCount > 0 && (
                        <button
                          onClick={() => openPreview(student)}
                          className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg transition inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Quick Preview</span>
                        </button>
                      )}

                      <Link
                        href={`/portfolio/${student.id}`}
                        className="px-3.5 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-lg transition inline-flex items-center gap-1"
                      >
                        <span>Full Portfolio</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Quick Preview Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl p-6 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-indigo-400" />
                  <span>Student Project Preview</span>
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedStudent.user.profile?.firstName} {selectedStudent.user.profile?.lastName}
                </p>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {previewProject ? (
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h4 className="font-extrabold text-sm text-blue-400 mb-1">{previewProject.title}</h4>
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
                      title="Quick Preview Sandbox"
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
