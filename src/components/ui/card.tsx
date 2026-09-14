"use client"

import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'bordered'
}

export function Card({ children, variant = 'default', className = '', ...props }: CardProps) {
  const variantStyles = {
    default: 'bg-white border border-slate-200/80 shadow-xs text-slate-900',
    glass: 'bg-slate-900/90 border border-slate-800 backdrop-blur-xl text-white shadow-xl',
    bordered: 'bg-slate-50 border border-slate-200 text-slate-900'
  }

  return (
    <div className={`rounded-2xl p-6 transition-all duration-200 ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`mb-4 pb-3 border-b border-slate-200/80 flex items-center justify-between ${className}`}>{children}</div>
}

export function CardTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`font-extrabold text-lg tracking-tight ${className}`}>{children}</h3>
}

export function CardDescription({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-xs text-slate-500 mt-0.5 leading-relaxed ${className}`}>{children}</p>
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`space-y-3 ${className}`}>{children}</div>
}
