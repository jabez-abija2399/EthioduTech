# FEATURE_REGISTRY.md

Every feature below is fully specified. No feature may be marked complete
without satisfying every acceptance criterion listed. Antigravity may add
sub-features discovered during DISCOVER, but must not remove or narrow any
listed here without recording it in `tasks/BLOCKED.md`.

---

## FEAT-001 — Account Registration
**Requirements:** REQ-001 to REQ-005
**Roles:** Public (unauthenticated)
**Dependencies:** Supabase Auth, `profiles` table, `cohorts`/`cohort_memberships`
**User flow:** FLOW-001
**UI requirements:** Sign-up form (role toggle student/parent, name, email,
password, optional join code field), inline validation errors, loading state
on submit, distinct error message for invalid join code vs. other errors.
**Backend requirements:** `signUpAction` server action — validates join code
BEFORE creating any auth account; on valid/blank code proceeds to create
account + profile + (if applicable) cohort membership.
**Database requirements:** `profiles`, `cohorts.join_code` (unique index on
`upper(join_code)`, partial WHERE join_code IS NOT NULL), `cohort_memberships`.
**API/Action requirements:** `signUpAction(input): ActionResult<{redirectUrl}>`
**Business rules:** RULE-005, RULE-006, RULE-010
**Validation rules:** email format, password minimum length, display name
non-empty, join code trimmed/uppercased before lookup.
**Error states:** invalid join code (blocks creation), email already
registered+verified, email dispatch failure (see FEAT-003), generic validation
errors per field.
**Loading states:** submit button shows spinner, disabled during submission.
**Empty states:** N/A (form-based).
**Security requirements:** no account or membership created on invalid join
code; rate limiting on repeated sign-up attempts from same IP/email.
**Acceptance criteria:**
1. Valid join code → account created and cohort membership row exists.
2. Invalid join code → no auth user, no profile row created; clear error shown.
3. Blank join code → account created normally, no membership row.
4. Case-insensitive join code match confirmed (`abc-123` matches `ABC-123`).
**Tests required:** TEST-005 through TEST-008 (see TESTING_STRATEGY.md).
**Definition of done:** Gate A + Gate B in QUALITY_GATES.md.

---

## FEAT-002 — Cohort Join-Code Enrollment
**Requirements:** REQ-002 to REQ-005, REQ-056, REQ-057
**Roles:** Public (at sign-up), Instructor/Admin (creating cohorts/codes)
**Dependencies:** FEAT-001, FEAT-012
**User flow:** FLOW-001
**UI requirements:** join code field on sign-up form; per-cohort join code
display in instructor cohort management UI.
**Backend requirements:** case-insensitive lookup against `cohorts.join_code`;
membership insert scoped to the new user's id.
**Database requirements:** see FEAT-001; migration must be drafted and shown
for human approval before being applied (Constitution Section 10).
**Business rules:** RULE-010 (no destructive rollback on partial failure —
report clearly instead).
**Error states:** join code not found, membership insert fails after account
creation (report clearly, do not delete the account).
**Acceptance criteria:** see FEAT-001 acceptance criteria 1–4.
**Tests required:** TEST-005 through TEST-008.
**Definition of done:** Gate A + Gate B.

---

## FEAT-003 — Email Verification & Delivery
**Requirements:** REQ-006 to REQ-009
**Roles:** Public
**Dependencies:** Gmail SMTP (or equivalent transactional provider),
`email_verifications` table.
**User flow:** FLOW-002
**UI requirements:** 6-digit code entry screen with auto-advance inputs,
resend-code control with rate-limit-aware disabled state, clear link to
verification page from any dispatch-failure error banner.
**Backend requirements:** `sendVerificationCodeAction`, `verifyCodeAction`.
Production: dispatch failure returns `ok:false` honestly. Development:
dispatch failure logs the code loudly and returns `ok:true` for local
convenience only.
**Database requirements:** `email_verifications` (email, code_hash, purpose,
verified, expires_at).
**Business rules:** RULE-007 (never store plaintext codes), RULE-008 (codes
expire), RULE-009 (rate limit resend).
**Error states:** SMTP not configured (production hard-fails, dev logs),
expired code, wrong code, rate-limited resend.
**Acceptance criteria:**
1. Production with valid SMTP credentials: a real email is delivered and the
   code in it verifies successfully.
