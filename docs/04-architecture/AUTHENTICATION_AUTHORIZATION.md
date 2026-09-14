# AUTHENTICATION, AUTHORIZATION & ROLE-BASED ACCESS CONTROL (RBAC)

## 1. Authentication Architecture
The Edutech Platform utilizes NextAuth (v5) backed by Prisma ORM 6 and native SQLite storage (`dev.db`).

- **Credentials Provider:** Email/Phone + salted `bcryptjs` password hashing.
- **Session Strategy:** JWT session tokens stored securely in HTTP-only cookies.
- **Registration Flow:** [`src/app/register/page.tsx`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/src/app/register/page.tsx) allows self-registration for `STUDENT`, `TEACHER`, and `PARENT` roles.

---

## 2. Project Roles & Access Control Matrix

The platform defines 4 explicit roles. Each role has strict route permissions and functional feature access.

| Feature / Route | `STUDENT` | `TEACHER` | `PARENT` | `ADMIN` |
| :--- | :---: | :---: | :---: | :---: |
| **Student Dashboard (`/dashboard`)** | ✅ Allowed | ✅ Allowed | ✅ Allowed | ✅ Allowed |
| **Course Sandbox (`/courses/.../lessons/...`)** | ✅ Full Access | ✅ View Only | ❌ Blocked | ✅ Full Access |
| **Publish Portfolio (`publishProjectAction`)** | ✅ Allowed | ❌ Blocked | ❌ Blocked | ✅ Allowed |
| **Public Portfolio Showcase (`/portfolio/[id]`)** | ✅ Allowed | ✅ Allowed | ✅ Allowed | ✅ Allowed |
| **Teacher Portal (`/teacher`)** | ❌ Blocked | ✅ Allowed | ❌ Blocked | ✅ Allowed |
| **Parent Portal (`/parent`)** | ❌ Blocked | ❌ Blocked | ✅ Allowed | ✅ Allowed |
| **Admin Settings & Audit Logs** | ❌ Blocked | ❌ Blocked | ❌ Blocked | ✅ Allowed |

---

## 3. Role Specifications & Feature Capabilities

### 3.1 `STUDENT` Role
- **Primary Route:** [`/dashboard`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/src/app/dashboard/page.tsx)
- **Features & Access:**
  - Enrolls in curriculum courses ("Web Creator Foundations").
  - Accesses multi-tab HTML/CSS/JS sandbox editor with live `<iframe>` rendering.
  - Receives +50 XP per lesson completion and maintains daily active learning streaks (🔥).
  - Publishes working web projects to public showcase (`/portfolio/[studentId]`).
  - Accesses embedded Socratic AI tutor for lesson hints and bug checking.
- **Restrictions:** Cannot view teacher class rosters, parent child overviews, or other students' private drafts.

---

### 3.2 `TEACHER` Role
- **Primary Route:** [`/teacher`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/src/app/teacher/page.tsx)
- **Features & Access:**
  - Views aggregated class analytics (total enrolled students, active learning rates).
  - Inspects student roster table displaying individual progress bars and completed lesson counts.
  - Reviews student published portfolio web artifacts.
- **Restrictions:** Cannot edit or publish projects on behalf of students.

---

### 3.3 `PARENT` Role
- **Primary Route:** [`/parent`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/src/app/parent/page.tsx)
- **Features & Access:**
  - Views linked children's learning progress summary, total XP earned, and active streak days.
  - Direct access links to inspect children's live published portfolio web projects.
- **Restrictions:** Restricted strictly to their own linked children (`parentId` link in `StudentProfile`).

---

### 3.4 `ADMIN` Role
- **Primary Route:** All platform routes & backend database controls.
- **Features & Access:**
  - Manages course curriculum structure, system users, audit logs (`AuditLog`), and system settings.

---

## 4. Route Middleware & Server Action Authorization

Server actions validate authentication and role permissions prior to executing database queries:

```ts
// Example Server Action Security Pattern
const session = await auth()
if (!session?.user?.id) {
  redirect("/login")
}
if ((session.user as any).role !== "TEACHER" && (session.user as any).role !== "ADMIN") {
  throw new Error("Unauthorized access to Teacher resources")
}
```
