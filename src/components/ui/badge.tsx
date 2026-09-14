"use client"

import React from 'react'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'amber' | 'emerald' | 'blue' | 'slate' | 'purple' | 'red'
  icon?: React.ReactNode
}

export function Badge({ children, variant = 'blue', icon, className = '', ...props }: BadgeProps) {
  const variantStyles = {
    amber: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    slate: 'bg-slate-800 text-slate-300 border-slate-700',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    red: 'bg-red-500/10 text-red-400 border-red-500/20'
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border tracking-wide uppercase ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </span>
  )
}
