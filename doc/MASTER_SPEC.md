# MASTER_SPEC.md — Ethio EduTech Platform

## 1. Product Vision
A bilingual (English + Amharic) cohort-based coding education platform for Ethiopian
students in grades 5–12. Students join instructor-led cohorts, progress through a
visual curriculum journey, write real code with live feedback, submit capstone
projects for instructor review, and build a private-by-default portfolio. Parents
get consent-gated visibility. Admins govern curriculum, users, safety, and audit.

## 2. Problem Being Solved
Ethiopian students lack accessible, native-language, classroom-integrated coding
education. Existing platforms are English-only, self-paced with no instructor
accountability, and not designed around child-safety defaults appropriate for
minors using AI tooling.

## 3. Target Users & Personas
- **Selam, age 12, student** — first-time coder, Amharic-preferring, uses a shared
  family Android phone, needs fast wins and forgiving feedback.
- **Instructor Dawit** — teaches a 25-student cohort, needs fast review tools and
  visibility into who's stuck.
- **Parent/Guardian Almaz** — wants reassurance her child is safe and progressing,
  does not code herself.
- **Admin/Platform Operator** — manages multiple cohorts across schools, curriculum
  quality, and safety compliance.

## 4. User Roles & Permissions Summary
| Role | Can | Cannot |
|---|---|---|
| Student | Learn, code, submit projects, view own progress/portfolio | Review others' submissions, see other students' private data, access admin/instructor tools |
| Instructor | Review submissions in their cohort(s), manage their roster, schedule sessions | Access cohorts they don't teach, platform-wide user/role management |
| Parent | View linked child's progress (consent-gated), manage sharing consent | View unlinked students, modify learning content |
| Admin | Full platform governance: users, roles, curriculum, cohorts, safety, audit | Bypass audit logging, delete audit history |

## 5. Business Model
Not a consumer paid product at this stage — cohort/school licensing model
(out of scope for this build; no payment processing required in v1). Flag: if
payments are added later, this spec must be extended with a PAYMENTS.md before
any payment code is written — do not build payment flows speculatively.

## 6. Core Business Rules (see BUSINESS_RULES.md for full detail)
- Portfolios are private by default (RULE-001)
- No public portfolio content without verified guardian consent (RULE-002)
- Every server action must authenticate and authorize before acting (RULE-003)
- No feature may simulate success without doing the real thing (RULE-004)

## 7. Requirements (REQ-XXX)
Full atomic requirement list. Every feature in FEATURE_REGISTRY.md must map to at
least one of these; every requirement must map to at least one feature and at
least one test (see REQUIREMENT_TRACEABILITY.md).

### Authentication & Account (REQ-001 to REQ-015)
- REQ-001: A visitor can create an account as a student or parent role.
- REQ-002: A visitor can optionally supply a cohort join code at sign-up.
- REQ-003: An invalid join code blocks account creation with a clear error;
  no account is created.
- REQ-004: A blank join code allows normal sign-up with no cohort enrollment.
- REQ-005: A valid join code creates a cohort membership atomically with the
  account (or the account creation clearly reports partial failure — see
  RULE-010).
- REQ-006: A new account must verify its email via a 6-digit code before
  accessing protected areas.
- REQ-007: Verification codes are delivered by real email in production; in
  development, an undelivered code is logged loudly, never silently.
- REQ-008: If code delivery fails on first sign-up attempt, the user can retry
  without being permanently blocked by "account already exists."
- REQ-009: An existing, verified account cannot be re-registered with the same
  email.
- REQ-010: A user can sign in with email + password.
- REQ-011: A signed-in user is redirected based on role (student/instructor/
  parent/admin) to their respective home.
- REQ-012: A user can request a password reset via emailed code.
- REQ-013: A user can set a new password after verifying the reset code.
- REQ-014: A user can sign out, ending their session.
- REQ-015: An unauthenticated user attempting a protected route is redirected
  to sign-in.

### Onboarding (REQ-016 to REQ-020)
- REQ-016: A new student selects a UI language (en/am) during onboarding.
- REQ-017: A new student provides a nickname during onboarding.
- REQ-018: A new student selects a grade band (5–8 or 9–12).
- REQ-019: A new student selects a starting curriculum track preference.
- REQ-020: Onboarding completion redirects to the first lesson or dashboard.