2. Production with missing/invalid SMTP credentials: sign-up reports failure
   honestly, does not claim success.
3. An unverified existing account can retry and receive a new code without
   being blocked by "already registered."
4. A verified existing account attempting sign-up again is correctly blocked
   with "already registered," unchanged from before this feature existed.
**Tests required:** TEST-009 through TEST-013.
**Definition of done:** Gate A + Gate B.

---

## FEAT-004 — Sign-In, Session, and Role-Based Routing
**Requirements:** REQ-010 to REQ-015
**Roles:** All
**Dependencies:** Supabase Auth, `lib/supabase/middleware.ts`
**User flow:** FLOW-001, FLOW-003
**UI requirements:** sign-in form, "forgot password" link, sign-out control
available from every authenticated page's navigation.
**Backend requirements:** `signInAction`, `signOutAction`,
`requestPasswordResetAction`, `resetPasswordWithCodeAction`. Middleware
refreshes session and enforces role-based route access on every request.
**Business rules:** RULE-003 (auth+authz mandatory everywhere).
**Error states:** wrong password, unconfirmed email (redirect to verify-code,
not a dead-end error), unauthorized role for requested route.
**Acceptance criteria:**
1. Each role, after sign-in, lands on its correct home route.
2. An unauthenticated request to any protected route redirects to sign-in.
3. A wrong-role request to a protected route (e.g. student → /admin)
   redirects with a clear unauthorized indication, never a raw 500 or blank
   page.
**Tests required:** TEST-014 through TEST-018.
**Definition of done:** Gate A + Gate B.

---

## FEAT-005 — Student Onboarding
**Requirements:** REQ-016 to REQ-020
**Roles:** Student (post-verification, pre-first-lesson)
**Dependencies:** FEAT-001
**User flow:** FLOW-004
**UI requirements:** language toggle, nickname input, grade-band selector,
track-preference selector, all validated before submit.
**Backend requirements:** `saveOnboarding` action updates `profiles`.
**Error states:** empty nickname blocked with inline message.
**Acceptance criteria:** completing onboarding redirects to the first lesson
of the selected track, and the dashboard reflects onboarding-derived data
(locale, grade band) afterward.
**Tests required:** TEST-019, TEST-020.
**Definition of done:** Gate A + Gate B.

---

## FEAT-006 — Curriculum Browsing & Journey Map
**Requirements:** REQ-021 to REQ-023
**Roles:** Student, Public (catalog browsing)
**Dependencies:** curriculum content source (see MASTER_SPEC.md Section 9
open decision on DB vs static content)
**User flow:** FLOW-005
**UI requirements:** visual journey map with locked/unlocked visual states,
course catalog list with syllabus accordion.
**Backend requirements:** `getJourneyMapData`, `getCourseCatalogData` — both
must merge real progress data with curriculum structure, scoped to the
requesting user's own progress.
**Acceptance criteria:** a student's actual completed-lesson state correctly
unlocks the next node on the map; an unauthenticated visitor can browse the
catalog but not see personalized progress.
**Tests required:** TEST-021 through TEST-023.
**Definition of done:** Gate A + Gate B.

---

## FEAT-007 — Lesson Player (Core Learning Loop)
**Requirements:** REQ-024 to REQ-030
**Roles:** Student
**Dependencies:** FEAT-006, code editor component, live preview sandbox,
lenient checker engine
**User flow:** FLOW-006
**UI requirements:** step sequence (explain → interactive → checkpoint →
reflection), real syntax-highlighting code editor, live iframe preview with
error translation, checkpoint feedback UI.
**Backend requirements:** `updateLearningProgress`; interactive step code
changes persist via a real write path — the editor's "saved" indicator must
be wired to an actual successful server round trip, not a local timer.
**Business rules:** RULE-011 (autosave must be real).
**Error states:** checkpoint failure shows a specific, plain-language diff
of what's different — never just "incorrect."
**Acceptance criteria:**
1. Refreshing the page mid-lesson does not lose code written in the last
   completed autosave cycle.
