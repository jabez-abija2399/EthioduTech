# DECISION LOG — EDUTECH PLATFORM

This document logs all major architectural, product, educational, and technical decisions made for the Edutech Platform.

---

## Log Entries

### Decision 001: Next.js 16 & Prisma SQLite for MVP Foundation
- **Date:** September 14, 2026
- **Version:** MVP (02-MVP)
- **Problem:** Need zero-external-dependency, low-latency, fast deployment database for Ethiopian offline-first pilot launch.
- **Options Considered:**
  1. Remote PostgreSQL (Supabase / Neon)
  2. Native SQLite via Prisma ORM 6
  3. MongoDB / Document DB
- **Chosen Solution:** Option 2 — Native SQLite via Prisma ORM 6.
- **Reason:** SQLite has zero network latency for local server actions, requires no external database provisioning, and compiles into a single local file (`dev.db`).
- **Trade-offs:** Single-writer concurrency limitations, but ideal for local development and single-region MVP node pilot.
- **Consequences:** Easy migration path to PostgreSQL for production V1 via Prisma schema `provider = "postgresql"`.
- **Status:** APPROVED & IMPLEMENTED

---

### Decision 002: In-Browser Code Sandbox via Isolated `<iframe>`
- **Date:** September 14, 2026
- **Version:** MVP (02-MVP)
- **Problem:** Provide instant visual rendering of student HTML, CSS, and JS code without requiring server-side container execution.
- **Options Considered:**
  1. Remote Docker / WebAssembly sandbox runner
  2. In-browser `<iframe>` with `srcDoc` rendering
  3. Static preview window without JS execution
- **Chosen Solution:** Option 2 — In-browser `<iframe>` rendering with `srcDoc`.
- **Reason:** Zero server load, works 100% offline without internet connectivity, instant sub-millisecond rendering feedback.
- **Trade-offs:** Must enforce strict iframe sandboxing (`sandbox="allow-scripts"`) to prevent parent frame DOM access.
- **Status:** APPROVED & IMPLEMENTED

---

### Decision 003: Dual Offline Sync Strategy (IndexedDB + Background Sync)
- **Date:** September 14, 2026
- **Version:** MVP (02-MVP)
- **Problem:** Low-bandwidth and intermittent connectivity in Ethiopian schools.
- **Options Considered:**
  1. Online-only REST API requests
  2. LocalStorage auto-save
  3. IndexedDB (`idb`) draft caching + window `'online'` event listener background flusher
- **Chosen Solution:** Option 3 — IndexedDB (`idb`) + Background Sync.
- **Reason:** LocalStorage has 5MB limits and blocking synchronous storage access. IndexedDB supports large code bundles and asynchronous non-blocking storage.
- **Consequences:** Code drafts saved on every keystroke offline; lesson completions sync seamlessly to SQLite when connectivity returns.
- **Status:** APPROVED & IMPLEMENTED

---

### Decision 004: Embedded Socratic AI Tutor with Drawer UI
- **Date:** September 14, 2026
- **Version:** MVP (02-MVP)
- **Problem:** Provide immediate learning assistance without encouraging direct solution copy-pasting.
- **Options Considered:**
  1. Autonomous code generator
  2. Socratic AI Tutor drawer with prompt chips (Explain code, Find bugs, Get hint)
  3. Static FAQ search
- **Chosen Solution:** Option 2 — Socratic AI Tutor drawer.
- **Reason:** Aligns with core product rules (Student thinking > AI answers). All interaction logs stored in SQLite `AIInteraction` table.
- **Status:** APPROVED & IMPLEMENTED
