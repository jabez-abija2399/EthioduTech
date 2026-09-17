# Workload Model

This document specifies the algorithm used to estimate and track curriculum workload.

## 1. The Workload Formula
Module workload is not an arbitrary guess. It is the sum of required learning activities:
`Concept Time + Practice Time + Retrieval Time + Assessment Time + Project Work + Reflection = Module Workload`

### Standard Weightings (Planning Baseline)
- **Concept / Explanation:** ~20% (Reading/watching instructional content)
- **Practice:** ~30% (Isolated exercises)
- **Retrieval:** ~10% (Spaced repetition challenges)
- **Assessment:** ~15% (Formal validation)
- **Project Work:** ~20% (Integration)
- **Reflection:** ~5% (Documenting learnings)

*Note: Capstone and Integration modules heavily skew toward Project Work (80%+).*

## 2. Course Totals vs. Targets

| Course | Target | Calculated Estimated Total | Deviation |
| :--- | :--- | :--- | :--- |
| Course 1: Web Foundations | 5h | 5.0h | 0 |
| Course 2: HTML Foundations | 12h | 11.5h | -0.5h |
| Course 3: CSS Foundations | 16h | 16.0h | 0 |
| Course 4: JavaScript Foundations | 26h | 26.5h | +0.5h |
| Course 5: Git & GitHub | 7h | 7.0h | 0 |
| Course 6: Capstone | 18h | 18.0h | 0 |
| **TOTAL** | **84h** | **84.0h** | **0** |

## 3. Workload Deviations & Assumptions
- **HTML Deviation (-0.5h):** Some initial estimates for Text/Links were slightly aggressive. Reading MDN docs for anchor tags generally requires less active practice than debugging CSS Grid, so the estimate was tuned down.
- **JavaScript Deviation (+0.5h):** The Async/API module required a slight bump to account for the cognitive load of handling `Promises` and `try/catch` blocks simultaneously for beginners.

These totals are estimates. The actual time a student takes will vary by their prior knowledge and reading speed. The 84-hour mark is respected as a strong pedagogical target ensuring the course is neither a bootcamp nor a multi-year degree.
