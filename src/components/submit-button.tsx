"use client"

import React from "react"
import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"

export function SubmitButton({
  children,
  loadingText = "Processing...",
  className = "",
}: {
  children: React.ReactNode
  loadingText?: string
  className?: string
}) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full flex items-center justify-center py-3 px-4 rounded-xl shadow-md text-sm font-bold text-white transition disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer ${className}`}
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{loadingText}</span>
        </span>
      ) : (
        children
      )}
    </button>
  )
}
