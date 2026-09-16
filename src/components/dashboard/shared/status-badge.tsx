import React from "react"

interface StatusBadgeProps {
  status: "success" | "warning" | "danger" | "info" | "neutral"
  children: React.ReactNode
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  const styles = {
    success: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    danger: "bg-red-500/10 text-red-600 border-red-500/20",
    info: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    neutral: "bg-[#DDDCDB]/20 text-[#3C4044] border-[#DDDCDB]/40"
  }

  return (
    <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${styles[status]}`}>
      {children}
    </span>
  )
}
