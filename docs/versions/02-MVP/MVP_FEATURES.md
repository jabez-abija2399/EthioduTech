# MVP FEATURE LIST & VERIFICATION STATUS

| Feature ID | Feature Name | Description | Status | Commit / File |
| :--- | :--- | :--- | :--- | :--- |
| **FEAT-001** | Hashed Password Auth | Salted `bcryptjs` password authentication & registration | `VERIFIED` | `src/auth.ts` |
| **FEAT-002** | Curriculum Renderer | `react-markdown` lesson instruction viewer | `VERIFIED` | `lessons/[lessonId]/page.tsx` |
| **FEAT-003** | Sandbox Editor | Multi-tab HTML/CSS/JS editor with `<iframe>` live preview | `VERIFIED` | `code-editor.tsx` |
| **FEAT-004** | Offline Engine | IndexedDB auto-save & background sync flusher | `VERIFIED` | `db.ts` & `sync.ts` |
| **FEAT-005** | Portfolio Showcase | 1-click publishing & `/portfolio/[studentId]` showcase | `VERIFIED` | `portfolio/[studentId]/page.tsx` |
| **FEAT-006** | Gamification Engine | +50 XP per lesson, daily streaks, badge shelf | `VERIFIED` | `xp-badge-display.tsx` |
| **FEAT-007** | AI Tutor Drawer | Socratic assistant drawer with SQLite query audit logging | `VERIFIED` | `ai-tutor-drawer.tsx` |
| **FEAT-008** | Teacher Portal | Roster progress table & portfolio review dashboard | `VERIFIED` | `teacher/page.tsx` |
| **FEAT-009** | Parent Portal | Family progress summary & child showcase viewer | `VERIFIED` | `parent/page.tsx` |
