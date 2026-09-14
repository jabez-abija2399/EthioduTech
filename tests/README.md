# TESTING STRATEGY & SUITES — EDUTECH PLATFORM

## 1. Automated Verification Commands
- **TypeScript Type Safety:** `npx tsc --noEmit`
- **Production Build:** `npm run build`
- **Prisma Database Sync:** `npx prisma db push`
- **Database Seeding:** `npx tsx prisma/seed.ts`

## 2. Test Plan Roadmap (Milestone 15)
- **Unit Tests:** Vitest for server actions (`progress.ts`, `portfolio.ts`, `auth.ts`).
- **Integration Tests:** Prisma SQLite query assertions (`gamification.ts`).
- **End-to-End (E2E) Tests:** Playwright browser tests covering:
  1. Student registration & login.
  2. Lesson navigation & code sandbox editing.
  3. Offline completion & IndexedDB sync flusher.
  4. Portfolio project publishing.
