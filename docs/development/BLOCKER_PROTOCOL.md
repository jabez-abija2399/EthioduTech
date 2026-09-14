# BLOCKER PROTOCOL — DEVELOPMENT OPERATING SYSTEM

When a development task encounters an issue that prevents forward progress, **DO NOT GUESS**.

Follow this protocol:

```text
STATUS = BLOCKED

Task ID: [ID]
Reason: [Explicit technical, dependency, or product reason]
Evidence: [Log output or error stack trace]
Dependencies: [Unresolved prerequisite task]
Proposed Options:
  Option A: [Description & trade-offs]
  Option B: [Description & trade-offs]
Recommended Action: [Option X]
Decision Required From: [User / Senior Architect]
```

Development halts on the blocked task until the decision is recorded in `DECISION_LOG.md`.
