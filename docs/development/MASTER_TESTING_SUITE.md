# MASTER PHASE-BY-PHASE TESTING SUITE SPECIFICATION

This document details the complete testing strategy, test cases, and verification commands across every development phase of the **Edutech Platform**.

---

## 🧪 Phase 1: Foundation & Authentication Test Suite
- **Scope:** NextAuth authentication, `bcryptjs` password hashing, registration, role assignment.
- **Automated Tests:** `vitest run tests/unit/auth.test.ts`
- **Test Cases:**
  1. `TEST-AUTH-01`: Registering a new `STUDENT` user hashes password with `bcryptjs` (salt >= 10 rounds).
  2. `TEST-AUTH-02`: Valid credentials authenticate successfully and issue JWT session.
  3. `TEST-AUTH-03`: Invalid password fails safely without leaking user existence.
  4. `TEST-AUTH-04`: Protected route navigation redirects unauthenticated users to `/login`.

---

## 🧪 Phase 2: Curriculum & Course Navigation Test Suite
- **Scope:** SQLite course tree queries, Markdown rendering, linear lesson progression.
- **Automated Tests:** `vitest run tests/unit/course.test.ts`
- **Test Cases:**
  1. `TEST-CRS-01`: `getCourses()` resolves modules, units, and lessons in ascending `order`.
  2. `TEST-CRS-02`: Markdown renderer renders headings, paragraphs, lists, and fenced code blocks cleanly.
  3. `TEST-CRS-03`: `completeLessonAction` advances student to the next sequential lesson ID.

---

## 🧪 Phase 3: Interactive Sandbox & Code Assertion Test Suite
- **Scope:** Multi-tab code editor, `<iframe>` DOM sandbox, automated code checker engine.
- **Automated Tests:** `vitest run tests/unit/code-checker.test.ts`
- **Test Cases:**
  1. `TEST-CODE-01`: `validateCodeSubmission` passes valid HTML (`<h1>`, `<p>`), CSS, and JS.
  2. `TEST-CODE-02`: `validateCodeSubmission` detects missing HTML tags and returns formatted feedback.
  3. `TEST-CODE-03`: Lesson-specific assertions (`getRulesForLesson(lessonId)`) evaluate correctly.
  4. `TEST-CODE-04`: Sandboxed `<iframe>` prevents cross-origin parent window DOM access.

---

## 🧪 Phase 4: Offline Engine & Background Sync Test Suite
- **Scope:** IndexedDB auto-saving, offline completion queueing, background sync flusher.
- **Automated Tests:** `vitest run tests/unit/offline.test.ts`
- **Test Cases:**
  1. `TEST-OFF-01`: Keystroke edits auto-save to IndexedDB (`code-drafts` store).
  2. `TEST-OFF-02`: Disconnected lesson completion queues payload to `pendingSync` store.
  3. `TEST-OFF-03`: `'online'` event triggers `flushPendingSyncQueue()` and syncs to SQLite DB.

---

## 🧪 Phase 5: Gamification, Streaks & Rewards Test Suite
- **Scope:** XP calculation, daily streak increments, badge unlocking.
- **Automated Tests:** `vitest run tests/unit/gamification.test.ts`
- **Test Cases:**
  1. `TEST-GAM-01`: Completing a new lesson awards **+50 XP** to `StudentProfile.xp`.
  2. `TEST-GAM-02`: Consecutive daily learning increments `streakDays` by 1.
  3. `TEST-GAM-03`: Achieving 3-day streak unlocks `STREAK_3` badge in `StudentBadge` table.

---

## 🧪 Phase 6: Student Portfolio & Multi-Role Portals Test Suite
- **Scope:** 1-click portfolio publishing, public showcase, teacher roster, parent overview.
- **Automated Tests:** `vitest run tests/unit/portfolio.test.ts`
- **Test Cases:**
  1. `TEST-PORT-01`: `publishToPortfolioAction` saves project title, description, reflection, and JSON code bundle to SQLite.
  2. `TEST-PORT-02`: `/portfolio/[studentId]` renders student badges and live iframe project previews.
  3. `TEST-PORT-03`: Teacher portal (`/teacher`) displays student roster table with progress bars.
  4. `TEST-PORT-04`: Parent portal (`/parent`) displays child learning summary and portfolio links.

---

## 🛠️ Master Verification Command
To run all test suites and verify compilation:
```bash
npx tsc --noEmit && npm run test && npm run build
```
