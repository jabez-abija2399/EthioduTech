# MVP RELEASE MANIFEST — EDUTECH PLATFORM

**Version:** 02-MVP  
**Status:** RELEASE CANDIDATE (VERIFIED)  
**Date:** September 15, 2026  

---

## 1. Scope & Features Included
- [x] Next.js 16 App Router + Turbopack + React 19 foundation.
- [x] Prisma ORM 6 with SQLite database (`dev.db`).
- [x] Native database authentication & salted `bcryptjs` password hashing (`/register`, `/login`).
- [x] "Web Creator Foundations" course curriculum seeding.
- [x] In-browser multi-tab HTML/CSS/JS code editor with live sandboxed `<iframe>` preview.
- [x] Offline-first IndexedDB draft auto-saving & background sync flusher.
- [x] 1-click portfolio project publishing (`/portfolio/[studentId]`).
- [x] Gamification Engine: +50 XP per lesson, daily learning streak tracking, badge shelf.
- [x] Multi-role portals: Teacher Dashboard (`/teacher`), Parent Portal (`/parent`).
- [x] Socratic AI Tutor drawer (`ai-tutor-drawer.tsx`).

## 2. Explicit Non-Goals (Excluded from MVP)
- [ ] Multi-course marketplace.
- [ ] Telebirr / Chapa payment gateways (Deferred to V1).
- [ ] Python / C++ language runtime (Deferred to V1).
- [ ] Real-time WebSockets code sharing (Deferred to Beta).

## 3. Verification & Quality Sign-Off
- **TypeScript Errors:** `0` (`npx tsc --noEmit` verified).
- **Production Build:** `0` (`npm run build` compiled cleanly in 55s).
- **Working Tree:** Clean git status (`main` branch).
