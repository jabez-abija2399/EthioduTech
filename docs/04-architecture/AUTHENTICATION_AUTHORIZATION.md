# AUTHENTICATION, AUTHORIZATION & PRODUCTION-READY RBAC MATRIX

**Date:** September 15, 2026  
**Project:** Edutech Platform  
**Target:** Production-Ready Stage (Supabase PostgreSQL / Vercel HTTPS Serverless Runtime)  

---

## 🏛️ 1. Foundation & Infrastructure Resilience

### 1.1 Database Connection Architecture
The platform runs on a dual-database architecture:
- **Production (Cloud):** Supabase PostgreSQL with Transaction Connection Pooler (`pgbouncer=true`, `statement_cache_size=0`) and Direct URL for migrations.
- **Local / Offline Development:** SQLite database (`prisma/dev.db`).

### 1.2 Prisma Singleton & HMR Resilience
To prevent connection leaks during Next.js Hot Module Reloading (HMR) and Edge/Serverless invocations, [`src/lib/prisma.ts`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/src/lib/prisma.ts) manages a global instance:

```ts
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma
}
```

---

## 🔒 2. Security & Cryptography Standards

### 2.1 Password Hashing & Registration Security
- **Algorithm:** `bcryptjs` with >= 10 salt rounds (`bcrypt.hashSync(password, 10)`).
- **Password Policy:** Minimum 6 characters required. Plaintext passwords are NEVER logged or stored.
- **Email Normalization:** All emails are trimmed and converted to lower case (`email.toLowerCase().trim()`).

### 2.2 HTTPS Session Cookie Resolution (Vercel Support)
NextAuth v5 / Auth.js v5 sets secure cookie prefixes (`__Secure-`) under HTTPS environments on Vercel. [`src/middleware.ts`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/src/middleware.ts) dynamically checks active cookie headers:
1. `__Secure-authjs.session-token`
2. `authjs.session-token`
3. `__Secure-next-auth.session-token`
4. `next-auth.session-token`

### 2.3 Open Redirect & Session Loop Protection
[`src/lib/auth-redirect.ts`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/src/lib/auth-redirect.ts) enforces destination validation:
- Only relative paths starting with `/` are permitted for `callbackUrl`.
- External URLs (e.g. `https://malicious.com`) are stripped and defaulted to the user's role landing page.
- Auth routes (`/login`, `/register`) in `callbackUrl` are ignored to prevent infinite 307 redirect loops.

---

## 👥 3. Multi-Role System & Production RBAC Matrix

The platform defines 4 explicit system roles: `STUDENT`, `TEACHER`, `PARENT`, `ADMIN`.

```text
               ┌────────────────────────┐
               │    AUTHENTICATED USER  │
               └───────────┬────────────┘
                           │
      ┌────────────────────┼────────────────────┬────────────────────┐
      ▼                    ▼                    ▼                    ▼
 🎓 STUDENT           👩‍🏫 TEACHER           👨‍👩‍👧 PARENT            🛡️ ADMIN
(/dashboard)          (/teacher)            (/parent)           (All Portals)
```

### 3.1 Complete RBAC Access Matrix