### Learning Core (REQ-021 to REQ-040)
- REQ-021: A student can view a visual journey map of tracks and lessons.
- REQ-022: Locked lessons are visually distinct from unlocked ones.
- REQ-023: A student can browse a course catalog with syllabus detail.
- REQ-024: A lesson consists of ordered steps: explain, interactive, checkpoint,
  reflection.
- REQ-025: The interactive step provides a real code editor with syntax
  highlighting for the relevant language.
- REQ-026: Code changes in the interactive step are persisted to the server,
  not only shown as "saved" in the UI without a real write.
- REQ-027: A live preview reflects the student's current code in near
  real-time for web-based lessons.
- REQ-028: Runtime errors in the live preview are translated to plain-language
  hints, not raw stack traces.
- REQ-029: A checkpoint step evaluates the student's code using lenient,
  intent-based matching, not brittle exact-string comparison.
- REQ-030: A failed checkpoint attempt tells the student specifically what
  differs from the expected result.
- REQ-031: A student can request AI help via an "I'm stuck" control at any
  interactive or checkpoint step.
- REQ-032: The AI copilot response is grounded in the student's actual current
  code and question — not a fixed canned string regardless of input.
- REQ-033: The AI copilot never outputs a complete solution to the current
  exercise.
- REQ-034: The AI copilot detects signs of personal distress in a student's
  message (in both en and am) and responds with a safe, human-escalation
  message instead of coding help.
- REQ-035: A reflection step requires non-empty text before the lesson can be
  marked complete.
- REQ-036: Completing a lesson updates the student's progress record.
- REQ-037: Progress updates are reflected on the dashboard and journey map on
  next load.
- REQ-038: A student can navigate to the next lesson upon completion.
- REQ-039: A student dashboard shows continue-learning CTA, recent progress,
  and any instructor feedback.
- REQ-040: A first-time student (zero completed lessons) sees a distinct,
  encouraging empty-state dashboard, not a blank/error state.

### Projects & Submissions (REQ-041 to REQ-050)
- REQ-041: A student can view a capstone project brief with rubric criteria.
- REQ-042: A student can edit project code in a multi-file workspace.
- REQ-043: Project code changes are autosaved to the database on a debounce,
  with a real persisted write — not a cosmetic-only save indicator.
- REQ-044: A student must write a non-empty reflection before final submission.
- REQ-045: A student can submit a project for instructor review.
- REQ-046: A student can view their submission's review status.
- REQ-047: An instructor with permission for the student's cohort can open a
  submission for review.
- REQ-048: An instructor scores a submission on a 5-dimension, 0–4 rubric and
  leaves feedback.
- REQ-049: An instructor can mark a submission approved or needs-changes.
- REQ-050: The student receives a notification when their review is complete.

### Portfolio (REQ-051 to REQ-055)
- REQ-051: An approved project appears on the student's private portfolio by
  default.
- REQ-052: A student can toggle a specific project's visibility to public,
  only if verified guardian consent exists for that student.
- REQ-053: A public portfolio view is accessible via a shareable link.
- REQ-054: A portfolio with no public consent returns a not-found response to
  external visitors, never a private-data leak.
- REQ-055: Mastery badges on the portfolio reflect real, earned milestones.

### Cohorts (REQ-056 to REQ-062)
- REQ-056: An instructor can create a cohort with a track, age band, and date
  range.
- REQ-057: A cohort may have an optional, unique (case-insensitive) join code.
- REQ-058: An instructor can view their cohort's roster.
- REQ-059: An instructor can schedule a live session for their cohort.
- REQ-060: A student can view upcoming live sessions for their cohort.
- REQ-061: (Backlog, tracked not built in v1) Attendance can be recorded for a
  live session.
- REQ-062: A single canonical implementation of cohort-session scheduling
  exists; no duplicate implementations across feature modules.

### Instructor Tools (REQ-063 to REQ-070)
- REQ-063: An instructor dashboard shows the review queue, stuck-student
  alerts, and upcoming sessions.
