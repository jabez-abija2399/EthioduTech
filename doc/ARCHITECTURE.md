# ARCHITECTURE.md

## Tech stack (fixed)
| Layer | Choice |
|---|---|
| Framework | Next.js, App Router, TypeScript strict mode |
| UI | React, Tailwind CSS, custom shared primitives per DESIGN_SYSTEM.md |
| Backend/DB | Supabase (Postgres + RLS, Supabase Auth, Storage) |
| i18n | next-intl, locales `en`/`am`, URL-prefixed |
| Validation | Zod on every server action input, no exceptions |
| Email | Transactional SMTP provider (Gmail SMTP acceptable for pilot scale;
document the decision if changed) |
| AI | Server-side LLM adapter; API key never exposed client-side |
| Testing | Vitest (unit/integration), Playwright or equivalent for E2E (see
TESTING_STRATEGY.md) |
| Deploy | Vercel |
| Monitoring | Sentry, fully wired before any real user traffic |

## Folder structure (canonical)
```
app/[locale]/<route>/page.tsx   — thin server components only
features/<name>/server/actions.ts, types.ts, components/
components/ui/, components/shared/, components/navigation/
lib/supabase/, lib/ai/, lib/email/
supabase/migrations/, supabase/seed.sql
tests/unit/, tests/integration/, tests/e2e/
docs/ — living project memory (audits, progress log)
```

## Canonical server action pattern
```typescript
"use server";

export async function someAction(input: SomeInput): Promise<ActionResult<SomeOutput>> {
  const validated = SomeSchema.safeParse(input);
  if (!validated.success) {
    return { ok: false, code: "validation_error", message: validated.error.issues[0]?.message };
  }

  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (!user || authError) {
    return { ok: false, code: "unauthorized", message: "Sign-in required." };
  }

  // Role check (role-gated actions) OR strict self-scoping (own-data actions).
  // Never trust a client-supplied id for the resource being accessed.
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle();
  if (profile?.role !== "instructor" && profile?.role !== "admin") {
    return { ok: false, code: "unauthorized", message: "Instructor access required." };
  }

  try {
    // real logic here
    return { ok: true, data: result };
  } catch {
    return { ok: false, code: "internal_error", message: "An unexpected error occurred." };
  }
}
```
`ActionResult<T> = { ok: true, data: T } | { ok: false, code: string, message: string }`.
Every action returns this shape. No action throws to the client. No action
silently falls back to fake/mock data on a real error.

## Authentication & authorization — defense in depth
Three independent layers, all required, none a substitute for another:
1. **Middleware** — session refresh + coarse route-level role guard.
2. **Server action** — explicit auth + role/scope check per the pattern above.
3. **Database RLS** — the last line of defense if the above two are ever
   bypassed by a bug.

## Data flow example (lesson completion)
```
Lesson player (client) → updateLearningProgress(stepId, result)
  → validate → authenticate → scope write to auth user's own id
  → write to `progress` → return updated state
  → client re-renders; dashboard/journey map reflect it on next fetch
```

## Curriculum content — decision required
Lesson content must live in exactly one source of truth: either the `lessons`
database table, or static application code — never partially in both with
one side unused. Antigravity must resolve this during DISCOVER (see
MASTER_SPEC.md Section 9) and document the resolution here before building
curriculum-dependent features.

## Engineering rules
- TypeScript strict mode; zero `any` casts on Supabase query results — type
  responses explicitly.
- No hardcoded fallback IDs or silent placeholder defaults anywhere.
- No duplicate implementations of the same server action across two feature
  modules (if found, consolidate to one canonical location and delete the
  other, confirming nothing else references it).
- Every new server action ships with tests covering success, unauthorized,
  and wrong-role/IDOR paths as applicable.
