# TRACEABILITY MATRIX — EDUTECH PLATFORM

This matrix traces requirements from user problems down to database models, components, server actions, and test verification.

---

## Traceability Mapping

```text
USER PROBLEM
 ↓
PERSONA
 ↓
LEARNING OUTCOME
 ↓
REQUIREMENT
 ↓
FEATURE
 ↓
PAGE / ROUTE
 ↓
COMPONENT
 ↓
API / ACTION
 ↓
DATABASE MODEL
 ↓
TEST / VERIFICATION
```

---

## Active Requirements Traceability

### 1. Hands-On Coding & Real-Time Feedback
- **User Problem:** Students watch coding videos but cannot write code or see live output.
- **Persona:** Student (Abebe, 14 years old, Grade 8 beginner).
- **Learning Outcome:** Learn HTML structure, CSS styling, and JavaScript logic by building real interactive websites.
- **Requirement:** Provide an in-browser code editor supporting multi-tab HTML/CSS/JS with live sandboxed preview.
- **Feature:** Interactive Code Sandbox.
- **Page / Route:** `/courses/[courseId]/lessons/[lessonId]`
- **Component:** [`code-editor.tsx`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/src/app/courses/[courseId]/lessons/[lessonId]/code-editor.tsx)
- **API / Action:** IndexedDB local draft save (`saveCodeDraft`) & `completeLessonAction`.
- **Database Model:** `Progress`, `Submission`.
- **Verification:** `npx tsc --noEmit` + live browser rendering.

---

### 2. Offline-First Progress Tracking
- **User Problem:** Intermittent internet disconnects cause data loss and server navigation errors.
- **Persona:** Student in regional school with unreliable network connection.
- **Learning Outcome:** Uninterrupted learning journey regardless of connectivity state.
- **Requirement:** Queue completed lessons in browser IndexedDB when offline and auto-sync when online.
- **Feature:** Offline Engine & Sync Flusher.
- **Page / Route:** Global layout & lesson routes.
- **Component:** [`offline-status.tsx`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/src/components/offline-status.tsx)
- **API / Action:** `flushPendingSyncQueue` in [`sync.ts`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/src/lib/offline/sync.ts).
- **Database Model:** `Progress`.
- **Verification:** Empirically verified offline lesson completion fallback.

---

### 3. Student Project Portfolio Showcase
- **User Problem:** Students finish courses but have no shareable proof of what they built.
- **Persona:** Student + Parent + Potential Employer.
- **Learning Outcome:** Demonstrate real-world project creation capability.
- **Requirement:** 1-click publishing from code editor to a public, shareable showcase page.
- **Feature:** Project Portfolio Showcase.
- **Page / Route:** `/portfolio/[studentId]`
- **Component:** `src/app/portfolio/[studentId]/page.tsx`
- **API / Action:** `publishProjectAction` in `src/lib/actions/portfolio.ts`.
- **Database Model:** `Portfolio`, `PortfolioProject`, `Project`.
- **Verification:** `npm run build` static/dynamic route generation.

---

### 4. Gamification & Learning Streaks
- **User Problem:** Students lose motivation without clear milestones and progress feedback.
- **Persona:** Student (Grades 5–12).
- **Learning Outcome:** Build consistent daily learning habits.
- **Requirement:** Track daily active learning streaks, award XP per lesson, and display earned badges.
- **Feature:** Gamification & XP Rewards.
- **Page / Route:** `/dashboard`, Navbar header.
- **Component:** [`xp-badge-display.tsx`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/src/components/xp-badge-display.tsx) & [`navbar.tsx`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/src/components/navbar.tsx)
- **API / Action:** `getStudentGamificationStats` & `completeLessonAction`.
- **Database Model:** `StudentProfile.xp`, `streakDays`, `Badge`, `StudentBadge`.
- **Verification:** Tested query execution + 0 TypeScript errors.
