# SYNCHRONIZATION STRATEGY & CONFLICT RESOLUTION

## 1. Local-First Data Flow
1. Every state mutation (code draft, lesson completion status) is applied to browser IndexedDB state immediately.
2. If online: Invoke server action directly (`completeLessonAction`, `publishProjectAction`).
3. If offline: Push payload to IndexedDB `pendingSync` object store.

## 2. Synchronization Flusher Protocol
- Window event `'online'` triggers [`flushPendingSyncQueue()`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/src/lib/offline/sync.ts).
- Items are dequeued sequentially.
- Server action responds with confirmation.
- On success: Record removed from `pendingSync` store.
- On conflict: Server timestamp (`completedAt`) takes priority.
