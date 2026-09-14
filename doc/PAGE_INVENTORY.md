# PAGE_INVENTORY.md

Every page must use shared `components/ui/` primitives, follow
`DESIGN_SYSTEM.md`, and implement loading/empty/error states explicitly — a
page missing any of these is not complete.

## Navigation structure
- **Public nav:** Home, How it works, Curriculum, For Parents, For Instructors,
  Sign in, Sign up
- **Student nav:** Dashboard, Journey, Curriculum, Portfolio, Help, Settings
  (+ bottom nav on mobile)
- **Instructor nav:** Dashboard, Cohorts, Help, Settings
- **Parent nav:** Dashboard, Help, Settings
- **Admin nav:** Console (sidebar: Users, Cohorts, Curriculum, Flags, Audit,
  Reviews, Safety)

## PAGE-001 — Landing (`/[locale]`)
Roles: public. Components: Header, Footer, BottomNav, HeroSection,
InteractiveSandboxTeaser, ValuePillars, HowItWorks, CurriculumTracks,
ForParents, ForInstructors, Testimonials, FinalCTA. Data: static + published
testimonials. Actions: none (informational + CTA links). States: loading
(streamed sections fine), no empty/error state needed (static).
Responsive: full mobile/tablet/desktop. Accessibility: semantic headings,
alt text on all imagery, keyboard-navigable nav.

## PAGE-002 — Sign Up (`/[locale]/auth/sign-up`)
Roles: public. Data required: none on load. Actions: submit sign-up form.
States: loading (submit spinner), error (validation/join-code/dispatch
failure), success (redirect). See FEAT-001.

## PAGE-003 — Verify Code (`/[locale]/auth/verify-code`)
Roles: public/pending. Actions: submit code, resend code. States: loading,
error (wrong/expired code, rate-limited resend), success (redirect).

## PAGE-004 — Sign In (`/[locale]/auth/sign-in`)
Roles: public. Actions: submit credentials. States: loading, error
(invalid credentials, unconfirmed email → redirect path), success.

## PAGE-005 — Reset Password (`/[locale]/auth/reset-password`)
Roles: public. Two-step: request code → set new password. States per step.

## PAGE-006 — Onboarding (`/[locale]/onboarding`)
Roles: student (post-verification). Actions: multi-field submit. States:
loading, validation error (empty nickname), success (redirect to first lesson).

## PAGE-007 — Student Dashboard (`/[locale]/dashboard`)
Roles: student. Data: `getStudentDashboardData`. States: loading (skeleton),
empty (first-time student — distinct encouraging design, not blank),
populated (progress, continue CTA, feedback card).

## PAGE-008 — Journey Map (`/[locale]/journey`)
Roles: student, public (limited). Data: `getJourneyMapData`. States: loading,
locked/unlocked node states, error (data fetch failure shows retry, not
blank).

## PAGE-009 — Curriculum Catalog (`/[locale]/curriculum`)
Roles: public/student. Data: `getCourseCatalogData`. States: loading, empty
(no tracks — should not happen in practice, but must not crash), populated.

## PAGE-010 — Course Detail (`/[locale]/curriculum/[slug]`)
Roles: public/student. Data: course + syllabus + (if student) progress.
States: locked-prerequisite state, loading, error (invalid slug → 404).

## PAGE-011 — Course Completion (`/[locale]/curriculum/[slug]/completed`)
Roles: student. Celebratory completion state — this is a designated
motivation moment (see DESIGN_SYSTEM.md "celebration moments").

## PAGE-012 — Lesson Player (`/[locale]/lessons/[slug]`)
Roles: student. Data: lesson content + progress. Actions: code edit, run/
check, AI help, checkpoint submit, reflection submit, next-lesson nav.
States: per-step loading, checkpoint pass/fail, AI-help loading/response,
mastery-unlock modal on completion.

