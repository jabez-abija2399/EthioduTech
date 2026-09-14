# MASTER DEVELOPMENT PLAN — EDUTECH PLATFORM

This document serves as the master execution roadmap for the **Edutech Platform**, defining stages, goals, exit criteria, scope boundaries, and non-goals from initial validation through global expansion.

---

## 🚀 Lifecycle Stages Roadmap

```text
VALIDATION
    ↓
PROTOTYPE
    ↓
MVP (★ CURRENT STAGE)
    ↓
BETA
    ↓
V1 PRODUCTION
    ↓
GLOBAL
```

---

## Stage Specifications

### 1. Stage 00 — Validation (`00-validation`)
- **Objective:** Prove that Ethiopian students in Grades 5–12 want to learn web development by building real interactive projects, and validate low-bandwidth infrastructure feasibility.
- **Product & Technical Scope:** Paper prototypes, diagnostic survey interviews, local SQLite performance benchmarks under 0ms network latency.
- **Exit Criteria:** Validated student interest and technical proof of local-first database performance.
- **Status:** `COMPLETED & VERIFIED`

---

### 2. Stage 01 — Prototype (`01-prototype`)
- **Objective:** Build and validate the core learning loop: Read Explanation → Write HTML/CSS → Render Live Preview → Track Completion.
- **Product & Technical Scope:** Next.js App Router setup, initial Markdown renderer, basic code editor.
- **Exit Criteria:** Functional browser sandbox rendering HTML in an isolated iframe.
- **Status:** `COMPLETED & VERIFIED`

---

### 3. Stage 02 — MVP (`02-MVP`) ★ CURRENT STAGE
- **Objective:** Deliver a complete, resilient, low-bandwidth PWA for project-based learning with multi-role access, offline auto-saving, AI tutoring, and gamification rewards.
- **Product Scope:**
  - Multi-tab HTML/CSS/JS sandbox editor with live `<iframe>` rendering.
  - Linear curriculum ("Web Creator Foundations").
  - Offline-first engine: IndexedDB auto-saving, offline completion queueing, background flusher.
  - Gamification Engine: +50 XP per lesson, daily active streak tracking, badge shelf.
  - Student Portfolio: 1-click publishing to shareable `/portfolio/[studentId]` showcases.
  - Embedded Socratic AI Tutor drawer with interaction logging.
  - Multi-role portals: Student (`/dashboard`), Teacher (`/teacher`), Parent (`/parent`).
  - Auth: `bcryptjs` password hashing in SQLite (`prisma/schema.prisma`).
- **Technical & Quality Scope:** 0 TypeScript errors (`npx tsc --noEmit`), clean production build (`npm run build`).
- **Non-Goals (Explicitly Excluded):** Multi-course marketplace, Telebirr/Chapa payments, Python runtime, WebSockets live sharing.
- **Exit Criteria:** All MVP tasks `VERIFIED`, production build green, complete documentation audit.
- **Status:** `VERIFIED & AUDITED (Release Candidate)`

---

### 4. Stage 03 — Beta (`03-BETA`)
- **Objective:** Expand course offerings, add automated exercise checkers, full PWA asset pre-caching, and teacher live code sharing.
- **Scope:**
  - Full PWA Service Worker precaching for 100% networkless operation.
  - Automated code validation tests & syntax checkers in sandbox.
  - WebSockets teacher-student live code sharing.
  - Vitest / Playwright automated testing suite.
- **Status:** `PLANNED`

---

### 5. Stage 04 — V1 Production (`04-V1`)
- **Objective:** Launch paid subscriptions, multiple technology tracks (Python/Data), and school administration features.
- **Scope:** Local Ethiopian payment gateways (Telebirr, Chapa), Python/Backend runtime tracks, enterprise school roster management.
- **Status:** `ROADMAP`

---

### 6. Stage 05 — Global (`05-GLOBAL`)
- **Objective:** Scale to international regional markets, multi-language localization (Amharic, Afaan Oromo, English), and multi-currency billing.
- **Status:** `ROADMAP`
