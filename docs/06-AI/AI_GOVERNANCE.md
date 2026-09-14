# AI GOVERNANCE & SAFETY SPECIFICATION

## 1. Principles
- **Socratic First:** AI prompt instructions explicitly instruct the LLM model to ask diagnostic questions and provide hints rather than providing copy-paste solutions.
- **Data Minimization:** Student PII (emails, real names, passwords) is NEVER sent in AI prompt contexts. Only raw code snippets and lesson prompts are transmitted.
- **Interaction Audit Logging:** Every prompt-response pair is logged in SQLite (`AIInteraction` model) with timestamp and student ID for teacher/admin safety audits.
- **Cost Controls:** Rate limiting caps maximum prompt turns per student session to prevent token overuse.
