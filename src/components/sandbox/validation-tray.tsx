"use client"

import { CheckCircle2, AlertCircle } from "lucide-react"

interface Assertion {
  name: string
  passed: boolean
}

export interface CheckResult {
  isPassed: boolean
  score: number
  total: number
  assertions: Assertion[]
}

interface ValidationTrayProps {
  result: CheckResult | null
}

export function ValidationTray({ result }: ValidationTrayProps) {
  if (!result) return null

  return (
    <div className={`px-6 py-4 border-t flex items-center justify-between flex-wrap gap-4 transition-all ${
      result.isPassed
        ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-200'
        : 'bg-amber-950/40 border-amber-500/20 text-amber-200'
    }`}>
      <div className="flex items-center gap-3">
        {result.isPassed ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        ) : (
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
        )}
        <span className="font-bold text-sm">
          Automated Verification: {result.score} of {result.total} assertions passed
        </span>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {result.assertions.map((a, idx) => (
          <span key={idx} className={`px-3 py-1 rounded-full text-xs font-bold border shadow-sm ${
            a.passed 
              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' 
              : 'bg-red-500/10 text-red-300 border-red-500/30'
          }`}>
            {a.passed ? '✓' : '✗'} {a.name}
          </span>
        ))}
      </div>
    </div>
  )
}
