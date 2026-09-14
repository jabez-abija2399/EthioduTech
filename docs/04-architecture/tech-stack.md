# Technical Architecture & Stack

## Baseline Stack
As defined in the Master Spec, the MVP will utilize the following technologies. Every dependency requires justification; we will not introduce technology merely because it is popular.

### Frontend & Backend Framework
- **Next.js (App Router)**
  - *Justification:* Provides a unified full-stack environment. Server Components help keep the client bundle small, which is critical for low-bandwidth environments.

### Language
- **TypeScript**
  - *Justification:* Ensures type safety and reduces runtime errors, especially important when managing complex state across the learning loop and editor.

### Styling
- **Tailwind CSS**
  - *Justification:* Allows for rapid, consistent styling without shipping massive CSS bundles. Facilitates easy responsive and mobile-first design.

### Database & ORM
- **PostgreSQL**
  - *Justification:* Robust, relational data modeling is required for the complex relationships between Users, Courses, Progress, and Portfolios.
- **Prisma**
  - *Justification:* Type-safe database access that integrates perfectly with TypeScript.

### Authentication
- **Secure Role-Aware Authentication (e.g., NextAuth/Auth.js)**
  - *Justification:* Must handle multiple roles (Student, Parent, Teacher, Admin) securely.

### Code Editor
- **Monaco Editor or CodeMirror**
  - *Justification:* Necessary to provide a professional, in-browser coding experience. CodeMirror may be preferred for mobile responsiveness and lower weight.

### Infrastructure Abstractions
To ensure we can swap providers later without rewriting the app, we will use provider abstractions for:
- **AI (Provider Abstraction):** Connects to OpenAI, Anthropic, or local models.
- **Storage (Object Storage Abstraction):** For portfolio assets and user uploads.
- **Payments (Provider Abstraction):** To support local Ethiopian gateways (e.g., Chapa, Telebirr) alongside global options (e.g., Stripe) in the future.

## Offline & PWA Strategy
- The application will be structured as a Progressive Web App (PWA).
- Service workers will be used to cache critical static assets and lesson text.
- Data fetching will be optimized to handle intermittent connectivity gracefully.
