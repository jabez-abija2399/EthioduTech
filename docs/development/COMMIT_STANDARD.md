# COMMIT STANDARD — DEVELOPMENT OPERATING SYSTEM

All git commits must follow Conventional Commits formatting.

## 1. Format Structure
```text
<type>(<scope>): <short description>
```

## 2. Allowed Types
- `feat`: A new feature implementation.
- `fix`: A bug fix or runtime error correction.
- `docs`: Documentation, governance, or audit additions.
- `refactor`: Code change that neither fixes a bug nor adds a feature.
- `test`: Adding or updating automated tests.
- `chore`: Build process, configuration, or dependency updates.

## 3. Examples
- `feat(gamify): add XP rewards and streak calculation to lesson completion`
- `fix(prisma): refresh PrismaClient singleton instance for hot reloading`
- `docs(audit): add comprehensive project audit and task registry`
