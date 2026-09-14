# START ANTIGRAVITY

## PROJECT

Build an Ethiopian-first, globally scalable learning platform
for students in Grades 5–12.

The platform teaches students through:

Learning
→ Practice
→ Problem Solving
→ Coding
→ Projects
→ Collaboration
→ Git/version control
→ AI-assisted learning
→ Reflection
→ Portfolio

The goal is NOT to build another video-course website.

The goal is to build a system that develops capable,
creative, independent problem solvers.

---

# PHASE 0 — READ EVERYTHING

Before writing application code, read:

1. AGENT_CONSTITUTION.md
2. MASTER_SPEC.md

Then inspect:

- existing repository
- package.json
- source tree
- database
- environment variables
- existing components
- existing routes
- existing tests
- existing documentation
- existing dependencies

Do not immediately start coding.

---

# PHASE 1 — CREATE THE DOCUMENTATION SYSTEM

Create:

docs/
├── 00-research/
├── 01-product-foundation/
├── 02-pedagogy/
├── 03-curriculum/
├── 04-architecture/
├── 05-design/
├── 06-AI/
├── 07-github/
├── 08-safety/
├── 09-analytics/
├── 10-operations/
│
└── versions/
    ├── 00-validation/
    ├── 01-prototype/
    ├── 02-MVP/
    ├── 03-BETA/
    ├── 04-V1/
    └── 05-GLOBAL/

Do NOT implement every stage.

The documentation must describe what belongs
to each stage.

---

# PHASE 2 — RESEARCH

Research and document:

## Ethiopia

- education system
- Grades 5–12
- student demographics
- internet access
- smartphone usage
- low-bandwidth conditions
- existing digital learning platforms
- parents
- teachers
- payment constraints
- digital literacy
- online safety
- local competitors
- existing curriculum
- digital skills demand

## Global

Research:

- modern EdTech
- project-based learning
- mastery learning
- coding education
- AI education
- Git/GitHub education
- collaborative learning
- child safety
- adaptive learning
- offline learning
- portfolio-based education

Clearly separate:

FACT
ASSUMPTION
HYPOTHESIS
DECISION

---

# PHASE 3 — DEFINE USERS

Create detailed personas for:

1. Student 10–12
2. Student 13–15
3. Student 16–18
4. Parent
5. Teacher
6. Course instructor
7. School
8. Platform administrator

Do not assume all students behave the same.

---

# PHASE 4 — DEFINE THE LEARNING MODEL

Design the core learning loop:

Diagnostic
→ Lesson
→ Example
→ Practice
→ Challenge
→ Build
→ Submit
→ Feedback
→ Reflection
→ Mastery
→ Portfolio

Every major course feature must connect to this loop.

---

# PHASE 5 — DEFINE COURSE ARCHITECTURE

Courses must NOT be collections of videos.

Use:

Course
→ Modules
→ Units
→ Lessons
→ Concepts
→ Practice
→ Challenges
→ Projects
→ Milestones
→ Assessments
→ Capstone

Every course must define:

- prerequisites
- learning outcomes
- skills
- projects
- assessments
- mastery criteria
- portfolio output

---

# PHASE 6 — DEFINE AGE PROGRESSION

Initial educational progression:

Grades 5–6
Digital Foundations
Creative Computing
Scratch/Blockly
Logic
Problem Solving
Digital Safety

Grades 7–8
Web Creation
HTML
CSS
JavaScript fundamentals
Computational thinking
Projects
Git concepts

Grades 9–10
Serious Web Development
JavaScript
TypeScript
React
APIs
SQL
Testing
Git/GitHub
Deployment
AI literacy

Grades 11–12
Advanced Builder Tracks

Examples:

Full-Stack Development
Python
Backend
Databases
AI/Data
Cybersecurity
Cloud
Product Building
Open Source

This is a starting hypothesis.

Validate it before locking curriculum.

---

# PHASE 7 — DEFINE MVP

MVP must prove one thing:

CAN STUDENTS ACTUALLY LEARN AND BUILD
THROUGH THIS SYSTEM?

Do not build the entire platform.

MVP should focus on one complete learning experience.

Recommended MVP:

"Web Creator Foundations"

Core features:

