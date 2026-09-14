# DEPLOYMENT.md

## Environments
- **Local/dev** — developer machine, dev-mode email fallback permitted
  (loud console log, never silent) per RULE-004/FEAT-003.
- **Staging** — mirrors production configuration, real (but non-production)
  Supabase project, real SMTP sending to a test inbox, used for E2E and
  manual QA before any pilot cohort touches the system.
- **Production** — real Supabase project, real SMTP, real monitoring, real
  secrets. No placeholder values permitted (Gate D).

## Deployment target
Vercel, connected to the main branch. Preview deployments per pull request
for review before merge.

## Required environment variables (names only — real values never committed)
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY` (server-only, never exposed to client bundle),
`GMAIL_USER`, `GMAIL_APP_PASSWORD` (or equivalent for the chosen SMTP
provider), `AI_PROVIDER_API_KEY`, `JWT_SECRET` (Supabase-managed, verify no
custom duplicate secret is introduced unnecessarily), `NEXT_PUBLIC_SENTRY_DSN`,
`SENTRY_AUTH_TOKEN`.

## Migration deployment
- Migrations are applied to staging first, verified, then applied to
  production as a deliberate, human-approved step — never auto-applied by
  a deploy pipeline without the checkpoint in `AGENT_CONSTITUTION.md`
  Section 10.

## Monitoring
- Sentry SDK installed and configured before Gate D; verify with a real
  test event that errors are actually received, not just that the SDK is
  present in `package.json`.
- `error.tsx` and `global-error.tsx` present at appropriate route levels so
  unhandled errors render a graceful page, not a blank screen, in
  production.

## Backup & recovery
- Rely on Supabase's built-in Postgres backup/point-in-time-recovery
  features; confirm the plan tier in use actually includes this before
  launch, and document the confirmed recovery window here.
- No custom backup mechanism needs to be built unless the confirmed Supabase
  plan doesn't cover the required recovery window — flag to the human if so.

## Rollback plan
- Vercel deployment rollback (previous deployment) is the primary code
  rollback mechanism — confirm it's tested at least once before pilot
  launch, not assumed to work.
- Database rollback is NOT symmetric with code rollback — a migration
  applied to production is not automatically reversed by rolling back the
  code deploy. Any schema change must be forward-compatible with the
  previous code version for at least one deploy cycle, or the rollback plan
  must explicitly account for the mismatch.

## Pre-launch production checklist (feeds Gate D)
- [ ] All environment variables set to real, non-placeholder values
- [ ] SMTP sending verified with a real test email received
- [ ] Sentry verified with a real test error received
- [ ] Database migrations applied and verified on production
- [ ] RLS policies spot-checked directly against the production database,
      not only assumed from the migration files
- [ ] Domain/SSL configured
- [ ] A full manual walkthrough of every role's critical journey performed
      against the actual production deployment, not just staging
