import React from "react"

interface AuthCardProps {
  children: React.ReactNode
  className?: string
}

export function AuthCard({ children, className = "" }: AuthCardProps) {
  return (
    <div className={`w-full max-w-md mx-auto space-y-6 ${className}`}>
      {children}
    </div>
  )
}
