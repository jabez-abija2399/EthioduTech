# USER FLOWS — EDUTECH PLATFORM

## Key Interactive User Flows

### 1. Offline Lesson Completion & Background Sync Flow
```text
[Student Online] → [Enters Lesson Route]
                         ↓
               [Network Connection Drops]
                         ↓
[Student Completes Lesson & Clicks "Complete & Next"]
                         ↓
      [IndexedDB: Queues Action in `pendingSync`]
                         ↓
 [UI: Shows "Completed Offline" Status Toast & Local Advancement]
                         ↓
             [Network Re-connects]
                         ↓
[Sync Engine: 'online' Event Triggers `flushPendingSyncQueue()`]
                         ↓
  [Server Action: `completeLessonAction` Syncs to SQLite]
                         ↓
     [SQLite DB Updated + XP & Streak Awarded]
```

### 2. Portfolio Publishing Flow
```text
[Student Clicks "🚀 Publish to Portfolio" in Code Editor]
                         ↓
              [Modal Opens with Details]
                         ↓
  [Student Inputs Project Title & Personal Reflection]
                         ↓
           [Server Action: `publishProjectAction`]
                         ↓
   [JSON Code Bundle (HTML/CSS/JS) Saved to SQLite DB]
                         ↓
   [Portfolio Live Showcase Generated at `/portfolio/[studentId]`]
```
