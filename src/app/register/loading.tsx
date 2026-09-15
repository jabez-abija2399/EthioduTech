import React from "react"

export default function RegisterLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-sm border border-slate-200 animate-pulse space-y-6">
        <div className="h-8 bg-slate-200 rounded-lg w-1/2 mx-auto"></div>
        <div className="h-4 bg-slate-100 rounded w-3/4 mx-auto"></div>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="h-10 bg-slate-100 rounded-xl"></div>
            <div className="h-10 bg-slate-100 rounded-xl"></div>
          </div>
          <div className="h-10 bg-slate-100 rounded-xl w-full"></div>
          <div className="h-10 bg-slate-100 rounded-xl w-full"></div>
          <div className="h-12 bg-slate-200 rounded-xl w-full mt-6"></div>
        </div>
      </div>
    </div>
  )
}
