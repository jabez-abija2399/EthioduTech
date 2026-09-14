# API_SPECIFICATION.md

This project uses Next.js Server Actions as its API layer (not a separate
REST/GraphQL surface), plus one API route for the AI copilot. Every entry
below follows the canonical shape in `ARCHITECTURE.md`. "Method/path" is
replaced by "action name / module" for server actions.

Rate limiting note: any action reachable by an unauthenticated caller
(sign-up, sign-in, verification, password reset) must have request rate
limiting applied at the edge/middleware level, not only inside the action.

## Auth module — `features/auth/server/actions.ts`, `email-verification.ts`
| Action | Auth required | Role | Request | Response | Notes |
|---|---|---|---|---|---|
| `signUpAction` | No | public | email, password, displayName, role, joinCode? | ActionResult<{redirectUrl}> | Join code validated before account creation (RULE-005) |
| `signInAction` | No | public | email, password | ActionResult<{redirectUrl}> | Generic error on failure, no account enumeration |
| `signOutAction` | Yes | any | — | ActionResult<{}> | |
| `requestPasswordResetAction` | No | public | email | ActionResult<{}> | Rate limited |
| `resetPasswordWithCodeAction` | No | public | email, code, newPassword | ActionResult<{}> | |
| `sendVerificationCodeAction` | No | public | email, purpose, locale | ActionResult<{}> | Rate limited per RULE-009 |
| `verifyCodeAction` | No | public | email, code, purpose | ActionResult<{}> | |
| `saveOnboarding` | Yes | student | nickname, locale, gradeBand, trackPreference | ActionResult<{}> | Scoped to caller's own profile |
| `getCurrentUserAndProfile` | Yes | any | — | ActionResult<{user, profile}> | |
| `setLocalePreference` | Yes | any | locale | ActionResult<{}> | |
| `enrollStudent` | Yes | student | joinCode | ActionResult<{}> | Investigate before modifying — confirm live usage vs. sign-up-inline path (see DEVELOPMENT_WORKFLOW.md DISCOVER step) before changing |

## Learning module — `features/learning/server/actions.ts`
| Action | Auth | Role/Scope | Request | Response |
|---|---|---|---|---|
| `getStudentLearningSummary` | Yes | self-scoped | — | ActionResult<Summary> |
| `updateLearningProgress` | Yes | self-scoped | lessonId, step, result | ActionResult<{}> |
| `getStudentDashboardData` | Yes | self-scoped | — | ActionResult<DashboardData> |
| `getCourseCatalogData` | Optional | public + self-scoped enrichment | — | ActionResult<Catalog> |
| `getJourneyMapData` | Yes | self-scoped | trackFilter? | ActionResult<JourneyMap> |

## Submissions module — `features/submissions/server/actions.ts`
| Action | Auth | Role/Scope | Request | Response |
|---|---|---|---|---|
| `createOrUpdateSubmissionDraft` | Yes | self-scoped (own submission only) | projectId, codeSnapshot, pasteEventLog | ActionResult<{}> |
| `submitProject` | Yes | self-scoped | submissionId, reflection | ActionResult<{}> — reject if reflection empty |
| `reviewSubmission` | Yes | instructor OR admin (explicit role check, canonical pattern) | submissionId, rubricScores, feedback, needsLiveCheckin, decision | ActionResult<{decision}> |
| `getProjectWorkspaceData` | Optional | public brief data + self-scoped submission state | projectId | ActionResult<WorkspaceData> |

## Portfolio module — `features/portfolio/server/actions.ts`
| Action | Auth | Role/Scope | Request | Response |
|---|---|---|---|---|
| `getStudentPortfolio` | Yes | self-scoped | — | ActionResult<Portfolio> |
| `getStudentPortfolioProjects` | Yes | self-scoped | — | ActionResult<Project[]> |
| `updatePortfolioVisibility` | Yes | self-scoped + consent check | projectId, visibility | ActionResult<{}> — blocked without verified consent |
| `updateProjectDescription` | Yes | self-scoped | projectId, description | ActionResult<{}> |
| `toggleRevisionJourney` | Yes | self-scoped | projectId | ActionResult<{}> |
| `getPublicPortfolio` | No | public, consent-gated in query itself | studentId | ActionResult<Portfolio> or not-found |

