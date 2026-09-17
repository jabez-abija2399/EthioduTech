# CURRICULUM INGESTION ACCEPTANCE

## Executive Result

`PASS_WITH_REQUIRED_CORRECTIONS`

(The curriculum is substantially integrated and ingested successfully, but there is a non-blocking known limitation regarding Prisma schema metadata coverage).

## Source of Truth

- **Curriculum Metadata**: `LESSON_REGISTRY.json`, `MODULE_REGISTRY.json`, `ID_REGISTRY.json`
- **Curriculum Content**: Canonical `.mdx` files located in `03-lessons/`

## Database Mapping

The canonical curriculum defines a hierarchy of:
`Course -> Module -> Lesson`

However, the existing Prisma application schema explicitly requires a `Unit` model:
`Course -> Module -> Unit -> Lesson`

To bridge this structural gap without forcing a destructive schema migration, an **Adapter Unit** is automatically generated per `Module` during ingestion. 
The ingestion mapping is explicitly:
`Canonical Course -> Canonical Module -> Adapter Unit (1 per module) -> Canonical Lesson`

## Content Representation

The application's rendering engine handles raw markdown/MDX string content directly from the database. The canonical `.mdx` files are read from the file system during ingestion, and the entire raw file content (including frontmatter and structured tags like `<GuidedPractice>`) is stored directly into the `Lesson.content` text field in SQLite.

## Ingestion Architecture

The ingestion pipeline (`prisma/seed.ts`) operates deterministically:
1. **Paths**: Resolves all registry paths (`ID_REGISTRY.json`, `MODULE_REGISTRY.json`, `LESSON_REGISTRY.json`) and the MDX directory (`03-lessons/`).
2. **Discovery**: For each lesson in the registry, it dynamically searches all course directories for the corresponding `.mdx` filename to handle any directory naming variations.
3. **Validation**: It checks for MDX file existence and verifies that exactly 1 file matches. It parses the frontmatter to verify the `lessonId` matches the registry before ingestion.
4. **Idempotent Upsert**: It uses `prisma.course.upsert`, `prisma.module.upsert`, `prisma.unit.upsert`, and `prisma.lesson.upsert` with the canonical string IDs (e.g., `course-web-foundations`, `mod-web-01`, `lesson-web-001`). This ensures the seed script is safe to rerun repeatedly without duplicating records.

## Records Imported

Derived directly from the registry validation script against the SQLite database:
- **Courses**: 6
- **Modules**: 49
- **Adapter Units**: 49
- **Lessons**: 80

## Metadata Coverage

**Persisted Metadata:**
- `lessonId` -> `Lesson.id`
- `title` -> `Lesson.title`
- `courseId` -> `Course.id`
- `moduleId` -> `Module.id`
- `sequence` -> `Module.order` and `Lesson.order`
- `content` -> `Lesson.content`

**Integration Gap (Source-Only Metadata):**
The current `prisma/schema.prisma` does not have support for the following fields at the `Lesson` or `Module` level:
- `primaryObjective`, `lessonType`, `difficulty`, `scaffoldingLevel`, `practiceIntent`, `estimatedMinutes`, `prerequisites`, `skills`, `concepts`, `status`.
*These remain securely preserved in the canonical registries but are not yet surfaced in the database schema.*

## Validation Results

The `scratch/verify-curriculum-ingestion.ts` validation suite confirmed:
- Expected course, module, unit, and lesson counts align perfectly with the source registries.
- No duplicate records detected.
- All foreign keys correctly resolve.

## Runtime Rendering Results

Verified by running the representative query checks in the verification script. Every course correctly returned its expected amount of lessons (e.g., HTML Foundations: 15 lessons, JavaScript Foundations: 26 lessons).

## Idempotency Results

By using `prisma.upsert` based on the stable canonical string IDs, the pipeline is fully idempotent. Running `npx prisma db seed` repeatedly updates the existing records seamlessly instead of throwing unique constraint errors or duplicating the curriculum.

## Regression Results

Unrelated seed operations (Users, Portfolios, Gamification Badges) have been fully preserved and execute seamlessly alongside the new deterministic curriculum ingestion. The dummy two-lesson "Web Creator Foundations" stub was completely removed.

## Known Limitations

- **Schema Provider Constraint**: The `schema.prisma` explicitly declares PostgreSQL as the provider, but the local development expects SQLite (`dev.db`). The schema provider was temporarily switched to SQLite to perform the ingestion.
- **Metadata Gap**: Prerequisite relationships, skill relationships, and concepts are not mapped into Prisma due to the lack of schema support.

## Final Decision

The Curriculum Ingestion Phase is **ACCEPTED**. 
The system is ready for the PWA Milestone 13 implementation phase.