- REQ-064: The review queue visually flags submissions waiting beyond a
  defined SLA.
- REQ-065: An instructor can view a specific student's detail page (their own
  cohort's students only).
- REQ-066: An instructor can add a private note to a student's record.
- REQ-067: An instructor cannot view or act on students outside their own
  cohort(s), unless also an admin.
- REQ-068: An instructor's dashboard data queries are scoped to cohorts they
  actually teach — never a platform-wide query.
- REQ-069: All instructor-only actions reject non-instructor, non-admin
  callers.
- REQ-070: All instructor-only pages redirect non-instructor, non-admin users.

### Parent Tools (REQ-071 to REQ-074)
- REQ-071: A parent can link to a student's account (mechanism TBD by
  Antigravity during DISCOVER — flagged as an open design decision, see
  Section 9).
- REQ-072: A parent can view a linked, consented child's progress summary.
- REQ-073: A parent can grant or revoke sharing consent for a linked child.
- REQ-074: A parent cannot view any student they are not linked to.

### Admin Console (REQ-075 to REQ-085)
- REQ-075: An admin can view platform vitals (aggregate stats).
- REQ-076: An admin can view and resolve safety alerts.
- REQ-077: An admin can view and process data deletion requests.
- REQ-078: An admin can search, filter, and view all platform users.
- REQ-079: An admin can change a user's role, providing a mandatory audit
  reason (minimum length enforced).
- REQ-080: An admin can deactivate/reactivate a user account.
- REQ-081: An admin can author, edit, and publish-gate curriculum lessons,
  including an Amharic-certification flag.
- REQ-082: An admin can create and manage cohorts platform-wide.
- REQ-083: An admin can toggle feature flags and configure the AI provider.
- REQ-084: An admin can moderate testimonials before they appear publicly,
  with a mandatory consent check for any testimonial attributed to a minor.
- REQ-085: Every sensitive admin/instructor action is recorded in an
  append-only audit log, viewable by admins.
- REQ-085a: An admin can start/stop an impersonation session, restricted to
  admin role, and every impersonation start/stop is itself audit-logged.

### Safety & Compliance (REQ-086 to REQ-090)
- REQ-086: Any user can submit a "report a concern" safety report from any
  major page.
- REQ-087: Submitted safety reports appear in the admin safety queue.
- REQ-088: A data deletion request, once processed, removes personal data
  per policy while preserving anonymized audit history where legally
  required.
- REQ-089: AI interaction logs are never publicly exposed and are retained
  only as long as policy requires.
- REQ-090: The distress-detection safety layer in the AI copilot cannot be
  disabled by any feature flag or configuration short of an explicit,
  audited admin action.

### Internationalization (REQ-091 to REQ-093)
- REQ-091: Every user-facing string ships in both `en` and `am` before a
  feature is considered complete.
- REQ-092: A user can switch UI language at any time from settings.
- REQ-093: Locale is reflected in the URL path (`/en/...`, `/am/...`).

### Notifications (REQ-094 to REQ-096)
- REQ-094: A user can view their notifications.
- REQ-095: A user can mark one or all notifications as read.
- REQ-096: A notification can only ever be created for the authenticated
  actor's own context, or by trusted server-side logic — never by a
  client-supplied arbitrary target user id.

## 8. Out of Scope for v1 (explicitly, so it's never silently expected)
- Payments/billing
- Real-time chat/messaging between users
- Native mobile apps (web-responsive only)
- Python/game-dev track content (structure exists, full lesson content is
  Phase 2/backlog)
- Attendance recording implementation (schema only in v1)

## 9. Open Design Decisions (Antigravity must resolve during DISCOVER, document
the resolution in this file, and get explicit sign-off before implementing)

**Resolved Decisions:**
- **Parent-Student Linking:** A student or admin generates a link code shown only to the student. The parent redeems it from their dashboard. The student must then explicitly confirm the link on their dashboard before consent is granted. (Safest, most protective interpretation for user data).
- **Curriculum Source of Truth:** Lesson content lives in the **database**. This allows admins to author, edit, and publish-gate curriculum dynamically without requiring code redeploys, satisfying REQ-081 natively. The `lessons` table is the definitive source of truth.
