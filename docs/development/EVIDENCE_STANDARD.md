# EVIDENCE STANDARD — DEVELOPMENT OPERATING SYSTEM

Every `VERIFIED` task in `TASK_REGISTRY.md` must record empirical evidence. Fake or assumed completion is strictly prohibited.

## 1. Required Evidence Artifacts by Task Type

| Task Type | Required Evidence Artifacts | Validation Method |
| :--- | :--- | :--- |
| **Backend / DB Action** | Command stdout log / SQLite query test | `npx tsx` query script output |
| **UI Component / Page** | Production build compilation log | `npm run build` stdout |
| **Type Definition** | Zero-error TypeScript compiler log | `npx tsc --noEmit` stdout |
| **PWA / Offline Feature** | IndexedDB store snapshot / Sync log | Browser console sync event log |
| **Git Commit** | Commit SHA hash | `git log -n 1` output |
