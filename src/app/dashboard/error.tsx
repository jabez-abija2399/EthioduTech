"use client"

import React, { useEffect } from 'react'
import Navbar from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { AlertCircle, RotateCcw } from 'lucide-react'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Dashboard error caught by boundary:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <main className="max-w-xl mx-auto p-6 md:p-12 text-center my-12">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>

          <h2 className="text-xl font-bold text-slate-900">Dashboard Failed to Load</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            {error.message || "An unexpected error occurred while fetching dashboard data."}
          </p>

          <Button onClick={() => reset()} variant="primary" size="md" leftIcon={<RotateCcw className="w-4 h-4" />}>
            Try Again
          </Button>
        </div>
      </main>
    </div>
  )
}
