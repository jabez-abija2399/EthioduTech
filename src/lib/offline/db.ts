const DB_NAME = "edutech_offline_db"
const DB_VERSION = 1

export interface CodeDraft {
  lessonId: string
  html: string
  css: string
  js: string
  updatedAt: number
}

export interface PendingSyncItem {
  id?: number
  courseId: string
  lessonId: string
  timestamp: number
  status: "pending" | "synced"
}

export interface LocalPublishedProject {
  id: string
  title: string
  description: string
  url: string
  reflection?: string
  createdAt: number
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !("indexedDB" in window)) {
      reject("IndexedDB is not supported in this environment")
      return
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result

      if (!db.objectStoreNames.contains("drafts")) {
        db.createObjectStore("drafts", { keyPath: "lessonId" })
      }

      if (!db.objectStoreNames.contains("pendingSync")) {
        db.createObjectStore("pendingSync", { keyPath: "id", autoIncrement: true })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

// -----------------------------------------------------------------------------
// CODE DRAFTS STORAGE
// -----------------------------------------------------------------------------

export async function saveCodeDraft(draft: CodeDraft): Promise<void> {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction("drafts", "readwrite")
      const store = tx.objectStore("drafts")
      const req = store.put(draft)
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
  } catch (err) {
    console.warn("Failed to save draft to IndexedDB:", err)
  }
}

export async function getCodeDraft(lessonId: string): Promise<CodeDraft | null> {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction("drafts", "readonly")
      const store = tx.objectStore("drafts")
      const req = store.get(lessonId)
      req.onsuccess = () => resolve(req.result || null)
      req.onerror = () => reject(req.error)
    })
  } catch (err) {
    console.warn("Failed to read draft from IndexedDB:", err)
    return null
  }
}

// -----------------------------------------------------------------------------
// PENDING SYNC QUEUE
// -----------------------------------------------------------------------------

export async function addPendingSync(item: Omit<PendingSyncItem, "id">): Promise<void> {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction("pendingSync", "readwrite")
      const store = tx.objectStore("pendingSync")
      const req = store.add(item)
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
  } catch (err) {
    console.warn("Failed to add pending sync item:", err)
  }
}

export async function getPendingSyncItems(): Promise<PendingSyncItem[]> {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction("pendingSync", "readonly")
      const store = tx.objectStore("pendingSync")
      const req = store.getAll()
      req.onsuccess = () => resolve(req.result || [])
      req.onerror = () => reject(req.error)
    })
  } catch (err) {
    console.warn("Failed to get pending sync items:", err)
    return []
  }
}

export async function removePendingSyncItem(id: number): Promise<void> {
  try {
    const db = await openDB()
    return new Promise((resolve, reject) => {
      const tx = db.transaction("pendingSync", "readwrite")
      const store = tx.objectStore("pendingSync")
      const req = store.delete(id)
      req.onsuccess = () => resolve()
      req.onerror = () => reject(req.error)
    })
  } catch (err) {
    console.warn("Failed to remove pending sync item:", err)
  }
}

// -----------------------------------------------------------------------------
// LOCAL PUBLISHED PROJECTS STORAGE (FAST CLIENT RECOVERY)
// -----------------------------------------------------------------------------

export function saveLocalPublishedProject(project: LocalPublishedProject): void {
  if (typeof window === "undefined") return
  try {
    const existing = getLocalPublishedProjects()
    const updated = [project, ...existing.filter((p) => p.id !== project.id)]
    localStorage.setItem("edutech_published_projects", JSON.stringify(updated))
  } catch (e) {
    console.warn("Failed to save published project to localStorage:", e)
  }
}

export function getLocalPublishedProjects(): LocalPublishedProject[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem("edutech_published_projects")
    return raw ? JSON.parse(raw) : []
  } catch (e) {
    return []
  }
}
