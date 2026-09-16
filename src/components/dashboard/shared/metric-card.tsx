import React from "react"
import { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  color?: "default" | "brand" | "warm" | "success" | "danger" | "warning"
}

export function MetricCard({ title, value, subtitle, icon: Icon, color = "default" }: MetricCardProps) {
  const colorStyles = {
    default: {
      bg: "bg-white",
      border: "border-[#DDDCDB]/40",
      iconBg: "bg-[#3C4044]/5",
      iconColor: "text-[#3C4044]",
      valueColor: "text-[#3C4044]"
    },
    brand: {
      bg: "bg-white",
      border: "border-[#FD7B41]/20",
      iconBg: "bg-[#FD7B41]/10",
      iconColor: "text-[#FD7B41]",
      valueColor: "text-[#FD7B41]"
    },
    warm: {
      bg: "bg-white",
      border: "border-[#EDBF9B]/30",
      iconBg: "bg-[#EDBF9B]/20",
      iconColor: "text-[#EDBF9B]",
      valueColor: "text-[#EDBF9B]"
    },
    success: {
      bg: "bg-white",
      border: "border-emerald-500/20",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
      valueColor: "text-emerald-500"
    },
    danger: {
      bg: "bg-white",
      border: "border-red-500/20",
      iconBg: "bg-red-500/10",
      iconColor: "text-red-500",
      valueColor: "text-red-500"
    },
    warning: {
      bg: "bg-white",
      border: "border-amber-500/20",
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-500",
      valueColor: "text-amber-500"
    }
  }

  const style = colorStyles[color]

  return (
    <div className={`p-6 rounded-2xl border ${style.bg} ${style.border} shadow-sm flex items-center justify-between`}>
      <div>
        <div className="text-xs font-bold text-[#3C4044]/60 uppercase tracking-wider">{title}</div>
        <div className={`text-3xl font-black mt-1 ${style.valueColor}`}>{value}</div>
        {subtitle && <div className="text-[11px] text-[#3C4044]/50 mt-1">{subtitle}</div>}
      </div>
      <div className={`p-3 rounded-xl ${style.iconBg} ${style.iconColor}`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  )
}
