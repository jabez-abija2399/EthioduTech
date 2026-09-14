# RED TEAM & THREAT SCENARIOS SPECIFICATION

## Threat Scenarios & Verification Tests

| Scenario ID | Attack Vector / Failure Mode | Protection Mechanism | Status |
| :--- | :--- | :--- | :--- |
| **RED-01** | Student attempts to view another student's non-public progress | Server action checks `session.user.id` against `studentProfile.userId` | `VERIFIED` |
| **RED-02** | Malicious script in project code tries to access parent window DOM | Sandbox iframe omits `allow-same-origin` (`sandbox="allow-scripts"`) | `VERIFIED` |
| **RED-03** | Authorization bypass on `/teacher` portal route | Middleware & server component check `user.role === 'TEACHER'` | `VERIFIED` |
| **RED-04** | Prompt injection into AI Tutor drawer | Input sanitization & prompt guardrails | `VERIFIED` |
| **RED-05** | Offline sync conflict when user completes lesson on 2 devices | Server timestamp check in `completeLessonAction` | `VERIFIED` |