2. A failing checkpoint attempt names what's actually different, using the
   lenient/intent-based checker, not exact string match.
3. Runtime errors in the live preview render as a plain-language hint.
**Tests required:** TEST-024 through TEST-032.
**Definition of done:** Gate A + Gate B.

---

## FEAT-008 — AI Copilot (Socratic Assistant)
**Requirements:** REQ-031 to REQ-034
**Roles:** Student
**Dependencies:** a real LLM provider integration (server-side only, never
called directly from the client), existing distress-detection rule layer
**User flow:** FLOW-006
**UI requirements:** "I'm stuck" control, chat-style response panel.
**Backend requirements:** server route grounds the LLM prompt in the
student's actual current code and message; distress-detection runs BEFORE
any LLM call and, if triggered, bypasses the LLM entirely in favor of the
existing safe-reply content.
**Business rules:** RULE-004 (no fake functionality), RULE-012 (distress
layer cannot be weakened), RULE-013 (never output a full solution).
**Security requirements:** LLM provider credentials never exposed to the
client; all prompts and responses logged to `ai_interactions` (never
publicly readable) for safety review.
**Acceptance criteria:**
1. Two students asking about different bugs in different code receive
   demonstrably different, code-specific responses (not identical canned text).
2. A message matching a distress pattern (en or am) never reaches the LLM
   and always returns the safe-reply content.
3. No response contains a complete, directly-pasteable solution to the
   current exercise (spot-checked in tests with representative prompts).
**Tests required:** TEST-033 through TEST-038.
**Definition of done:** Gate A + Gate B.

---

## FEAT-009 — Progress Tracking & Dashboard
**Requirements:** REQ-035 to REQ-040
**Roles:** Student
**Dependencies:** FEAT-007
**User flow:** FLOW-006, FLOW-007
**UI requirements:** dashboard with continue-CTA, progress summary,
instructor feedback card, distinct empty state for zero-progress students.
**Backend requirements:** `getStudentDashboardData`, `updateLearningProgress`
— both scoped strictly to the authenticated user's own id.
**Acceptance criteria:** a brand-new student sees an encouraging empty state,
not a blank/broken dashboard; progress updates are visible on next load
without manual refresh tricks.
**Tests required:** TEST-039 through TEST-041.
**Definition of done:** Gate A + Gate B.

---

## FEAT-010 — Projects, Workspace & Submission Review
**Requirements:** REQ-041 to REQ-050
**Roles:** Student (workspace/submit), Instructor/Admin (review)
**Dependencies:** FEAT-007, rubric definitions
**User flow:** FLOW-008
**UI requirements:** project brief view, multi-file workspace with live
preview, reflection field (blocks submit until non-empty), instructor
rubric-scoring UI with feedback text and approve/needs-changes controls.
**Backend requirements:** `createOrUpdateSubmissionDraft` (real debounced
persistence), `submitProject`, `getSubmissionForReview`, `reviewSubmission`
(instructor/admin only — role check mandatory, this is the canonical
authorization pattern for the whole codebase), `createNotification` on
review completion (scoped to the submission's own student, never a
client-supplied arbitrary user id).
**Business rules:** RULE-003, RULE-011.
**Error states:** attempted submission with empty reflection blocked
client-side and server-side; non-instructor/non-owner attempting review
rejected with a clear unauthorized error.
**Acceptance criteria:**
1. A non-instructor, non-admin caller cannot successfully call
   `reviewSubmission` under any circumstance — verified by test.
2. Draft code is retrievable after a simulated disconnect/refresh.
3. Student receives a notification immediately after review completion.
**Tests required:** TEST-042 through TEST-050.
**Definition of done:** Gate A + Gate B.

