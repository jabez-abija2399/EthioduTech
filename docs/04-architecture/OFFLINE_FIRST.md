# OFFLINE-FIRST & LOW-BANDWIDTH ARCHITECTURE

## 1. Context & Rationale
In Ethiopian schools and regional environments, internet connections are frequently intermittent, slow, or expensive. The Edutech Platform is architected to operate smoothly offline.

## 2. Technical Architecture

```text
CLIENT BROWSER
 ├── Next.js App Shell & React 19 Components
 ├── IndexedDB (`edutech-offline` DB)
 │    ├── `code-drafts`: Auto-saves code edits on every keystroke
 │    └── `pendingSync`: Queues completed lesson IDs when disconnected
 ├── Floating Offline Toast (`offline-status.tsx`)
 └── Background Sync Flusher (`sync.ts`)
      └── Listens to `'online'` event → Triggers server action sync to SQLite
```

## 3. Offline Capabilities Matrix

| Action / Capability | Offline Behavior | Online Sync Behavior |
| :--- | :--- | :--- |
| **Code Editing (HTML/CSS/JS)** | Saved instantly in IndexedDB | Local draft updated |
| **Live `<iframe>` Rendering** | 100% functional (In-browser execution) | No network needed |
| **Lesson Completion** | Marked completed locally + queued | Synced to SQLite `Progress` table |
| **Portfolio Publishing** | Stored in local draft queue | Uploaded & published on connection |
