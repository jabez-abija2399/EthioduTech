# FEATURE & PAGE BUILD CHECKLIST — DEVELOPMENT OPERATING SYSTEM

This checklist is **MANDATORY** for building or modifying any page, route, component, or server action in the **Edutech Platform**.

---

## 📋 5-Step Pre-Implementation Audit Protocol

Before writing new code for any route or component, follow this exact sequence:

```text
STEP 1: REUSABLE COMPONENT AUDIT
  ├── Check `src/components/ui/` (Button, Card, Badge, Modal, Input)
  ├── Check `src/components/features/` (CodeEditor, AiTutorDrawer, XpBadgeDisplay)
  └── Rule: If component exists → REUSE IT. If missing → CREATE reusable component in `src/components/ui/`.

STEP 2: BACKEND INTEGRATION AUDIT
  ├── Server Actions: `src/lib/actions/` (auth.ts, progress.ts, portfolio.ts, ai-tutor.ts)
  ├── Data Access Layer: `src/lib/data/` (course.ts, portfolio.ts, gamification.ts, teacher.ts)
  └── Database Models: Check `prisma/schema.prisma` before mutating data structures.

STEP 3: LOADING STATES & SKELETON AUDIT
  ├── Server Components: Next.js `loading.tsx` skeleton screens.
  ├── Client Actions: `useTransition()` hooks (`isPending`) & `isLoading` button spinners.
  └── Local Caching: IndexedDB loading indicator ("Saved to IndexedDB").

STEP 4: ERROR HANDLING & BOUNDARY AUDIT
  ├── Server Actions: `try/catch` wrappers returning typed `{ error: string }`.
  ├── Client Views: `error.tsx` error boundaries.
  └── Code Sandbox: Runtime iframe syntax error catching.

STEP 5: OFFLINE RESILIENCE AUDIT
  ├── Network Drop: Fallback UI state (`isCompletedOffline: true`).
  └── Sync Queue: IndexedDB `pendingSync` queueing + background sync flusher (`sync.ts`).
```

---

## 🚦 Component & Page Build Decision Matrix

| Build Target | Required Check 1 | Required Check 2 | Required Check 3 | Required Check 4 |
| :--- | :--- | :--- | :--- | :--- |
| **New Page Route (`src/app/...`)** | Component reuse check | Server Data Fetcher (`src/lib/data/`) | Next.js `loading.tsx` & `error.tsx` | Metadata & Viewport export |
| **New Interactive Component** | Props Interface export | Design System variant styling (`src/components/ui/`) | Loading (`isPending`) state | Accessibility ARIA attributes |
| **New Server Action (`src/lib/actions/`)** | `auth()` session validation | Role permission check (`RBAC`) | `try/catch` error return | `revalidatePath()` or redirect |
