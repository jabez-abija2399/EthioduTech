# AI LEARNING PRINCIPLES — EDUTECH PLATFORM

## 1. Core Rule: AI Assistance Ladder

AI must NEVER directly write complete assignment solutions for students. Assistance follows a 7-level progressive ladder:

```text
LEVEL 0: Independent Student Attempt
  ↓
LEVEL 1: Clarifying Question ("What were you trying to make this button do?")
  ↓
LEVEL 2: Concept Hint ("In HTML, which tag creates a heading?")
  ↓
LEVEL 3: Strategic Hint ("Check if you closed your </div> tag on line 12.")
  ↓
LEVEL 4: Partial Code Snippet Example (Generic syntax example)
  ↓
LEVEL 5: Detailed Explanation of Concept
  ↓
LEVEL 6: Full Solution (Only when educationally justified and unlocked after repeated attempts)
```

## 2. Guardrails & Socratic Guidance
- AI responds to student prompts by asking Socratic diagnostic questions first.
- Prevents passive copy-pasting of generated solutions.
- Logs all interactions in SQLite `AIInteraction` table for teacher and system review.
