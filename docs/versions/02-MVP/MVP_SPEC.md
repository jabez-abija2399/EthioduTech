# MVP SPECIFICATION (STAGE 02 — RELEASE CANDIDATE)

## 1. Objective
Deliver a production-ready, low-bandwidth, offline-first PWA learning platform for Ethiopian students in Grades 5–12.

## 2. Core Subsystems Verified
1. **Curriculum System:** "Web Creator Foundations" course tree.
2. **Interactive Sandbox:** Multi-tab HTML/CSS/JS editor with live `<iframe>` output.
3. **Offline Engine:** IndexedDB auto-save & background sync flusher.
4. **Gamification Engine:** +50 XP per lesson, daily streak counter (🔥), badge shelf.
5. **Portfolio Showcase:** 1-click publishing to shareable `/portfolio/[studentId]`.
6. **AI Tutor:** Socratic drawer with query audit logs in SQLite.
7. **Role Portals:** Teacher Roster Dashboard (`/teacher`), Parent Portal (`/parent`).
8. **Auth & Safety:** `bcryptjs` hashed credentials, no minor-to-minor DM vectors.
- **Status:** `RELEASE CANDIDATE (VERIFIED)`
