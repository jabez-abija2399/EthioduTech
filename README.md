# EDUTECH PLATFORM MVP — ETHIOPIAN-FIRST LOW-BANDWIDTH PWA

An offline-first, project-based learning platform for Grades 5–12 students to learn web development by building real interactive applications.

---

## 🗺️ Master Documentation & Governance
All platform specifications, architecture docs, governance rules, and development tracking files are indexed in the [docs/INDEX.md](file:///home/jabez/Documents/software/project/myproduct/best/edutech/docs/INDEX.md) sitemap:

- 📖 [MASTER_SPEC.md](file:///home/jabez/Documents/software/project/myproduct/best/edutech/MASTER_SPEC.md) — Product Vision & Master Architecture
- 📜 [AGENT_CONSTITUTION.md](file:///home/jabez/Documents/software/project/myproduct/best/edutech/AGENT_CONSTITUTION.md) — Autonomous Agent Guidelines
- ⚖️ [PRODUCT_RULES.md](file:///home/jabez/Documents/software/project/myproduct/best/edutech/PRODUCT_RULES.md) — Permanent Product Principles
- 🗺️ [DEVELOPMENT_PLAN.md](file:///home/jabez/Documents/software/project/myproduct/best/edutech/DEVELOPMENT_PLAN.md) — Master Execution Roadmap
- 📋 [TASK_REGISTRY.md](file:///home/jabez/Documents/software/project/myproduct/best/edutech/TASK_REGISTRY.md) — Unique Task Registry & Priorities
- 📊 [DEVELOPMENT_TRACKER.md](file:///home/jabez/Documents/software/project/myproduct/best/edutech/DEVELOPMENT_TRACKER.md) — Empirical Progress Metrics (100% MVP Verified)
- 🔑 [AUTHENTICATION_AUTHORIZATION.md](file:///home/jabez/Documents/software/project/myproduct/best/edutech/docs/04-architecture/AUTHENTICATION_AUTHORIZATION.md) — RBAC Role Permissions & Access Matrix

---

## ⚡ Local Development Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Synchronization & Seeding
```bash
npx prisma db push
npx tsx prisma/seed.ts
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Pre-Seeded Test Credentials

| Role | Email | Password | Primary Portal Route |
| :--- | :--- | :--- | :--- |
| **Student** | `student@edutech.test` | `password` | [`/dashboard`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/src/app/dashboard/page.tsx) |
| **Teacher** | `teacher@edutech.test` | `password` | [`/teacher`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/src/app/teacher/page.tsx) |
| **Parent** | `parent@edutech.test` | `password` | [`/parent`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/src/app/parent/page.tsx) |

---

## 🛠️ Build & Typecheck Verification
```bash
npx tsc --noEmit # Verify zero TypeScript errors
npm run build    # Verify production compilation
```
