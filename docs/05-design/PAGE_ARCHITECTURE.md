# PAGE ARCHITECTURE & ROUTE SPECIFICATIONS

This specification details the wireframe layout grids, data fetching models, component trees, and state boundaries for every route in the **Edutech Platform**.

---

## 1. Route Map Overview

```text
/                             → Landing & Marketing Page (Public)
/login                        → User Login Page (Public / Guest)
/register                     → User Registration Page (Public / Guest)
/dashboard                    → Student Dashboard (Role: STUDENT, TEACHER, PARENT, ADMIN)
/courses/[id]/lessons/[id]    → Lesson Sandbox Workspace (Role: STUDENT, TEACHER, ADMIN)
/portfolio/[studentId]        → Public Student Web Showcase (Public / Shareable)
/teacher                      → Teacher Roster & Analytics Portal (Role: TEACHER, ADMIN)
/parent                       → Parent Family Progress Portal (Role: PARENT, ADMIN)
```

---

## 2. Route Specifications

### 2.1 `/dashboard` — Student Dashboard
- **Access Control:** Authenticated Users (`STUDENT` primary).
- **Server Data Fetching:** `getCourses()`, `getStudentPortfolio(userId)`, `getStudentGamificationStats(studentId)`.
- **Layout Grid:**
  ```text
  ┌────────────────────────────────────────────────────────┐
  │ Navbar (Logo, Portal Nav, Compact XP/Streak, Avatar)   │
  ├────────────────────────────────────────────────────────┤
  │ Header (Welcome Back Banner + "View Public Portfolio")  │
  ├────────────────────────────────────────────────────────┤
  │ <XPBadgeDisplay /> (🔥 Streak Days, ⭐ XP, Badges)    │
  ├──────────────────────────────────┬─────────────────────┤
  │ Enrolled Courses List (2/3 col)  │ Portfolio Summary   │
  │ - Web Creator Foundations        │ - Published Projects│
  │ - Continue Learning → Button     │ - Public Share Link │
  └──────────────────────────────────┴─────────────────────┘
  ```
- **Component Subtree:** `<Navbar />`, `<XPBadgeDisplay />`, `<Card />`, `<Badge />`, `<Button />`.

---

### 2.2 `/courses/[courseId]/lessons/[lessonId]` — Interactive Lesson & Sandbox Workspace
- **Access Control:** Authenticated Users (`STUDENT`, `TEACHER`, `ADMIN`).
- **Server Data Fetching:** `getLessonWithCourseTree(courseId, lessonId)`.
- **Layout Grid:**
  ```text
  ┌────────────────────────────────────────────────────────┐
  │ Navbar                                                 │
  ├──────────────────────────────────┬─────────────────────┤
  │ Left Sidebar (30% Width)         │ Right Main Sandbox  │
  │ - Course Modules Tree            │ - Markdown Instruction│
  │ - Lesson Outline List            │ - Multi-Tab Editor  │
  │ - Active Lesson Highlight        │   [HTML][CSS][JS]   │
  │                                  │ - Live iframe Output│
  │                                  │ - Auto-Check Button │
  │                                  │ - Complete & Next   │
  └──────────────────────────────────┴─────────────────────┘
  ```
- **Component Subtree:** `<Navbar />`, `react-markdown`, `<CodeEditor />`, `<AiTutorDrawer />`, `<OfflineStatus />`.

---

### 2.3 `/portfolio/[studentId]` — Public Student Showcase
- **Access Control:** Public (Shareable URL).
- **Server Data Fetching:** `getPublicPortfolioData(studentId)`.
- **Layout Grid:**
  ```text
  ┌────────────────────────────────────────────────────────┐
  │ Header (Student Avatar, Name, Grade Level, Bio)        │
  ├────────────────────────────────────────────────────────┤
  │ Earned Badges Carousel (⚡ First Code, 🔥 Streak, 🚀)  │
  ├────────────────────────────────────────────────────────┤
  │ Published Projects Gallery (Grid Cards)                │
  │ ┌──────────────────────┐   ┌──────────────────────┐   │
  │ │ Project Preview 1    │   │ Project Preview 2    │   │
  │ │ Live iframe output   │   │ Live iframe output   │   │
  │ │ Reflection Text      │   │ Reflection Text      │   │
  │ └──────────────────────┘   └──────────────────────┘   │
  └────────────────────────────────────────────────────────┘
  ```
- **Component Subtree:** `<Navbar />`, `<Badge />`, `<Card />`, sandboxed `<iframe>`.

---

### 2.4 `/teacher` — Teacher Roster & Analytics Portal
- **Access Control:** Role `TEACHER` or `ADMIN`.
- **Server Data Fetching:** `getTeacherClassAnalytics(userId)`.
- **Layout Grid:**
  ```text
  ┌────────────────────────────────────────────────────────┐
  │ Navbar (Teacher Portal Active)                         │
  ├────────────────────────────────────────────────────────┤
  │ Class Analytics Cards (Total Students, Active Rates)   │
  ├────────────────────────────────────────────────────────┤
  │ Student Roster Table                                   │
  │ - Name | Grade | Completed Lessons | Progress Bar | portfolio link │
  └────────────────────────────────────────────────────────┘
  ```
- **Component Subtree:** `<Navbar />`, `<Card />`, `<Badge />`, Roster Table.

---

### 2.5 `/parent` — Parent Family Progress Portal
- **Access Control:** Role `PARENT` or `ADMIN`.
- **Server Data Fetching:** `getParentFamilyProgress(userId)`.
- **Layout Grid:**
  ```text
  ┌────────────────────────────────────────────────────────┐
  │ Navbar (Parent Portal Active)                          │
  ├────────────────────────────────────────────────────────┤
  │ Family Summary Cards (Children Count, Learning Streaks)│
  ├────────────────────────────────────────────────────────┤
  │ Children Learning Progress Cards                       │
  │ - Child Name | Active Streak 🔥 | XP Earned ⭐           │
  │ - Link to View Live Child Showcase →                   │
  └────────────────────────────────────────────────────────┘
  ```
- **Component Subtree:** `<Navbar />`, `<Card />`, `<Badge />`.
