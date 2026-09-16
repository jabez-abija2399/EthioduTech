"use client"

import { FileCode, FileType, FileJson } from "lucide-react"

export type TabType = "html" | "css" | "js"

interface CodeTabsProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export function CodeTabs({ activeTab, onTabChange }: CodeTabsProps) {
  return (
    <div className="flex bg-[#3C4044] rounded-lg p-1 border border-[#DDDCDB]/10 shadow-inner">
      <button
        onClick={() => onTabChange("html")}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition ${
          activeTab === "html"
            ? "bg-slate-800 text-[#FD7B41] shadow-sm border border-[#FD7B41]/20"
            : "text-[#DDDCDB]/60 hover:text-[#DDDCDB] hover:bg-slate-800/50"
        }`}
      >
        <FileCode className="w-3.5 h-3.5" />
        index.html
      </button>
      <button
        onClick={() => onTabChange("css")}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition ${
          activeTab === "css"
            ? "bg-slate-800 text-[#EDBF9B] shadow-sm border border-[#EDBF9B]/20"
            : "text-[#DDDCDB]/60 hover:text-[#DDDCDB] hover:bg-slate-800/50"
        }`}
      >
        <FileType className="w-3.5 h-3.5" />
        styles.css
      </button>
      <button
        onClick={() => onTabChange("js")}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md transition ${
          activeTab === "js"
            ? "bg-slate-800 text-yellow-400 shadow-sm border border-yellow-400/20"
            : "text-[#DDDCDB]/60 hover:text-[#DDDCDB] hover:bg-slate-800/50"
        }`}
      >
        <FileJson className="w-3.5 h-3.5" />
        script.js
      </button>
    </div>
  )
}
