# COMPONENT ARCHITECTURE & FOLDER STRUCTURE SPECIFICATION

## 1. Directory Structure Taxonomy

The frontend architecture follows a modular, component-based taxonomy designed for maximum reusability, strict isolation, and clean maintenance:

```text
src/
├── app/                      # Next.js App Router (Routes, Pages & Layouts)
│   ├── (auth)/               # Auth route group (login, register)
│   ├── courses/              # Curriculum routes (/courses/[id]/lessons/[id])
│   ├── dashboard/            # Student Dashboard (/dashboard)
│   ├── parent/               # Parent Family Portal (/parent)
│   ├── portfolio/            # Student Public Showcase (/portfolio/[studentId])
│   └── teacher/              # Teacher Roster Dashboard (/teacher)
│
├── components/               # Modular UI Component System
│   ├── ui/                   # Universal Primitive UI Components (Design System)
│   │   ├── button.tsx        # Flexible Button (variants, sizes, loading spinners)
│   │   ├── card.tsx          # Card, CardHeader, CardTitle, CardContent
│   │   ├── badge.tsx         # Color-coded pill badges (amber, emerald, blue, slate)
│   │   ├── modal.tsx         # Accessible Dialog Modals
│   │   └── input.tsx         # Form Input & Textarea elements
│   │
│   ├── layout/               # Application Shell Components
│   │   ├── navbar.tsx        # Header Navigation (Avatar, Role Pills, Streak/XP display)
│   │   └── footer.tsx        # Page footer & copyright links
│   │
│   └── features/             # Feature-Specific Business Components
│       ├── code-editor.tsx   # Multi-tab HTML/CSS/JS sandbox & live iframe
│       ├── ai-tutor-drawer.tsx # Slide-out Socratic AI assistant
│       ├── xp-badge-display.tsx # Gamification streak & badge shelf widget
│       └── offline-status.tsx # Floating offline connection toast
│
└── lib/                      # Core Logic, Data Access & Services
    ├── actions/              # Next.js Server Actions (progress, portfolio, auth)
    ├── checker/              # Automated Code Exercise Syntax & Assertion Engine
    ├── data/                 # Database Query Abstractions (course, portfolio, gamification)
    ├── offline/              # IndexedDB storage (`db.ts`) & Sync Flusher (`sync.ts`)
    └── prisma.ts             # Prisma Client Singleton Instance
```

---

## 2. Component Design Rules
1. **Zero Circular Dependencies:** Primitive UI components (`src/components/ui/`) NEVER import feature components.
2. **Server vs Client Component Boundary:**
   - Server components (Page routes, Navbar data fetchers) perform direct Prisma database queries.
   - Client components (`"use server"` hooks, `code-editor.tsx`, `ai-tutor-drawer.tsx`) handle interactive state and user events.
3. **Strict Props Interfaces:** Every component defines explicit TypeScript `interface` props exported alongside the component.
