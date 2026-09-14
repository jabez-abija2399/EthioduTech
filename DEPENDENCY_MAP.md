# DEPENDENCY MAP — EDUTECH PLATFORM

This map defines technical and operational dependencies across subsystem layers.

```text
FOUNDATION & SYSTEM CONFIGURATION
 └── SQLite DB & Prisma ORM (`prisma/schema.prisma`)
      ↓
AUTHENTICATION & USER PROFILES
 ├── User Model & Hashed Password Auth (`bcryptjs`)
 └── Profiles (`StudentProfile`, `TeacherProfile`, `ParentProfile`)
      ↓
CURRICULUM & LESSON ENGINE
 ├── Course → Module → Unit → Lesson Hierarchy
 └── Markdown Content Renderer (`react-markdown`)
      ↓
INTERACTIVE CODE SANDBOX & OFFLINE ENGINE
 ├── In-browser Multi-Tab Editor (`code-editor.tsx`)
 ├── Isolated `<iframe>` Sandbox Output
 ├── IndexedDB Auto-Save (`db.ts`)
 └── Offline Completion Queue & Sync Flusher (`sync.ts`)
      ↓
ENGAGEMENT & OUTCOMES LAYER
 ├── Gamification & Rewards (`xp-badge-display.tsx` & `completeLessonAction`)
 ├── Student Portfolio Showcase (`/portfolio/[studentId]`)
 └── Embedded AI Tutor Drawer (`ai-tutor-drawer.tsx`)
      ↓
MANAGEMENT & REPORTING PORTALS
 ├── Teacher Dashboard (`/teacher`)
 └── Parent Portal (`/parent`)
```

## Task Execution Rule
Tasks must NEVER be implemented before their parent dependencies are `VERIFIED`.