## Instructor module — `features/instructor/server/actions.ts`
| Action | Auth | Role/Scope | Request | Response |
|---|---|---|---|---|
| `getInstructorDashboardData` | Yes | instructor/admin, cohort-scoped | — | ActionResult<DashboardData> |
| `getSubmissionForReview` | Yes | instructor/admin, cohort-scoped | submissionId | ActionResult<SubmissionDetail> |
| `getCohortRoster` | Yes | instructor/admin, cohort-scoped | cohortId | ActionResult<Roster> |
| `getStudentDetails` | Yes | instructor/admin, cohort-scoped | studentId | ActionResult<StudentDetail> — reject if student not in caller's cohort |
| `addStudentNote` | Yes | instructor/admin, cohort-scoped | studentId, note | ActionResult<{}> |
| `scheduleLiveSession` | Yes | instructor/admin, cohort-scoped | cohortId, scheduledAt, meetingUrl | ActionResult<{}> — ONE canonical implementation only (FEAT-012) |

## Cohorts module — `features/cohorts/server/actions.ts`
Confirm during DISCOVER whether this module should retain any actions after
FEAT-012's de-duplication, or be merged entirely into `features/instructor/`.

## Parent module — `features/parent/server/actions.ts`
| Action | Auth | Role/Scope | Request | Response |
|---|---|---|---|---|
| `getParentDashboardData` | Yes | parent, own-links-scoped | — | ActionResult<DashboardData> |
| `updateGuardianConsent` | Yes | parent, own-links-scoped | studentId, status | ActionResult<{}> |

## Admin module — `features/admin/server/actions.ts`
Every action below is **admin role only** — verified via `profile.role ===
'admin'`, checked explicitly, no exceptions:
`getAdminVitals`, `getSafetyAlerts`, `resolveSafetyAlert`,
`getDataDeletionRequests`, `processDataDeletion`, `getUsersList`,
`updateUserRole` (requires reason, min 5 chars, audit-logged),
`toggleUserActiveStatus`, `getCurriculumGateLessons`,
`toggleLessonPublishGate`, `saveLessonDraftAction`, `getFeatureFlags`,
`toggleFeatureFlag`, `getAuditLogs` (read-only, no write path exists),
`generateLessonIllustrationAction`, `approveLessonIllustrationAction`,
`getCohortsList`, `createCohortAction`, `addInstructorAction`,
`startImpersonationAction`, `stopImpersonationAction` (still requires
auth+admin check even though impact is low),
`getImpersonationState`, `getPendingReviewsAction`, `updateAiProviderAction`,
`moderateReviewAction`.

## Notifications module — `features/notifications/server/actions.ts`
| Action | Auth | Role/Scope | Request | Response |
|---|---|---|---|---|
| `getUserNotifications` | Yes | self-scoped | — | ActionResult<Notification[]> |
| `markNotificationRead` | Yes | self-scoped | notificationId | ActionResult<{}> |
| `markAllNotificationsRead` | Yes | self-scoped | — | ActionResult<{}> |
| `createNotification` | Internal only (recommended) OR self-scoped if client-callable | n/a | userId (must equal caller's id if client-callable), content | ActionResult<{}> — see FEAT-018, RULE-018 |

## Safety module — `features/safety/server/actions.ts`
| Action | Auth | Role/Scope | Request | Response |
|---|---|---|---|---|
| `submitConcernReport` | Yes | any authenticated role | category, details, subjectId? | ActionResult<{}> |

## Reviews module — `features/reviews/server/actions.ts`
| Action | Auth | Role/Scope | Request | Response |
|---|---|---|---|---|
| `submitReviewAction` | Optional | public/authenticated | content | ActionResult<{}> — status defaults to pending |
| `getPublishedReviewsAction` | No | public | — | ActionResult<Review[]> — only status='published' |
| `moderateReviewAction` | Yes | admin | reviewId, decision | ActionResult<{}> |

## AI route — `app/api/ai/help/route.ts`
POST only. Auth required (student role). Request: `{ mode, studentCode,
message }`. Response: `{ reply, mode }`. Distress-detection runs before any
LLM call per RULE-012. Never exposes the LLM provider's raw API key or
internal prompt template to the client.
