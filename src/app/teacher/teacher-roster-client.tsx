"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, MoreVertical, MessageSquare } from "lucide-react"

export function TeacherRosterClient({ students }: { students: any[] }) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStudents = students.filter(student => {
    const fullName = student.user?.name || "Unknown Learner"
    const email = student.user?.email || ""
    return fullName.toLowerCase().includes(searchTerm.toLowerCase()) || email.toLowerCase().includes(searchTerm.toLowerCase())
  })

  return (
    <div className="bg-white rounded-2xl border border-[#DDDCDB]/40 shadow-sm overflow-hidden">
      
      {/* Table Toolbar */}
      <div className="p-4 border-b border-[#DDDCDB]/20 flex items-center justify-between bg-[#f8f9fa]">
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-[#3C4044]/40" />
          </div>
          <input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-[#DDDCDB]/40 rounded-xl leading-5 bg-white placeholder-[#3C4044]/40 focus:outline-none focus:border-[#FD7B41] focus:ring-1 focus:ring-[#FD7B41] text-sm text-[#3C4044] transition-colors"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#f8f9fa] border-b border-[#DDDCDB]/20 text-xs font-bold text-[#3C4044]/60 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Course Progress</th>
              <th className="px-6 py-4">Mastery</th>
              <th className="px-6 py-4">Pending Work</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DDDCDB]/10 bg-white">
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[#3C4044]/50">
                  No students found matching your search.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => {
                const fullName = student.user?.name || "Unknown Learner"
                const email = student.user?.email || ""
                const completedCount = student.completedLessons?.length || 0
                const progressPct = Math.min(100, Math.round((completedCount / 10) * 100))
                const projects = student.portfolios?.[0]?.projects || []

                return (
                  <tr key={student.id} className="hover:bg-[#f8f9fa] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#EDBF9B]/20 text-[#EDBF9B] flex items-center justify-center font-bold text-xs shrink-0">
                          {fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-[#3C4044]">{fullName}</div>
                          <div className="text-xs text-[#3C4044]/50">{email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-32">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[#3C4044]/70 font-medium">Foundations</span>
                          <span className="text-[#3C4044] font-bold">{progressPct}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#DDDCDB]/30 rounded-full">
                          <div className="h-full bg-[#3C4044] rounded-full" style={{ width: `${progressPct}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-1 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-xs font-bold rounded-md">
                        Doing well
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs font-bold text-[#FD7B41]">{projects.length} Projects</div>
                      <div className="text-[10px] text-[#3C4044]/50">Needs review</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-[#3C4044]/40 hover:text-[#FD7B41] hover:bg-[#FD7B41]/10 rounded-lg transition" title="Message">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        <Link href={`/portfolio/${student.userId}`} className="p-2 text-[#3C4044]/40 hover:text-[#3C4044] hover:bg-[#DDDCDB]/20 rounded-lg transition" title="View Portfolio">
                          <MoreVertical className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
