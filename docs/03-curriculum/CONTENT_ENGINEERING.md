# CONTENT ENGINEERING & CURRICULUM ARCHITECTURE

## 1. Curriculum Hierarchy Structure

A course on the Edutech platform must NEVER be a mere collection of video links. It follows a strict hierarchical structure:

```text
COURSE ("Web Creator Foundations")
 └── MODULE ("Module 1: HTML Structure")
      └── UNIT ("Unit 1: Your First Webpage")
           └── LESSON ("What is HTML?")
                ├── Concept Explanation (Markdown)
                ├── Code Practice Exercise (HTML Sandbox)
                ├── Challenge Task (Unassisted)
                └── Milestone Project (Portfolio artifact)
```

## 2. Lesson Structure Requirements
Every lesson definition in SQLite / Markdown must include:
- `title`: Clear descriptive title.
- `learningObjectives`: 2–3 specific measurable capabilities.
- `prerequisites`: Required prior lessons.
- `content`: Markdown text with explanations and code examples.
- `exercises`: Interactive sandbox prompts and solution templates.
- `portfolioHook`: Connection to student project showcase.
