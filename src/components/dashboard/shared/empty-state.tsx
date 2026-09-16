import React from "react"
import { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  title: string
  description: string
  icon: LucideIcon
  action?: React.ReactNode
}

export function EmptyState({ title, description, icon: Icon, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white border border-[#DDDCDB]/40 rounded-2xl">
      <div className="w-16 h-16 rounded-2xl bg-[#DDDCDB]/20 flex items-center justify-center mb-6 text-[#3C4044]/40">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-[#3C4044] mb-2">{title}</h3>
      <p className="text-[#3C4044]/60 max-w-sm mb-6 text-sm">{description}</p>
      {action && <div>{action}</div>}
    </div>
  )
}
