# TASK REGISTRY — EDUTECH PLATFORM

This registry contains every tracked task across all stages of the Edutech Platform.

## 📊 Priority & Weight System
- **P0 = Critical** (Weight: 5) — System foundation, security, database integrity, core learning loop.
- **P1 = High** (Weight: 3) — Core feature required for current milestone.
- **P2 = Medium** (Weight: 2) — Important functional or UX enhancement.
- **P3 = Low** (Weight: 1) — Secondary optimization or nice-to-have feature.

## 🚦 Status Definitions
- `NOT_STARTED`: Task is planned but unassigned.
- `READY`: Dependencies satisfied; ready for implementation.
- `IN_PROGRESS`: Actively being developed.
- `REVIEW`: Code completed; awaiting testing/audit.
- `BLOCKED`: Development halted due to unresolved dependency or issue.
- `FAILED`: Implementation or test verification failed.
- `VERIFIED`: Passed all acceptance criteria, tests, and evidence checks.
- `DEFERRED`: Moved to future release phase to prevent scope creep.

---

## 📋 Task Registry Table

| Task ID | Title | Priority | Weight | Phase / Milestone | Status | Commit / Evidence |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **FOUND-001** | Next.js 16 + React 19 + TailwindCSS v4 Setup | P0 | 5 | MVP (Phase 1) | `VERIFIED` | `9c821ca` / Clean build |
| **FOUND-002** | Prisma ORM 6 & SQLite Database Schema | P0 | 5 | MVP (Phase 1) | `VERIFIED` | `9c821ca` / SQLite dev.db |
| **AUTH-001** | Database Auth & Hashed Password Registration | P0 | 5 | MVP (Phase 1) | `VERIFIED` | `9c821ca` / `bcryptjs` auth |
| **COURSE-001** | "Web Creator Foundations" Course Seeding | P0 | 5 | MVP (Phase 1) | `VERIFIED` | `9c821ca` / Seed script |
| **COURSE-002** | Markdown Lesson Viewer & Course Navigation | P0 | 5 | MVP (Phase 1) | `VERIFIED` | `9c821ca` / `react-markdown` |
| **CODE-001** | Multi-Tab HTML/CSS/JS Sandbox & Live `<iframe>` | P0 | 5 | MVP (Phase 1) | `VERIFIED` | `9c821ca` / `code-editor.tsx` |
| **OFFLINE-001** | IndexedDB Auto-Save & Offline Completion Flusher | P0 | 5 | MVP (Phase 1) | `VERIFIED` | `9c821ca` / `sync.ts` & `db.ts` |
| **PORTFOLIO-001** | 1-Click Publishing & Public Showcase Route | P1 | 3 | MVP (Phase 1) | `VERIFIED` | `9c821ca` / `/portfolio/[studentId]` |
| **AI-001** | Socratic AI Tutor Drawer & Query Audit Log | P1 | 3 | MVP (Phase 1) | `VERIFIED` | `9c821ca` / `ai-tutor-drawer.tsx` |
| **TEACHER-001** | Teacher Roster & Class Analytics Dashboard | P1 | 3 | MVP (Phase 1) | `VERIFIED` | `9c821ca` / `/teacher` |
| **PARENT-001** | Parent Family Progress & Showcase Dashboard | P1 | 3 | MVP (Phase 1) | `VERIFIED` | `9c821ca` / `/parent` |
| **NAV-001** | Global Navigation & Role Badge Session Header | P1 | 3 | MVP (Phase 1) | `VERIFIED` | `9c821ca` / `navbar.tsx` |
| **GAMIFY-001** | XP Points, Daily Streaks & Badge Rewards Engine | P1 | 3 | MVP (Phase 12) | `VERIFIED` | `9c821ca` / `xp-badge-display.tsx` |
| **DOCS-001** | Governance System & Project Technical Audit | P0 | 5 | MVP Audit | `VERIFIED` | `62f1bd4` / `docs/PROJECT_AUDIT.md` |
| **PWA-002** | Service Worker Full Asset Pre-caching | P1 | 3 | Beta (Milestone 13) | `VERIFIED` | `next.config.ts` PWA config |
| **CODE-002** | Automated Syntax & Exercise Output Checkers | P1 | 3 | Beta (Milestone 14) | `NOT_STARTED` | Scheduled |
| **TEST-001** | Vitest & Playwright E2E Automated Test Suite | P1 | 3 | Beta (Milestone 15) | `NOT_STARTED` | Scheduled |
| **LIVE-001** | WebSockets Teacher-Student Live Code Sharing | P2 | 2 | Beta (Milestone 16) | `DEFERRED` | Beta roadmap |
| **PAY-001** | Telebirr / Chapa Local Payment Checkout | P2 | 2 | V1 (Milestone 17) | `DEFERRED` | V1 roadmap |
