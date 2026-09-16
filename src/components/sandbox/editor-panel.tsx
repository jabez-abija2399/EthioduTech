"use client"

import { useState, useEffect } from "react"
import { TabType } from "./code-tabs"

interface EditorPanelProps {
  activeTab: TabType
  htmlValue: string
  cssValue: string
  jsValue: string
  onChangeHtml: (val: string) => void
  onChangeCss: (val: string) => void
  onChangeJs: (val: string) => void
}

export function EditorPanel({
  activeTab,
  htmlValue,
  cssValue,
  jsValue,
  onChangeHtml,
  onChangeCss,
  onChangeJs
}: EditorPanelProps) {
  // We keep local state for instant typing feel (no React reconciliation lag on the whole page)
  const [localHtml, setLocalHtml] = useState(htmlValue)
  const [localCss, setLocalCss] = useState(cssValue)
  const [localJs, setLocalJs] = useState(jsValue)

  // Sync external changes (like Reset or DB load) into local state
  useEffect(() => { setLocalHtml(htmlValue) }, [htmlValue])
  useEffect(() => { setLocalCss(cssValue) }, [cssValue])
  useEffect(() => { setLocalJs(jsValue) }, [jsValue])

  // Debounce the update back to the parent to prevent freezing the browser
  useEffect(() => {
    const handler = setTimeout(() => onChangeHtml(localHtml), 300)
    return () => clearTimeout(handler)
  }, [localHtml, onChangeHtml])

  useEffect(() => {
    const handler = setTimeout(() => onChangeCss(localCss), 300)
    return () => clearTimeout(handler)
  }, [localCss, onChangeCss])

  useEffect(() => {
    const handler = setTimeout(() => onChangeJs(localJs), 300)
    return () => clearTimeout(handler)
  }, [localJs, onChangeJs])

  return (
    <div className="flex flex-col bg-[#3C4044] p-4 relative h-full min-h-[400px]">
      <div className="flex justify-between items-center text-xs text-[#DDDCDB]/60 font-mono mb-3">
        <span>// {activeTab.toUpperCase()} EDITOR</span>
        <span className="text-emerald-400 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          Auto-saving
        </span>
      </div>

      <textarea
        value={activeTab === "html" ? localHtml : activeTab === "css" ? localCss : localJs}
        onChange={(e) => {
          if (activeTab === "html") setLocalHtml(e.target.value)
          if (activeTab === "css") setLocalCss(e.target.value)
          if (activeTab === "js") setLocalJs(e.target.value)
        }}
        placeholder={
          activeTab === "html" ? "<!-- Write HTML here -->" :
          activeTab === "css" ? "/* Write CSS here */" :
          "// Write JavaScript here"
        }
        className="w-full flex-1 bg-slate-900/80 text-[#DDDCDB] font-mono text-sm p-5 rounded-xl border border-[#DDDCDB]/10 focus:outline-none focus:border-[#FD7B41]/50 focus:ring-1 focus:ring-[#FD7B41]/30 resize-none leading-relaxed transition-all shadow-inner"
        spellCheck={false}
      />
    </div>
  )
}