## PAGE-013 — Project Brief (`/[locale]/projects/[projectId]/brief`)
Roles: student. Data: project + rubric. States: loading, error (invalid id
→ 404).

## PAGE-014 — Project Workspace/Submit (`/[locale]/projects/[projectId]/submit`)
Roles: student. Actions: edit code (autosaves), write reflection, submit.
States: autosave-in-progress/saved (must reflect a real write — see
RULE-011), submit-blocked (empty reflection), submitted (read-only view of
own submission).

## PAGE-015 — Student Portfolio, self-view (`/[locale]/portfolio`)
Roles: student. Data: `getStudentPortfolio`. Actions: toggle visibility
(consent-gated), copy share link. States: empty (no approved projects yet),
populated, consent-blocked explanation state.

## PAGE-016 — Public Portfolio (`/[locale]/portfolio/[studentId]`)
Roles: public. Data: `getPublicPortfolio`. States: not-found (private/no
consent — this IS the correct state, not an error), populated.

## PAGE-017 — Settings (`/[locale]/settings`)
Roles: all authenticated. Actions: change display name, language, report a
concern. States: loading, save-success confirmation.

## PAGE-018 — Help Center (`/[locale]/help`)
Roles: public/all. Actions: search FAQ, open report-concern modal. States:
empty search results.

## PAGE-019 — Privacy & Consent (`/[locale]/privacy-consent`)
Roles: public. Static content page.

## PAGE-020 — Instructor Dashboard (`/[locale]/instructor/dashboard`)
Roles: instructor, admin. Data: `getInstructorDashboardData` (cohort-scoped
per RULE-016). States: empty review queue, SLA-flagged items highlighted.

## PAGE-021 — Submission Review (`/[locale]/instructor/submissions/[id]`)
Roles: instructor (own cohort), admin. Actions: rubric scoring, feedback,
approve/needs-changes. States: loading, unauthorized (wrong cohort/role —
redirect, not a broken page).

## PAGE-022 — Cohort Management (`/[locale]/instructor/cohorts`)
Roles: instructor (own), admin (all). Actions: view roster, schedule
session, view/copy join code.

## PAGE-023 — Student Detail (`/[locale]/instructor/students/[studentId]`)
Roles: instructor (own cohort's student only), admin. Actions: add private
note. States: unauthorized (student not in caller's cohort) → redirect,
never a data leak.

## PAGE-024 — Parent Dashboard (`/[locale]/parent/dashboard`)
Roles: parent. Data: `getParentDashboardData` (scoped to own links only).
Actions: consent grant/revoke, child selector if multiple.

## PAGE-025 — Admin Console Home (`/[locale]/admin`)
Roles: admin only. Data: vitals, safety alerts, deletion requests, audit
summary.

## PAGE-026 — Admin Curriculum (`/[locale]/admin/curriculum`)
Roles: admin only. Actions: edit lesson content, toggle publish gate, mark
Amharic-certified, generate AI illustration.

## PAGE-027 — Admin Users (`/[locale]/admin/users`)
Roles: admin only. Actions: search, role change (reason required),
deactivate, invite instructor, impersonate.

## PAGE-028 — Admin Cohorts (`/[locale]/admin/cohorts`)
Roles: admin only. Actions: create cohort platform-wide.

## PAGE-029 — Admin Flags (`/[locale]/admin/flags`)
Roles: admin only. Actions: toggle feature flags, configure AI provider.

## PAGE-030 — Admin Audit Log (`/[locale]/admin/audit`)
Roles: admin only. Read-only, filterable.

## PAGE-031 — Admin Reviews (`/[locale]/admin/reviews`)
Roles: admin only. Actions: approve/decline testimonials (consent-checked
for minors).

## PAGE-032 — Not Found (`/[locale]/not-found`)
Roles: all. Used deliberately for portfolio privacy gating (PAGE-016) as
well as genuine 404s — must not be styled/worded in a way that reveals which
case it is.
