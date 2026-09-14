# CHANGELOG — EDUTECH PLATFORM

All notable changes to the Edutech Platform project are documented in this file.

---

## [0.2.0-rc1] - 2026-09-15

### Added
- **Gamification Rewards Engine:** +50 XP per completed lesson, daily learning streak tracking, unlocked badge shelf (`<XPBadgeDisplay />`), top-nav indicators (`navbar.tsx`).
- **Development Operating System & Governance:** Added `DEVELOPMENT_PLAN.md`, `DEVELOPMENT_TRACKER.md`, `TASK_REGISTRY.md`, `DEPENDENCY_MAP.md`, `RELEASE_PLAN.md`, and complete `docs/development/` standards.
- **Documentation System Upgrade:** Added comprehensive audit (`docs/PROJECT_AUDIT.md`), decision logs (`DECISION_LOG.md`), traceability matrix (`TRACEABILITY.md`), mastery model (`MASTERY_MODEL.md`), and threat scenarios (`RED_TEAM.md`).

### Fixed
- **Prisma Client Schema Reload:** Updated `src/lib/prisma.ts` singleton re-instantiation and touched `next.config.ts` to invalidate hot-reloading server module cache.

---

## [0.1.0] - 2026-09-14

### Added
- Next.js 16 (App Router + Turbopack) foundation with React 19 & TailwindCSS v4.
- Prisma ORM 6 with SQLite database (`dev.db`).
- In-browser HTML/CSS/JS editor with live sandboxed `<iframe>` preview.
- Offline-first IndexedDB draft auto-saving & background sync flusher.
- 1-click project portfolio publishing to public route `/portfolio/[studentId]`.
- Socratic AI tutor drawer (`ai-tutor-drawer.tsx`).
- Teacher Roster (`/teacher`) and Parent Portal (`/parent`).
