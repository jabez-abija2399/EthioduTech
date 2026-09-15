"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { WifiOff, RefreshCw, Code2, CheckCircle2, ArrowRight } from "lucide-react"

export default function OfflinePage() {
  const [isChecking, setIsChecking] = useState(false)
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    setIsOnline(navigator.onLine)
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleRetry = () => {
    setIsChecking(true)
    setTimeout(() => {
      if (navigator.onLine) {
        window.location.href = "/dashboard"
      } else {
        setIsChecking(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-lg bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl text-center">
        {/* Offline Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
          {isOnline ? (
            <CheckCircle2 className="w-10 h-10 text-emerald-400 animate-bounce" />
          ) : (
            <WifiOff className="w-10 h-10 animate-pulse" />
          )}
        </div>

        {/* Header */}
        <span className="text-[11px] font-extrabold tracking-widest text-amber-400 uppercase bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          {isOnline ? "Connection Restored" : "Offline Mode Active"}
        </span>

        <h1 className="text-3xl font-extrabold text-white mt-3 tracking-tight">
          {isOnline ? "Back Online!" : "You are currently offline"}
        </h1>

        <p className="text-slate-400 text-sm mt-2 leading-relaxed">
          {isOnline
            ? "Your internet connection is re-established. You can return to your courses."
            : "Don't worry! Your code progress is saved safely in your browser (IndexedDB) and will sync automatically when your connection returns."}
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6 text-left">
          <div className="p-3.5 bg-slate-900/60 border border-slate-700/60 rounded-xl flex items-start gap-3">
            <Code2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-bold text-white">Local Code Drafts</h2>
              <p className="text-[11px] text-slate-400 leading-snug">HTML, CSS & JS edits save continuously to local storage.</p>
            </div>
          </div>

          <div className="p-3.5 bg-slate-900/60 border border-slate-700/60 rounded-xl flex items-start gap-3">
            <RefreshCw className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-bold text-white">Auto Sync Flusher</h2>
              <p className="text-[11px] text-slate-400 leading-snug">Completed lessons queue up and sync on reconnection.</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleRetry}
            disabled={isChecking}
            className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 ${isChecking ? "animate-spin" : ""}`} />
            <span>{isChecking ? "Checking Connection..." : "Retry Connection"}</span>
          </button>

          <Link
            href="/dashboard"
            className="flex-1 py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
