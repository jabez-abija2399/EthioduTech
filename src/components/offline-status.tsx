"use client"

import { useState, useEffect } from "react"
import { registerOnlineSyncListener, flushPendingSyncQueue } from "@/lib/offline/sync"

export default function OfflineStatus() {
  const [isOffline, setIsOffline] = useState(false)
  const [syncNotice, setSyncNotice] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Set initial network state
    setIsOffline(!navigator.onLine)

    const handleOnline = () => {
      setIsOffline(false)
      setSyncNotice("🟢 Back Online — Syncing your progress...")
      flushPendingSyncQueue().then((count) => {
        if (count > 0) {
          setSyncNotice(`🟢 Back Online — Successfully synced ${count} lesson(s)!`)
        } else {
          setSyncNotice(`🟢 Back Online`)
        }
        setTimeout(() => setSyncNotice(null), 4000)
      })
    }

    const handleOffline = () => {
      setIsOffline(true)
      setSyncNotice(null)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    const unregisterSync = registerOnlineSyncListener((count) => {
      setSyncNotice(`🟢 Synced ${count} offline lesson(s)`)
      setTimeout(() => setSyncNotice(null), 4000)
    })

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      if (unregisterSync) unregisterSync()
    }
  }, [])

  if (!isOffline && !syncNotice) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 transition-all duration-300">
      {isOffline ? (
        <div className="flex items-center gap-2 bg-amber-900/90 text-amber-200 border border-amber-700/80 px-4 py-2.5 rounded-xl shadow-2xl backdrop-blur-md text-xs font-semibold animate-pulse">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          <span>⚡ Working Offline — Progress saved to browser</span>
        </div>
      ) : syncNotice ? (
        <div className="flex items-center gap-2 bg-emerald-900/90 text-emerald-200 border border-emerald-700/80 px-4 py-2.5 rounded-xl shadow-2xl backdrop-blur-md text-xs font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span>{syncNotice}</span>
        </div>
      ) : null}
    </div>
  )
}
