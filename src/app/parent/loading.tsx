import React from 'react'

export default function ParentLoading() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans animate-pulse">
      <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
        <div className="h-8 w-32 bg-slate-200 rounded-lg"></div>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-8">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-slate-200 rounded-lg"></div>
          <div className="h-4 w-40 bg-slate-200 rounded-md"></div>
        </div>

        <div className="h-32 bg-slate-200 rounded-2xl"></div>
        <div className="h-80 bg-slate-200 rounded-2xl"></div>
      </div>
    </div>
  )
}
