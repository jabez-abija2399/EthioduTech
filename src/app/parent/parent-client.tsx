"use client"

import { useState } from "react"
import { ChevronDown, Sparkles, Clock, FolderKanban } from "lucide-react"
import Link from "next/link"
import { StatusBadge } from "@/components/dashboard/shared/status-badge"
import { MetricCard } from "@/components/dashboard/shared/metric-card"

export function ParentClient({ children }: { children: any[] }) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  
  if (!children || children.length === 0) return null
  
  const activeChild = children[selectedIdx]
  const portfolioProjects = activeChild.portfolios?.flatMap((p: any) => p.projects || []) || []
  const completedLessons = activeChild.progress || []
  const progressPct = Math.min(100, Math.round((completedLessons.length / 10) * 100))

  return (
    <div className="space-y-8">
      {/* Child Switcher */}
      {children.length > 1 && (
        <div className="flex items-center gap-4 border-b border-[#DDDCDB]/20 pb-4">
          <span className="text-sm font-bold text-[#3C4044]/60 uppercase tracking-widest">Viewing:</span>
          <div className="relative">
            <select 
              value={selectedIdx}
              onChange={(e) => setSelectedIdx(Number(e.target.value))}
              className="appearance-none bg-white border border-[#DDDCDB]/40 rounded-xl px-4 py-2 pr-10 text-sm font-bold text-[#3C4044] focus:outline-none focus:border-[#FD7B41] cursor-pointer shadow-sm"
            >
              {children.map((c, i) => (
                <option key={c.id} value={i}>{c.user?.name || "Student"}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#3C4044]/40 pointer-events-none" />
          </div>
        </div>
      )}

      {/* Progress Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#DDDCDB]/40 shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-[#3C4044]/60 uppercase tracking-wider mb-2">Current Path</div>
            <div className="text-xl font-bold text-[#3C4044] mb-1">Web Development</div>
            <div className="text-sm text-[#3C4044]/60 mb-4">Module 3: Styling</div>
          </div>
          <div>
            <div className="flex justify-between text-sm font-bold mb-1">
              <span className="text-[#3C4044]">{progressPct}%</span>
            </div>
            <div className="w-full h-2 bg-[#DDDCDB]/30 rounded-full">
              <div className="h-full bg-[#FD7B41] rounded-full" style={{ width: `${progressPct}%` }}></div>
            </div>
          </div>
        </div>

        <MetricCard 
          title="Projects Built"
          value={portfolioProjects.length || 0}
          subtitle="Added to live portfolio"
          icon={FolderKanban}
          color="brand"
        />

        <MetricCard 
          title="Skills Developing"
          value={4}
          subtitle="HTML, CSS, Logic"
          icon={Sparkles}
          color="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Col: Activity and Insights */}
        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-bold text-[#3C4044] mb-4">Parent Insights</h2>
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 shadow-sm">
              <p className="text-sm text-[#3C4044]/80 leading-relaxed">
                This month, {activeChild.user?.name?.split(" ")[0] || "your child"} completed {completedLessons.length} lessons and improved in CSS layout structures. The instructor suggested practicing CSS Grid before moving to the next module.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[#3C4044] mb-4">Recent Activity</h2>
            <div className="bg-white rounded-2xl border border-[#DDDCDB]/40 shadow-sm overflow-hidden">
              <div className="divide-y divide-[#DDDCDB]/20">
                <div className="p-4 flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#3C4044]/50 uppercase mb-0.5">Completed</div>
                    <div className="text-sm font-bold text-[#3C4044]">CSS Selectors Practice</div>
                    <div className="text-xs text-[#3C4044]/50 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Yesterday
                    </div>
                  </div>
                </div>

                <div className="p-4 flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FD7B41]/10 flex items-center justify-center text-[#FD7B41] shrink-0">
                    <FolderKanban className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#3C4044]/50 uppercase mb-0.5">Built</div>
                    <div className="text-sm font-bold text-[#3C4044]">Personal Portfolio Structure</div>
                    <div className="text-xs text-[#3C4044]/50 mt-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 2 days ago
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Col: Skills & Projects */}
        <div className="space-y-8">
          
          <section>
            <h2 className="text-lg font-bold text-[#3C4044] mb-4">Currently Developing</h2>
            <div className="bg-white rounded-2xl border border-[#DDDCDB]/40 shadow-sm p-2">
              <div className="flex justify-between items-center p-3 hover:bg-[#f8f9fa] rounded-xl transition">
                <span className="font-bold text-sm text-[#3C4044]">HTML Structuring</span>
                <StatusBadge status="success">Confident</StatusBadge>
              </div>
              <div className="flex justify-between items-center p-3 hover:bg-[#f8f9fa] rounded-xl transition">
                <span className="font-bold text-sm text-[#3C4044]">Problem Solving</span>
                <StatusBadge status="info">Developing</StatusBadge>
              </div>
              <div className="flex justify-between items-center p-3 hover:bg-[#f8f9fa] rounded-xl transition">
                <span className="font-bold text-sm text-[#3C4044]">CSS Layouts</span>
                <StatusBadge status="warning">Developing</StatusBadge>
              </div>
              <div className="flex justify-between items-center p-3 hover:bg-[#f8f9fa] rounded-xl transition">
                <span className="font-bold text-sm text-[#3C4044]">JavaScript Logics</span>
                <StatusBadge status="neutral">Starting</StatusBadge>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#3C4044]">Portfolio Projects</h2>
              <Link href={`/portfolio/${activeChild.userId}`} className="text-sm font-bold text-[#FD7B41]">
                View live
              </Link>
            </div>
            
            <div className="bg-white rounded-2xl border border-[#DDDCDB]/40 shadow-sm overflow-hidden">
              {portfolioProjects.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-12 h-12 rounded-xl bg-[#DDDCDB]/20 text-[#3C4044]/40 mx-auto flex items-center justify-center mb-3">
                    <FolderKanban className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-[#3C4044]">No projects published yet</p>
                  <p className="text-xs text-[#3C4044]/60 mt-1">Projects will appear here when completed.</p>
                </div>
              ) : (
                <div className="divide-y divide-[#DDDCDB]/20">
                  {portfolioProjects.map((p: any) => (
                    <div key={p.id} className="p-4 hover:bg-[#f8f9fa] transition">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-sm text-[#3C4044]">{p.project.title}</h4>
                        <span className="text-xs font-bold text-emerald-600">Complete</span>
                      </div>
                      <p className="text-xs text-[#3C4044]/60 line-clamp-2">{p.project.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

        </div>
      </div>

    </div>
  )
}
