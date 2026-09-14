# ERROR HANDLING, LOADING STATES & BOUNDARY CONDITIONS

## 1. Error Handling Architecture

The platform enforces resilient error handling across client sandboxes, server actions, and offline synchronization:

```text
CLIENT SANDBOX (Code Editor)
 ├── Catch syntax errors in iframe output
 └── Render clean console error message box

SERVER ACTIONS (Prisma & DB)
 ├── Wrap DB operations in try/catch blocks
 └── Return typed `{ error: string }` or graceful redirects

OFFLINE SYNCHRONIZATION (`sync.ts`)
 ├── Detect fetch/network failures
 ├── Retain items in IndexedDB `pendingSync` store
 └── Retry automatically on next `'online'` event
```

---

## 2. Loading States & Visual Feedback
- **Server Component Loading:** Next.js `loading.tsx` skeletons render skeleton placeholders while server components fetch database records.
- **Client Code Saving:** Floating auto-save indicator in [`code-editor.tsx`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/src/app/courses/[courseId]/lessons/[lessonId]/code-editor.tsx) displays `"Saving..."` → `"Saved to IndexedDB"`.
- **Offline Connection Toast:** Floating indicator in [`offline-status.tsx`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/src/components/offline-status.tsx) displays `"Offline Mode — Progress Cached Locally"` vs `"Back Online — Progress Synced!"`.

---

## 3. Boundary & Fallback Conditions

| Failure Mode | Fallback Response | Recovery Action |
| :--- | :--- | :--- |
| **Network Failure during Lesson Navigation** | Client-side fallback state (`isCompletedOffline: true`) | Offline queue stored; syncs when online |
| **AI LLM API Offline / Missing Key** | Socratic fallback prompt engine | Local pedagogical response generated |
| **Database Connection Loss** | IndexedDB cache serves code drafts | Reconnects on next request |