- account
- age/grade selection
- diagnostic
- course enrollment
- course dashboard
- lesson system
- interactive exercises
- browser code editor
- coding challenges
- project progression
- checkpoints
- basic Git-style history
- AI tutor
- assessments
- mastery tracking
- project portfolio
- basic teacher/instructor view
- basic parent safety controls
- PWA/low-bandwidth foundation

---

# PHASE 8 — MVP NON-GOALS

Do NOT build initially:

- marketplace with hundreds of courses
- complex recommendation engine
- advanced social network
- unrestricted messaging
- full global payments
- every programming language
- every framework
- advanced AI agents
- complicated certificates
- enterprise LMS features
- massive live-class infrastructure

Build the smallest system that proves learning.

---

# PHASE 9 — DESIGN

Design for:

Student
Teacher
Parent
Admin

The UI must be:

- modern
- friendly
- simple
- professional
- accessible
- mobile-first
- responsive
- low-bandwidth aware

Avoid making the interface look like:

- enterprise HR software
- university administration software
- a social media platform

It should feel like:

"learning + building + progress."

---

# PHASE 10 — ARCHITECTURE

Recommended baseline:

Frontend:
Next.js
TypeScript
Tailwind CSS

Backend:
Next.js server capabilities / API layer

Database:
PostgreSQL

ORM:
Prisma

Authentication:
secure role-aware authentication

Code editor:
Monaco or CodeMirror

AI:
provider abstraction

Storage:
object storage abstraction

Payments:
provider abstraction

Deployment:
production-ready but MVP-simple

Do not introduce technology merely because it is popular.

Every dependency requires justification.

---

# PHASE 11 — DATABASE

Model at minimum:

User
Profile
Role
StudentProfile
ParentProfile
TeacherProfile

Course
CourseVersion
Module
Unit
Lesson
Concept

Exercise
Challenge
Project
ProjectMilestone

Enrollment
Progress
Skill
SkillMastery
Assessment
Submission

AIInteraction
CodeSubmission
Checkpoint

Portfolio
PortfolioProject

Class
Cohort
LiveSession
PeerReview

Notification

Subscription/Purchase
Payment

AuditLog

Design the schema for future growth,
but implement only what MVP needs.

---

# PHASE 12 — BUILD

After documentation and architecture:

1. Create implementation plan.
2. Break into tasks.
3. Implement foundations.
4. Implement authentication.
5. Implement course system.
6. Implement learning loop.
7. Implement code editor.
8. Implement project system.
9. Implement AI tutor.
10. Implement portfolio.
11. Implement teacher features.
12. Implement safety controls.
13. Implement PWA/low-bandwidth foundation.

---

# PHASE 13 — TEST

Test:

Functional
Database
Authorization
Security
Mobile
Responsive
Accessibility
Performance
Offline
Low bandwidth
Student journey
Teacher journey
Parent journey

Critical journey:

Signup
→ Diagnostic
→ Enrollment
→ Lesson
→ Exercise
→ Code
→ Challenge
→ AI help
→ Project
→ Checkpoint
→ Assessment
→ Portfolio

---

# PHASE 14 — REAL STUDENT SIMULATION

Simulate:

10-year-old beginner
13-year-old beginner
16-year-old learner
teacher
parent

Ask:

Can they understand the interface?

Can they find their next lesson?

Can they recover from mistakes?

Can they complete a project?

Can they understand feedback?

Can they learn without constantly asking AI?

---

# PHASE 15 — FINAL MVP AUDIT

Before declaring MVP complete:

Check:

PRODUCT
PEDAGOGY
UX
UI
ACCESSIBILITY
SECURITY
CHILD SAFETY
DATABASE
PERFORMANCE
OFFLINE
AI
TESTING
DOCUMENTATION
OBSERVABILITY

Then create:

docs/versions/02-MVP/MVP_RELEASE.md

with:

- implemented features
- incomplete features
- known issues
- test results
- performance results
- security findings
- learning validation results
- next steps

---

# CRITICAL RULE

DO NOT JUMP DIRECTLY INTO BUILDING EVERYTHING.

First:

UNDERSTAND
→ RESEARCH
→ DOCUMENT
→ VALIDATE
→ PLAN
→ ARCHITECT
→ IMPLEMENT
→ TEST
→ AUDIT
→ RELEASE

The objective is not to produce the most code.

The objective is to produce the best learning product.