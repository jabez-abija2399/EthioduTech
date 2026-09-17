# Lesson Architecture

This document defines the instructional system for Section 3.

## Specification Mechanism
**LESSON_REGISTRY.json** = canonical lesson specification metadata
**MDX frontmatter** = lesson-level compiled metadata
**MDX body** = student-facing instructional content

Separate `lesson.spec.md` files are officially **NOT required**. The architectural intent (specification → validation → student content) is fully preserved by treating the JSON registry and MDX frontmatter as the absolute source of truth for all specification attributes (purpose, difficulty, skills, prerequisites, etc.).

## Lesson Model
A lesson represents a single, coherent learning experience covering a defined cognitive load.
Each lesson follows the structure:
1. Context/Motivation
2. Learning Goal
3. Prior-Knowledge Activation
4. Concept Delivery
5. Practice/Exercise
6. Retrieval Checkpoint
7. Reflection

Lessons are content-first and platform-agnostic, defined via structured metadata and semantic blocks.
