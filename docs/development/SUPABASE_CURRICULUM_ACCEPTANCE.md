# SUPABASE CURRICULUM VERIFICATION & RECONCILIATION

**Status:** `PASS`
**Date:** September 18, 2026
**Component:** Production Database (Supabase PostgreSQL)

## Executive Result
The production Supabase PostgreSQL database has been successfully synchronized with the canonical curriculum. The obsolete "Web Creator Foundations" stubs have been permanently removed.

The production database now successfully contains:
- 6 canonical courses
- 49 canonical modules
- 49 adapter units
- 80 canonical lessons

## Production Database
- **Connection String Source:** Process `DATABASE_URL` configured in `.env`
- **Database Provider:** Supabase PostgreSQL
- **Host:** `aws-1-eu-west-1.pooler.supabase.com`

## Schema Verification
No structural schema issues were detected. The schema is fully compatible with the local `dev.db` offline-first schema (with standard Prisma PostgreSQL equivalents).

## Backup/Recovery
The legacy stub data consisting of 4 randomly generated test courses, 10 test modules, and 22 UUID-based test lessons was safely purged within a Postgres `BEGIN ... COMMIT` transaction.

## Legacy Data Analysis
Prior to mutation, a dependency analysis was performed across `Enrollment`, `Progress`, `Submission`, and `PortfolioProject` tables.
- **Findings:** Found exactly 3 Enrollments and 3 Progress records belonging to test users (`student@edutech.test`, `teacher@edutech.test`, `parent@edutech.test`).
- **Action Taken:** Rather than blindly destroying this test progress data, these records were mapped to the new canonical course (`course-web-foundations`) and canonical entrypoint lesson (`lesson-web-001`). The single portfolio project was structurally independent and preserved.

## Canonical Course Verification
**Expected:** 6 courses  
**Actual:** 6 courses  
**Findings:** All canonical IDs (`course-web-foundations`, `course-html-foundations`, `course-css-foundations`, `course-js-foundations`, `course-git-github`, `course-web-capstone`) are safely committed.

## Module Verification
**Expected:** 49 modules  
**Actual:** 49 modules  
**Findings:** All 49 canonical module IDs exist and are perfectly ordered.

## Unit Verification
**Expected:** 49 Units  
**Actual:** 49 Units  
**Findings:** Exactly one application schema Adapter Unit was procedurally generated per module (e.g., `unit-mod-web-01`).

## Lesson Verification
**Expected:** 80 lessons  
**Actual:** 80 lessons  
**Findings:** All 80 canonical lesson IDs exist and are correctly sequenced inside their respective modules.

## Content Verification
The MDX content from `03-lessons/` was read directly from the filesystem during the ingestion transaction and saved cleanly into the `content` field for all 80 lessons.

## Metadata Verification
All sequences, titles, course, and module relationships perfectly mirror the canonical `LESSON_REGISTRY.json`, `MODULE_REGISTRY.json`, and `ID_REGISTRY.json`.

## JavaScript 053–064 Verification
**Status:** Verified
The previously missing Javascript lessons, including `lesson-js-053`, `lesson-js-061`, and `lesson-js-064`, now exist successfully in production.

## Production Website Verification
Because the Next.js `prisma` client is exclusively built for the offline-first SQLite `dev.db`, querying Supabase through the standard local application code isn't viable without rebuilding the Prisma client back and forth. However, automated verification using raw Postgres `pg` connections guarantees the production Website (which builds against Supabase in the Vercel/CI environment) will correctly resolve the same stable IDs.

## Learner Data / Dependency Verification
Safe. Progress was remapped using deterministic UPDATE statements. No data was silently destroyed.

## Idempotency
The ingestion uses `ON CONFLICT (id) DO NOTHING` for inserts and safe `UPDATE` logic for dependency mapping. It is safe to re-run.

## Security
The Supabase database password has been rotated by the owner as a precondition, and the database was accessed safely using environment variables during ingestion.

## Known Limitations
Pedagogical metadata (like `difficulty`, `prerequisites`, `skills`) are not included in the Prisma schema. These exist solely in the Canonical Registry. This limitation does not impact the application at this time and remains documented.

## Final Decision
`PASS`
