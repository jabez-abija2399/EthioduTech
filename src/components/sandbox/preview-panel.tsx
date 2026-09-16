"use client"

import { useMemo } from "react"
import { useDebounce } from "@/hooks/use-debounce"
import { MonitorPlay } from "lucide-react"

interface PreviewPanelProps {
  html: string
  css: string
  js: string
}

export function PreviewPanel({ html, css, js }: PreviewPanelProps) {
  // We debounce the raw props before compiling the document string.
  // This means if a user types fast, the iframe isn't constantly reloading and stealing focus/CPU.
  const debouncedHtml = useDebounce(html, 1000)
  const debouncedCss = useDebounce(css, 1000)
  const debouncedJs = useDebounce(js, 1000)

  const srcDoc = useMemo(() => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>${debouncedCss}</style>
      </head>
      <body>
        ${debouncedHtml}
        <script>
          try {
            ${debouncedJs}
          } catch (err) {
            console.error(err);
          }
        </script>
      </body>
      </html>
    `
  }, [debouncedHtml, debouncedCss, debouncedJs])

  return (
    <div className="flex flex-col bg-slate-900/50 p-4 h-full min-h-[400px]">
      <div className="flex justify-between items-center text-xs text-[#DDDCDB]/60 font-medium mb-3">
        <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#FD7B41]">
          <MonitorPlay className="w-4 h-4" />
          Live Output
        </span>
        <span className="text-[#DDDCDB]/40">iframe</span>
      </div>

      <div className="w-full flex-1 bg-white rounded-xl overflow-hidden border border-[#DDDCDB]/10 shadow-inner relative">
        <iframe
          srcDoc={srcDoc}
          title="Live Sandbox Preview"
          sandbox="allow-scripts"
          className="w-full h-full border-none"
        />
      </div>
    </div>
  )
}
