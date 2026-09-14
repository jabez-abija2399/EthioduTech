# USER_FLOWS.md

## FLOW-001 — Sign-Up (with optional cohort join code)
**Actor:** Prospective student or parent
**Starting condition:** Not authenticated, on landing or sign-up page
**Steps:**
1. Actor selects role (student/parent), enters name/email/password, optionally
   a join code.
2. System validates the join code FIRST, before creating any account, if one
   was provided.
3. On invalid code: show error, create nothing, actor may correct and retry.
4. On valid or blank code: create auth user + profile (+ membership if
   applicable).
5. System attempts to send a 6-digit verification email.
6. On success: redirect to verify-code page.
7. On failure: return a clear, actionable error with a path to retry or go to
   verify-code manually — never a silent false-success.
**Decision points:** join code present/valid/invalid; email exists already
(verified vs. unverified); email dispatch success/failure.
**Success state:** actor lands on verify-code page with a real code en route.
**Failure states:** invalid join code (nothing created); email already
registered and verified (nothing created, directed to sign-in); email
dispatch failure (account may exist, actor is told exactly what to do next).
**Permissions:** public.
**Data created:** `auth.users` row, `profiles` row, optionally
`cohort_memberships` row, `email_verifications` row.
**Notifications:** verification email.
**Expected UI:** FEAT-001 UI requirements.

## FLOW-002 — Email Verification & Recovery
**Actor:** User with a pending unverified account
**Steps:** enter 6-digit code → verifyCodeAction → on success, mark verified
and redirect (onboarding for signup, reset-password screen for password
reset purpose) → on failure, show specific error (expired/wrong code) and
allow resend (rate-limited).
**Alternative path:** actor lost/never received the first code → resend →
if account still unverified, a fresh code is generated and sent.
**Success state:** account marked verified, redirected onward.
**Failure state:** repeated wrong codes; rate-limited resend shows a countdown,
not a dead end.

## FLOW-003 — Sign-In & Role Routing
**Actor:** Any existing user
**Steps:** enter email/password → signInAction → on success, profile role
looked up → redirect to role home (student: dashboard, instructor: dashboard,
parent: dashboard, admin: console).
**Alternative path:** unconfirmed email → redirected to verify-code instead
of a generic error.
**Failure state:** wrong password → inline error, no account enumeration
(same generic message whether email exists or not).

## FLOW-004 — First-Time Onboarding
**Actor:** Newly verified student
**Steps:** language → nickname → grade band → track preference → save →
redirect to first lesson.
**Success state:** profile updated, first lesson opens.
**Failure state:** empty nickname blocked inline before submit is possible.

## FLOW-005 — Curriculum Browsing
**Actor:** Student or public visitor
**Steps:** open journey map or catalog → view tracks/lessons → (student)
progress reflected on nodes → click a lesson → enters FLOW-006.
**Alternative path:** visitor without an account can browse the catalog but
sees no personalized progress and is prompted to sign up to start.

## FLOW-006 — Lesson Completion (Core Loop)
**Actor:** Student
**Steps:**
1. Explain step (read/short intro).
2. Interactive step: write code, see live preview, request AI help if stuck.
3. Checkpoint: submit for lenient evaluation; on fail, see specific diff and
   retry; on pass, continue.
4. Reflection: write a short response, required before completion.
5. Lesson marked complete → progress updated → next lesson unlocked.
**Decision points:** AI help requested (may trigger distress-safe-reply
path instead of coding help); checkpoint pass/fail.
**Data created/changed:** `progress`, `interactive_step_attempts`,
`ai_interactions`.
**Expected UI:** FEAT-007, FEAT-008 UI requirements.

## FLOW-007 — Returning to Dashboard
**Actor:** Student, any subsequent visit
**Steps:** open dashboard → see continue-CTA pointing at next incomplete
step, recent progress %, any instructor feedback card.
**Alternative path:** zero progress (first visit) → distinct empty-state
dashboard, not blank/broken.

## FLOW-008 — Project Submission & Review
**Actor:** Student (submits), Instructor (reviews)
**Steps (student):** open project brief → edit code in workspace (autosaves
continuously) → write reflection → submit → see status change to "submitted."
**Steps (instructor):** open review queue → select a submission → inspect
code/live preview → score 5-dimension rubric → write feedback → approve or
request changes → student notified.
**Decision points:** reflection empty (blocks submit); reviewer role check
(non-instructor/admin blocked); approve vs. needs-changes (needs-changes
returns student to workspace with feedback visible).
**Data created/changed:** `submissions`, `submission_reviews`,
`portfolio_projects` (on approval), a notification.
**Failure state:** a non-instructor attempting to call the review action is
rejected server-side regardless of any client-side UI restriction.

## FLOW-009 — Portfolio Visibility & Public Sharing
**Actor:** Student (owner), Parent (consent), Public (viewer)
**Steps:** project approved → appears privately on student portfolio →
student requests public visibility → blocked unless guardian consent exists
→ parent grants consent (FLOW-012) → student can now toggle visibility →
public link becomes viewable.
**Failure state:** visiting a public portfolio URL without valid
consent/visibility returns not-found, never partial data.

## FLOW-010 — Cohort Creation & Join
**Actor:** Instructor/Admin (creates), Student (joins via FLOW-001)
**Steps:** instructor/admin creates cohort with track/age-band/dates →
optionally sets/receives a join code → shares code with students → students
enroll via sign-up (FLOW-001).

## FLOW-011 — Instructor Reviewing Stuck Students
**Actor:** Instructor
**Steps:** dashboard shows stuck-student alerts (e.g. repeated checkpoint
failures or long submission wait) → instructor opens student detail →
reviews progress/notes → may schedule a live session or add a private note.
**Permissions:** instructor sees only their own cohort's students.

## FLOW-012 — Parent Linking & Consent
**Actor:** Parent, Student
**Steps:** (mechanism per MASTER_SPEC.md Section 9 resolution) parent
initiates or redeems a link to a specific student, requiring student-side or
admin-side confirmation → link established → parent dashboard populates →
parent can grant/revoke sharing consent per project.
**Failure state:** an unconfirmed or unlinked parent sees no student data.

## FLOW-013 — Admin Governance Actions
**Actor:** Admin
**Steps (representative):** open user management → search for a user →
change role with a mandatory reason (min length enforced) → action recorded
in audit log → (if relevant) affected user's access changes take effect on
next request via middleware role check.
**Permissions:** every step admin-only, verified server-side regardless of
UI.

## FLOW-014 — Safety Report Handling
**Actor:** Any authenticated user (reports), Admin (resolves)
**Steps:** user opens "report a concern" from any page → submits →
appears in admin safety queue → admin reviews and resolves, action logged.

## FLOW-015 — Notifications
**Actor:** Any authenticated user
**Steps:** system-triggered event (e.g. review completed) creates a
notification scoped to the affected user only → user views notification list
→ marks read (single or all).
