# CURRICULUM INGESTION ACCEPTANCE

## Executive Result

`PASS`

The curriculum ingestion has successfully integrated the canonical curriculum (6 courses, 49 modules, 80 lessons) into the local SQLite database. The pipeline is fully deterministic, idempotent, and validates MDX frontmatter strictly against the canonical registry before any database mutation.

## Database Provider

- **Canonical Provider (Production)**: Supabase PostgreSQL
- **Local Development Provider**: SQLite (`dev.db`)
- **Reconciliation**: The canonical database for local development and offline PWA capabilities is SQLite. The `prisma/schema.prisma` has been explicitly configured to use `sqlite` to support the offline-first Milestone 13. This ensures that the ingestion script natively supports the local edge environment without requiring network connectivity to a production pooler.

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

The application's rendering engine successfully consumes raw markdown/MDX string content directly from the database. The canonical `.mdx` files are read from the file system during ingestion, and the entire raw file content (including frontmatter and structured tags like `<GuidedPractice>`) is stored directly into the `Lesson.content` text field in SQLite. Application tests confirm that `ClientWorkspace` properly receives and renders this content.

## Ingestion Architecture

The ingestion pipeline (`prisma/seed.ts`) operates deterministically:
1. **Paths**: Resolves all registry paths (`ID_REGISTRY.json`, `MODULE_REGISTRY.json`, `LESSON_REGISTRY.json`) and the MDX directory (`03-lessons/`).
2. **Discovery**: For each lesson in the registry, it dynamically searches all course directories for the corresponding `.mdx` filename to handle any directory naming variations.
3. **Idempotent Upsert**: It uses `prisma.course.upsert`, `prisma.module.upsert`, `prisma.unit.upsert`, and `prisma.lesson.upsert` with the canonical string IDs (e.g., `course-web-foundations`, `mod-web-01`, `lesson-web-001`). This ensures the seed script is safe to rerun repeatedly without duplicating records.

## Registry/MDX Validation

The ingestion pipeline performs strict validation before database mutation. For every MDX file, it extracts the frontmatter and fails immediately if any of the following fields do not perfectly match the canonical registry:
- `lessonId`
- `courseId`
- `moduleId`
- `sequence`
- `title`

## Database Validation

The `scratch/verify-curriculum-ingestion.ts` validation suite confirmed:
- Expected course, module, unit, and lesson counts align perfectly with the source registries.
- No duplicate records detected.
- All foreign keys correctly resolve.

## Idempotency Results

By using `prisma.upsert` based on the stable canonical string IDs, the pipeline is fully idempotent. Running `npx prisma db seed` repeatedly updates the existing records seamlessly. Consecutive runs against the local development database successfully resulted in exactly 80 lessons with unchanged IDs and ordering.

## Application Rendering Results

Verified by running the normal Next.js development server locally. A representative rendering script fetched the actual application UI/routes and verified the component mount for:
1. Web Foundations (`lesson-web-001`)
2. HTML Foundations (`lesson-html-001`)
3. CSS Foundations (`lesson-css-001`)
4. JavaScript Foundations (`lesson-js-039` and `lesson-js-053`)
5. Git & GitHub (`lesson-git-065`)
6. Capstone (`lesson-cap-074`)

The `CourseSidebar` and `ClientWorkspace` components rendered successfully, demonstrating that the MDX text stored in the SQLite database is perfectly compatible with the existing rendering pipeline.

## Metadata Coverage

**Persisted Metadata:**
- `lessonId` -> `Lesson.id`
- `title` -> `Lesson.title`
- `courseId` -> `Course.id`
- `moduleId` -> `Module.id`
- `sequence` -> `Module.order` and `Lesson.order`
- `content` -> `Lesson.content`

## Adapter Unit Mapping

Confirmed that the adapter unit mapping is strictly an application-schema adapter:
- Exactly one adapter Unit per Module.
- Deterministic identity (`unit-{moduleId}`).
- No pedagogical claim or separate curriculum concept introduced.
- Lesson ordering preserved within the module.

## Regression Results

Unrelated seed operations (Users, Portfolios, Gamification Badges) have been fully preserved and execute seamlessly alongside the new deterministic curriculum ingestion. The dummy two-lesson "Web Creator Foundations" stub was completely removed.

## Known Limitations

- **Metadata Gap**: The current `prisma/schema.prisma` does not have support for `primaryObjective`, `lessonType`, `difficulty`, `scaffoldingLevel`, `practiceIntent`, `estimatedMinutes`, `prerequisites`, `skills`, `concepts`, or `status`. These remain securely preserved in the canonical registries but are not yet surfaced in the database schema. **This is a known integration limitation** and not a curriculum defect, as no current application feature depends on these missing fields.

## Final Decision

PASS
