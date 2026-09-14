import { getPendingSyncItems, removePendingSyncItem } from "./db"
import { completeLessonAction } from "@/lib/actions/progress"

let isSyncing = false

export async function flushPendingSyncQueue(): Promise<number> {
  if (isSyncing || typeof window === "undefined" || !navigator.onLine) {
    return 0
  }

  isSyncing = true
  let syncedCount = 0

  try {
    const items = await getPendingSyncItems()
    for (const item of items) {
      if (item.id !== undefined) {
        try {
          await completeLessonAction(item.courseId, item.lessonId)
          await removePendingSyncItem(item.id)
          syncedCount++
        } catch (err) {
          console.warn(`Failed to sync item ${item.lessonId}:`, err)
        }
      }
    }
  } catch (err) {
    console.error("Error during sync queue flush:", err)
  } finally {
    isSyncing = false
  }

  return syncedCount
}

export function registerOnlineSyncListener(onSynced?: (count: number) => void) {
  if (typeof window === "undefined") return

  const handleOnline = async () => {
    console.log("[Edutech Offline Sync] Connection restored. Flushing pending queue...")
    const count = await flushPendingSyncQueue()
    if (count > 0 && onSynced) {
      onSynced(count)
    }
  }

  window.addEventListener("online", handleOnline)
  return () => window.removeEventListener("online", handleOnline)
}
