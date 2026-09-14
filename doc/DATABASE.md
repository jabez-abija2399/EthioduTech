# DATABASE.md

Every table must have RLS enabled with a policy no more permissive than
described. `USING (true)` on user data is never acceptable except where
explicitly marked intentionally public. Every migration ships its RLS policy
in the same file that creates the table — never as a later, separate step.

## profiles
id (uuid, PK, = auth.users.id), role (enum: student|instructor|parent|admin),
display_name (text, required), locale (text, default 'en'), grade_band
(text, nullable), created_at (timestamptz).
RLS: user reads/updates own row; admin actions read/update via explicit
role-checked server action, never a blanket admin policy that bypasses
audit logging.

## parent_student_links
id (uuid, PK), parent_id (FK→profiles), student_id (FK→profiles),
consent_status (enum: pending|granted|revoked), created_at.
RLS: parent reads own links; student reads links referencing them; unique
constraint on (parent_id, student_id).
Indexes: parent_id, student_id.

## tracks
id (uuid, PK), name (text), age_band (text), locale copy fields.

## curricula
id (uuid, PK), track_id (FK→tracks), version metadata.

## lessons
id (uuid, PK), track_id (FK→tracks), slug (text, unique), order (int),
content refs. **Source-of-truth decision required — see ARCHITECTURE.md.**

## rubrics
id (uuid, PK), project_id (FK→projects), dimension definitions (5-dimension,
0–4 scale) as jsonb or a normalized child table — Antigravity to decide
based on query patterns, document choice here.

## cohorts
id (uuid, PK), name (text), track_id (FK→tracks, ON DELETE RESTRICT),
age_band (text, CHECK constraint), starts_at (date), ends_at (date),
join_code (text, nullable). Unique index: `CREATE UNIQUE INDEX ON cohorts
(upper(join_code)) WHERE join_code IS NOT NULL` — NOT a plain column UNIQUE
constraint, to correctly support case-insensitive matching without allowing
case-variant duplicates.
created_at (timestamptz).

## sections
id (uuid, PK), cohort_id (FK→cohorts), section metadata.

## cohort_memberships
id (uuid, PK), cohort_id (FK→cohorts, ON DELETE CASCADE), profile_id
(FK→profiles, ON DELETE CASCADE), role_in_cohort (enum: student|instructor),
section_id (FK→sections, ON DELETE SET NULL, nullable), created_at.
UNIQUE(cohort_id, profile_id). Index on profile_id for fast "my cohorts"
lookups; index on cohort_id for roster queries.
RLS: member reads own membership; instructor reads memberships for cohorts
where they hold role_in_cohort='instructor'; admin reads all.

## progress
id (uuid, PK), profile_id (FK→profiles), lesson_id (FK→lessons), step
(text), status (enum), updated_at.
RLS: strictly `profile_id = auth.uid()` for student read/write; instructor
read-only for students in their own cohort (join through
cohort_memberships); admin read all.
Index: (profile_id, lesson_id).

## interactive_step_attempts
id (uuid, PK), profile_id (FK→profiles), step_id (text), code_snapshot
(text/jsonb), result (jsonb), created_at.
RLS: same pattern as `progress`.

## projects
id (uuid, PK), track_id (FK→tracks), brief content, rubric_id (FK→rubrics).

## submissions
id (uuid, PK), project_id (FK→projects), student_id (FK→profiles),
code_snapshot (jsonb), revision_history (jsonb), paste_event_log (jsonb),
reflection (text, nullable until submit), state (enum:
draft|submitted|approved|needs_changes), updated_at.
RLS: student full access to own row; instructor read/write scoped to
submissions from students in their own cohort only (never platform-wide for
non-admins); admin all.
Index: student_id, project_id, state (for review-queue queries).

## submission_reviews
id (uuid, PK), submission_id (FK→submissions), instructor_id (FK→profiles),
rubric_scores (jsonb), feedback (text), needs_live_checkin (boolean),
created_at.
RLS: write restricted to instructor/admin role via server action AND RLS
policy (defense in depth — RULE-003); students read reviews of their own
submissions.

## portfolio_projects
id (uuid, PK), student_id (FK→profiles), submission_id (FK→submissions),
visibility (enum: private|public, DEFAULT 'private' — see RULE-001),
description (text).
RLS: public SELECT only where `visibility='public' AND EXISTS (verified,
active guardian_consent for student_id)` — this check belongs in the RLS
policy itself, not only in application code, per defense-in-depth.

## live_sessions
id (uuid, PK), cohort_id (FK→cohorts), scheduled_at (timestamptz),
meeting_url (text).

## live_session_attendance (backlog feature — schema only in v1)
id (uuid, PK), session_id (FK→live_sessions), profile_id (FK→profiles),
status (enum: present|absent|excused). No application code exists yet;
FEAT-019 will build `RecordAttendanceSchema` + `recordAttendance` action +
UI when scheduled. Do not build a test file referencing code that doesn't
exist — this exact mistake occurred previously in this project's history.

## help_requests
id (uuid, PK), profile_id (FK→profiles), ai_interaction_id (FK, nullable),
status (enum).

## ai_interactions
id (uuid, PK), profile_id (FK→profiles), prompt (text), response (text),
mode (text), flagged_distress (boolean), created_at.
RLS: never publicly readable under any role except admin (for safety
review) — no student-facing read policy at all, even for their own rows,
unless explicitly required by a future privacy-request feature (flag to
human if this becomes necessary).

## email_verifications
id (uuid, PK), email (text), code_hash (text — hash, never plaintext, see
RULE-007), purpose (enum: signup|password_reset), verified (boolean),
expires_at (timestamptz), created_at.
Index: (email, purpose) for lookup performance.

## admin_audit_log
id (uuid, PK), actor_id (FK→profiles), action (text), target_id (uuid,
nullable), reason (text, nullable), created_at.
RLS: admin SELECT only. No UPDATE or DELETE grant/policy for any role
(RULE-014) — enforce this at the Postgres grant level, not only via RLS,
so it's structurally impossible even for a service-role bug to violate.

## safety_flags
id (uuid, PK), reporter_id (FK→profiles), subject_id (uuid, nullable),
category (text), status (enum), created_at.
RLS: reporter can create and read own reports; admin reads/updates all.

## feature_flags
id (uuid, PK), key (text, unique), enabled (boolean), updated_by
(FK→profiles), updated_at.
RLS: public SELECT of enabled flags acceptable (needed for client feature
gating); admin-only write.

## testimonials
id (uuid, PK), author_id (FK→profiles, nullable for anonymous), content
(text), status (enum: pending|published|rejected), created_at.
RLS: public SELECT where status='published'; author can create/read own;
admin moderates all.

## Migration discipline
- One migration per logical change: `YYYYMMDDHHMMSS_description.sql`.
- Never edit an applied migration — write a new one.
- Every migration is drafted and shown in full for human review before being
  applied to any shared environment (AGENT_CONSTITUTION.md Section 10).
- RLS policy ships in the same migration as the table it protects.