---

## FEAT-011 — Student Portfolio (Private/Public)
**Requirements:** REQ-051 to REQ-055
**Roles:** Student (owner), Parent (consent management), Public (consented
view only)
**Dependencies:** FEAT-010, guardian consent mechanism (FEAT-014)
**User flow:** FLOW-009
**UI requirements:** private portfolio grid, visibility toggle per project
(disabled/explained when consent is missing), public guest view.
**Backend requirements:** `getStudentPortfolio`, `updatePortfolioVisibility`
(blocked unless verified consent exists), `getPublicPortfolio` (returns
not-found, not an error page, when visibility/consent conditions aren't met).
**Business rules:** RULE-001, RULE-002.
**Security requirements:** the public portfolio query must never be
constructible to leak private project data via parameter manipulation —
covered explicitly in SECURITY.md and tested.
**Acceptance criteria:**
1. A project defaults to private on approval; no action is required to keep
   it private.
2. Attempting to make a project public without consent is blocked with a
   clear explanation, not a silent no-op.
3. A public portfolio URL for a student without consent/visibility returns
   not-found, never partial or full private data.
**Tests required:** TEST-051 through TEST-054.
**Definition of done:** Gate A + Gate B.

---

## FEAT-012 — Cohort Management & Live Sessions
**Requirements:** REQ-056 to REQ-062
**Roles:** Instructor (own cohorts), Admin (all cohorts)
**Dependencies:** FEAT-002
**User flow:** FLOW-010
**UI requirements:** cohort creation form (admin), roster view (instructor,
scoped to own cohorts), live session scheduling modal.
**Backend requirements:** ONE canonical `scheduleLiveSession` implementation
— the existing duplicate across two feature modules must be resolved (keep
one, delete the other, confirm nothing else references the deleted one)
before this feature is marked complete.
**Acceptance criteria:**
1. Exactly one implementation of live session scheduling exists in the
   codebase.
2. An instructor can only see/manage rosters and sessions for cohorts they
   actually teach.
**Tests required:** TEST-055 through TEST-059.
**Definition of done:** Gate A + Gate B.

---

## FEAT-013 — Instructor Dashboard & Review Tools
**Requirements:** REQ-063 to REQ-070
**Roles:** Instructor, Admin
**Dependencies:** FEAT-010, FEAT-012
**User flow:** FLOW-011
**UI requirements:** dashboard with review queue (SLA-flagged), stuck-student
alerts, student detail view with private notes field.
**Backend requirements:** every instructor action scoped to cohorts the
caller actually teaches (never a platform-wide query for a non-admin
instructor); mandatory role check on every action per REQ-069.
**Security requirements:** IDOR check — an instructor cannot view a
student's detail page or notes for a student outside their own cohort by
manipulating a URL/id parameter.
**Acceptance criteria:**
1. Every function in `features/instructor/server/actions.ts` rejects
   non-instructor, non-admin callers — verified individually by test, not
   just described.
2. An instructor cannot retrieve data for a student outside their cohort by
   supplying that student's id directly.
**Tests required:** TEST-060 through TEST-066.
**Definition of done:** Gate A + Gate B.

---

## FEAT-014 — Parent Portal & Guardian Consent
**Requirements:** REQ-071 to REQ-074
**Roles:** Parent
**Dependencies:** `parent_student_links` table, FEAT-011
**User flow:** FLOW-012
**UI requirements:** child-linking flow (mechanism per MASTER_SPEC.md
Section 9 resolution), progress dashboard, consent grant/revoke controls.
**Backend requirements:** `updateGuardianConsent`, `getParentDashboardData`
— both scoped strictly to links belonging to the authenticated parent.
**Business rules:** RULE-002.
**Acceptance criteria:** a parent cannot view or influence any student they
are not linked to, under any input manipulation.
**Tests required:** TEST-067 through TEST-070.
**Definition of done:** Gate A + Gate B.

---

## FEAT-015 — Admin Console (Full Governance)
**Requirements:** REQ-075 to REQ-085a
**Roles:** Admin only
**Dependencies:** `admin_audit_log`, `safety_flags`, `feature_flags`,
`testimonials`
**User flow:** FLOW-013
**UI requirements:** vitals dashboard, safety alert queue, data-deletion
queue, user management (search/filter/role-change/deactivate), curriculum
authoring gate, cohort management, feature flags, review moderation,
impersonation controls, audit log viewer.
**Backend requirements:** EVERY function in
`features/admin/server/actions.ts` must check `profile.role === 'admin'`
explicitly — this module currently has the highest concentration of
authorization gaps found in the project's history and must be treated as
maximally sensitive.
**Business rules:** RULE-014 (audit log is append-only, no role including
admin may update/delete entries), RULE-015 (role changes require a
minimum-length reason, itself audit-logged).
**Security requirements:** admin-only actions must reject unauthenticated
AND non-admin-authenticated callers — both cases have historically been
found unprotected and must be explicitly tested for both.
**Acceptance criteria:**
1. Every admin action rejects an unauthenticated caller.
2. Every admin action rejects an authenticated non-admin caller.
3. Every role change and impersonation start/stop produces an audit log
   entry.
4. The audit log has no update or delete path, verified by attempting one in
   a test and confirming it's rejected or structurally impossible.
**Tests required:** TEST-071 through TEST-085.
**Definition of done:** Gate A + Gate B.

---

## FEAT-016 — Safety & Compliance Tools
**Requirements:** REQ-086 to REQ-090
**Roles:** All (reporting), Admin (resolution)
**Dependencies:** FEAT-015
**User flow:** FLOW-014
**UI requirements:** "report a concern" modal accessible from every major
page, admin safety queue.
**Backend requirements:** `submitConcernReport`, `resolveSafetyAlert`
(admin-only), `processDataDeletion` (admin-only, logs the action, preserves
legally-required anonymized audit trail).
**Acceptance criteria:** a report submitted by any authenticated role
reaches the admin queue; the distress-detection layer (FEAT-008) cannot be
disabled by any feature flag.
**Tests required:** TEST-086 through TEST-089.
**Definition of done:** Gate A + Gate B.

---

## FEAT-017 — Internationalization (EN/AM)
**Requirements:** REQ-091 to REQ-093
**Roles:** All
**Dependencies:** next-intl, `messages/en.json`, `messages/am.json`
**Cross-cutting:** applies to every other feature; not independently
schedulable — enforced as part of Gate A for every task.
**Acceptance criteria:** no PR/task is marked complete with any hardcoded
English (or Amharic) string that should be locale-aware.
**Tests required:** TEST-090, TEST-091 (automated check for missing message
keys between locale files).
**Definition of done:** Gate A, applied continuously.

---

## FEAT-018 — Notifications
**Requirements:** REQ-094 to REQ-096
**Roles:** All
**Dependencies:** FEAT-010 (triggers on review completion)
**User flow:** FLOW-015
**UI requirements:** notification list, mark-read controls.
**Backend requirements:** `createNotification` must never accept a
client-supplied target user id for a client-facing call path — restrict to
the caller's own id, or convert to an internal-only function called from
trusted server code (e.g. from within `reviewSubmission`).
**Security requirements:** this action was historically found to allow
spoofing notifications for arbitrary users — treat as high-priority to get
right, with an explicit test proving a user cannot create a notification
targeting a different user's id.
**Acceptance criteria:** verified by the security test above.
**Tests required:** TEST-092 through TEST-094.
**Definition of done:** Gate A + Gate B.

---

## Backlog features (tracked, scheduled post-v1 — see MASTER_SPEC.md Section 8)
- FEAT-019 — Live Session Attendance Recording
- FEAT-020 — Python Track (real execution via Pyodide)
- FEAT-021 — Game-Dev Track
- FEAT-022 — GitHub Integration
