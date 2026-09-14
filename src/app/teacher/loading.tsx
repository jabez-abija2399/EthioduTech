import React from 'react'

export default function TeacherLoading() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans animate-pulse">
      <div className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between">
        <div className="h-8 w-32 bg-slate-200 rounded-lg"></div>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-12 space-y-8">
        <div className="space-y-2">
          <div className="h-8 w-72 bg-slate-200 rounded-lg"></div>
          <div className="h-4 w-48 bg-slate-200 rounded-md"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 bg-slate-200 rounded-2xl"></div>
          <div className="h-32 bg-slate-200 rounded-2xl"></div>
          <div className="h-32 bg-slate-200 rounded-2xl"></div>
        </div>

        <div className="h-96 bg-slate-200 rounded-2xl"></div>
      </div>
    </div>
  )
}
