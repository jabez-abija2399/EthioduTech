# PREREQUISITE GRAPH: Vertical Slice (Phases 0, 1, and HTML Module 1)

This graph maps the dependencies between concepts to prevent arbitrary topic sequencing. A node must be completely taught and practiced before its dependents are introduced.

```mermaid
flowchart TD
    %% Phase 0
    ENV01[SKILL-ENV-01: Navigate File System] --> ENV02[SKILL-ENV-02: Code Execution & Inspection]
    
    %% Phase 1
    WEB01[SKILL-WEB-01: Client-Server Mental Model] --> WEB02[SKILL-WEB-02: Separation of Concerns]
    
    %% Phase 2 (HTML Module 1)
    ENV02 --> HTML01[SKILL-HTML-01: Document Structure]
    WEB02 --> HTML01
    HTML01 --> HTML02[SKILL-HTML-02: Semantic Text Content]
    HTML02 --> HTML03[SKILL-HTML-03: Hyperlinks & Image Assets]
    ENV01 --> HTML03

    %% Phase 3 (CSS Module 2)
    HTML01 --> CSS01[SKILL-CSS-01: Selectors and Properties]
    CSS01 --> CSS02[SKILL-CSS-02: The Box Model]
    CSS02 --> CSS03[SKILL-CSS-03: Layout Flexbox]

    %% Phase 4 (JS Module 3)
    WEB02 --> JS01[SKILL-JS-01: Variables & Data Types]
    JS01 --> JS02[SKILL-JS-02: DOM Manipulation]
    CSS01 --> JS02
    JS02 --> JS03[SKILL-JS-03: Event Handling]

    %% Phase 5 (Git Module 4)
    ENV01 --> GIT01[SKILL-GIT-01: Local Version Control]
    GIT01 --> GIT02[SKILL-GIT-02: Remote Repositories]

    %% Projects
    HTML03 --> PROJ1[PROJECT-HTML-M1: Multi-Page Text Website]
    PROJ1 --> PROJ2[PROJECT-CSS-M2: Responsive Landing Page]
    CSS03 --> PROJ2
    PROJ2 --> PROJ3[PROJECT-JS-M3: Interactive Dashboard]
    JS03 --> PROJ3
    
    PROJ3 --> CAP[PROJECT-CAPSTONE: Interactive Portfolio]
    GIT02 --> CAP

    classDef env fill:#e2e8f0,stroke:#64748b,stroke-width:2px;
    classDef web fill:#dbeafe,stroke:#3b82f6,stroke-width:2px;
    classDef html fill:#fef08a,stroke:#eab308,stroke-width:2px;
    classDef css fill:#bfdbfe,stroke:#2563eb,stroke-width:2px;
    classDef js fill:#fde047,stroke:#ca8a04,stroke-width:2px;
    classDef git fill:#f472b6,stroke:#be185d,stroke-width:2px;
    classDef proj fill:#dcfce7,stroke:#22c55e,stroke-width:3px;
    classDef cap fill:#818cf8,stroke:#4338ca,stroke-width:4px;

    class ENV01,ENV02 env;
    class WEB01,WEB02 web;
    class HTML01,HTML02,HTML03 html;
    class CSS01,CSS02,CSS03 css;
    class JS01,JS02,JS03 js;
    class GIT01,GIT02 git;
    class PROJ1,PROJ2,PROJ3 proj;
    class CAP cap;
```

## Dependency Rationale

1. **Why `ENV-01` before `ENV-02`?**
   Students cannot open a project in an IDE if they do not understand how to locate or create a folder in their file system.

2. **Why `WEB-02` before `HTML-01`?**
   Before writing HTML boilerplate, students must understand *why* HTML exists (to provide structure) as distinct from CSS (presentation).

3. **Why `HTML-02` before `HTML-03`?**
   Hyperlinks and images are inline elements that often sit *inside* structural block elements (like paragraphs). Students must understand text structure before they can embed media within it.

4. **Why `ENV-01` before `HTML-03`?**
   Linking to other local HTML pages or embedding local images requires an understanding of file paths (relative vs. absolute), which relies heavily on file system navigation skills learned in Phase 0.

5. **Why `CSS-01` before `JS-02`?**
   To query the DOM effectively in JS (`document.querySelector('.btn')`), students must first understand how CSS selectors work.

6. **Why `WEB-02` before `JS-01`?**
   Students need the mental model of the Frontend Trinity to understand why we are writing logic in a new language separate from HTML.
