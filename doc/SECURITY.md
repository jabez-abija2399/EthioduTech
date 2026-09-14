# SECURITY.md

## Authentication
- Supabase Auth for all account/session management. No custom password
  storage anywhere in application code.
- Sessions refreshed via middleware on every request; expired sessions
  redirect to sign-in cleanly.

## Authorization / RBAC
- Three-layer defense in depth: middleware route guard → server action
  check → database RLS. All three must independently enforce the correct
  access, per `ARCHITECTURE.md`.
- Every server action is treated as a public HTTP endpoint for threat-
  modeling purposes, regardless of whether the UI currently exposes a way to
  call it — an unprotected action is exploitable directly, UI or not.
- IDOR prevention: any action accepting an id referring to another user's
  resource (studentId, submissionId, cohortId) must verify the caller's
  relationship to that resource server-side — never trust that the client
  only ever sends "correct" ids.

## Session management
- No session tokens or secrets logged anywhere, including error logs.
- Sign-out fully invalidates the session; failures during sign-out are
  reported honestly, not silently treated as success.

## Secrets & environment variables
- No secret ever committed to the repository, including in `.env.local`
  example files (use `.env.example` with placeholder names only, never real
  values).
- Production secrets (JWT signing secret, AI provider keys, SMTP
  credentials) must be real, unique, and rotated from any development
  placeholder before Gate D in `QUALITY_GATES.md`.
- Credentials are never logged, including in error messages — a failed SMTP
  auth error, for example, must not echo the password back in any log line.

## Input validation
- Every server action validates its input with Zod before touching the
  database. No action trusts client-shaped data without schema validation.

## Injection / XSS
- All database access via the Supabase client's parameterized query builder
  — no raw string-concatenated SQL anywhere.
- Any user-generated content rendered in the UI (reflections, feedback,
  notes, testimonials) is rendered as text, never as raw HTML, unless
  explicitly sanitized through a vetted library for a specific rich-text
  feature (none exist in v1 scope).

## File upload security
- No general file-upload feature exists in v1 scope (curriculum images are
  admin/AI-generated, not user-uploaded). If added later, this document must
  be extended first with type/size validation and storage isolation rules
  before implementation begins.

## Rate limiting
- Applied to: sign-up, sign-in, password reset request, verification code
  send/resend. Recommend a sliding window (e.g. 5 attempts per 15 minutes
  per IP+email combination) — exact limits confirmed during implementation
  and documented here once set.

## Data isolation
- Student data isolation: a student's queries never return another
  student's data, verified per-action in tests (RULE-003, RULE-018).
- Instructor isolation: scoped to cohorts actually taught (RULE-016).
- Parent isolation: scoped to consented, linked students only.

## Sensitive data handling
- Verification codes: hashed at rest (RULE-007).
- AI interaction logs: never publicly readable, retained per a defined
  policy (Antigravity to propose a retention period during implementation
  and record it here — recommend no longer than necessary for safety review
  purposes, e.g. 90 days, subject to human confirmation).
- Guardian consent records: treated as sensitive; changes are logged.

## Audit trail
- `admin_audit_log` is append-only at the database grant level (RULE-014).
- Every role change, impersonation start/stop, and data deletion is logged
  with actor, action, target, and (for role changes) a mandatory reason.

## Dependency security
- Before Gate D, run a dependency vulnerability scan (e.g. `npm audit` or
  equivalent) and resolve any HIGH/CRITICAL findings, or document an
  explicit, reviewed exception if a fix isn't yet available upstream.

## Child-specific safety requirements
- Portfolio visibility defaults to private (RULE-001); public exposure
  requires verified, revocable guardian consent (RULE-002).
- AI copilot distress-detection cannot be disabled (RULE-012).
- Any testimonial or public content attributable to a minor requires
  explicit consent verification before admin approval (FEAT-015).

## Security acceptance criteria (checked before Gate D)
1. A full manual (not only automated-script) authorization audit of every
   server action shows zero unauthenticated-access gaps and zero
   wrong-role-access gaps.
2. A full RLS audit shows every table with user data has RLS enabled and a
   correctly-scoped policy, verified against actual policy definitions, not
   assumed from table presence.
3. No hardcoded fallback IDs or placeholder credentials remain in the
   codebase.
4. No secret appears in git history, logs, or error messages.
5. IDOR tests exist and pass for every action accepting a foreign-owned
   resource id.
