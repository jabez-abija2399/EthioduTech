"use client"

import React, { useState, useEffect } from "react"
import { WifiOff, CheckCircle2, RefreshCw } from "lucide-react"
import { registerOnlineSyncListener, flushPendingSyncQueue } from "@/lib/offline/sync"

export function PWAOfflineBar() {
  const [isOffline, setIsOffline] = useState(false)
  const [syncNotice, setSyncNotice] = useState<string | null>(null)
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    setIsOffline(!navigator.onLine)

    const handleOnline = async () => {
      setIsOffline(false)
      setIsSyncing(true)
      const syncedCount = await flushPendingSyncQueue()
      setIsSyncing(false)
      if (syncedCount > 0) {
        setSyncNotice(`🎉 Connection restored! Synced ${syncedCount} queued lesson completion${syncedCount > 1 ? "s" : ""}.`)
        setTimeout(() => setSyncNotice(null), 5000)
      }
    }

    const handleOffline = () => {
      setIsOffline(true)
      setSyncNotice(null)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    const unbind = registerOnlineSyncListener((count) => {
      setSyncNotice(`🎉 Synced ${count} offline completion${count > 1 ? "s" : ""}.`)
      setTimeout(() => setSyncNotice(null), 5000)
    })

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      if (unbind) unbind()
    }
  }, [])

  if (!isOffline && !syncNotice && !isSyncing) {
    return null
  }

  return (
    <div className="w-full text-xs font-bold transition duration-300 z-50">
      {isOffline && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 flex items-center justify-center gap-2 shadow-sm border-b border-amber-600">
          <WifiOff className="w-4 h-4 shrink-0 animate-pulse" />
          <span>📡 Working Offline — Your code & progress save locally to IndexedDB.</span>
        </div>
      )}

      {isSyncing && !isOffline && (
        <div className="bg-blue-600 text-white px-4 py-2 flex items-center justify-center gap-2 shadow-sm border-b border-blue-700">
          <RefreshCw className="w-4 h-4 shrink-0 animate-spin" />
          <span>Syncing offline progress with server...</span>
        </div>
      )}

      {syncNotice && !isOffline && !isSyncing && (
        <div className="bg-emerald-600 text-white px-4 py-2 flex items-center justify-center gap-2 shadow-sm border-b border-emerald-700 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{syncNotice}</span>
        </div>
      )}
    </div>
  )
}