| Feature / Route / Resource | `STUDENT` | `TEACHER` | `PARENT` | `ADMIN` | Security Guard Enforcement |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **Login / Register Page (`/login`, `/register`)** | 🌐 Unauthenticated | 🌐 Unauthenticated | 🌐 Unauthenticated | 🌐 Unauthenticated | Auto-redirect authenticated users to role landing page |
| **Student Dashboard (`/dashboard`)** | ✅ Allowed | ✅ Allowed | ✅ Allowed | ✅ Allowed | Middleware + `auth()` session check |
| **Course Sandbox Editor (`/courses/...`)** | ✅ Full Access | 👁️ View Only | ❌ Blocked | ✅ Full Access | Middleware + Component role guard |
| **Complete Lesson Action (`completeLessonAction`)** | ✅ Allowed | ❌ Blocked | ❌ Blocked | ✅ Allowed | `assertRole(["STUDENT", "ADMIN"])` |
| **Publish to Portfolio (`publishToPortfolioAction`)** | ✅ Allowed | ❌ Blocked | ❌ Blocked | ✅ Allowed | `assertRole(["STUDENT", "ADMIN"])` |
| **Public Portfolio Showcase (`/portfolio/[id]`)** | 🌐 Public | 🌐 Public | 🌐 Public | 🌐 Public | Public route with live sandbox preview |
| **Teacher Roster & Analytics (`/teacher`)** | ❌ Blocked | ✅ Allowed | ❌ Blocked | ✅ Allowed | Middleware (`TEACHER` or `ADMIN`) |
| **Parent Family Overview (`/parent`)** | ❌ Blocked | ❌ Blocked | ✅ Allowed | ✅ Allowed | Middleware (`PARENT` or `ADMIN`) + `parentId` scoping |
| **AI Tutor Assistance (`ai-tutor-drawer`)** | ✅ Allowed | 👁️ View Only | ❌ Blocked | ✅ Allowed | Server Action `logAIInteractionAction` |
| **Database Administration & Audit Logs** | ❌ Blocked | ❌ Blocked | ❌ Blocked | ✅ Allowed | Direct DB / Prisma Studio access |

---

## 📐 4. Developer & Agent Guidelines: Feature Development by Role

When creating or modifying ANY feature in the platform, developers and autonomous AI agents MUST follow these **4 Golden Rules**:

### Rule 1: Dual Layer Protection (Middleware + Server Guard)
Never rely on UI hiding alone or client-side checks. Every feature MUST enforce security at two distinct layers:
1. **Edge Middleware Layer (`src/middleware.ts`)**: Add path patterns to the middleware matcher and enforce role checks.
2. **Server Action / API Guard Layer**: In your server action or API route, call the server guard before performing database operations:

```ts
import { assertRole } from "@/lib/rbac"

export async function myProtectedAction() {
  const user = await assertRole(["TEACHER", "ADMIN"])
  // Execute database operations with guaranteed user context
}
```

### Rule 2: Data Isolation & Tenant Scoping
- **`STUDENT` Data:** Queries must filter by `userId` or `studentProfileId`.
- **`PARENT` Data:** Queries must filter by linked child profiles (`parentId: parentProfile.id`). Never allow a parent to query unlinked students.
- **`TEACHER` Data:** Queries return classroom-level aggregates and enrolled student rosters.

### Rule 3: Atomic Multi-Record Provisioning
When registering a user or creating role profiles, wrap all database operations in a single Prisma atomic transaction (`prisma.$transaction`). Never leave orphaned `User` records without corresponding role profiles (`StudentProfile`, `TeacherProfile`, `ParentProfile`).

### Rule 4: Zero-Downtime Safe Fallbacks
All server data loaders (`getStudentPortfolio`, `getCourses`, `getTeacherRoster`) must wrap database calls in `try/catch` blocks and provide structured fallback objects so UI components render gracefully even during database connection maintenance.

---

## 🛠️ 5. Implementation Reference Files

- 🚦 Middleware Enforcement: [`src/middleware.ts`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/src/middleware.ts)
- 🔑 Authentication Configuration: [`src/auth.ts`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/src/auth.ts)
- 🛡️ Server Actions & Auth Registration: [`src/lib/actions/auth.ts`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/src/lib/actions/auth.ts)
- 🧭 Role Redirect Calculator: [`src/lib/auth-redirect.ts`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/src/lib/auth-redirect.ts)
- 🧪 Auth Unit Tests: [`tests/unit/auth.test.ts`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/tests/unit/auth.test.ts) & [`tests/unit/auth-redirect.test.ts`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/tests/unit/auth-redirect.test.ts)
