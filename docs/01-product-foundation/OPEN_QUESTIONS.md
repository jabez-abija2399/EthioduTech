# OPEN QUESTIONS — EDUTECH PLATFORM

## Current Open Questions

### Q-01: Service Worker Offline Pre-caching Strategy
- **Question:** How should static markdown course assets be cached for multi-megabyte offline packages?
- **Impact:** Affects low-bandwidth students operating 100% disconnected for weeks.
- **Proposed Solution:** Utilize `@ducanh2912/next-pwa` precache manifest generated during `npm run build`.

### Q-02: Telebirr / Chapa Payment Integration Timeline
- **Question:** Should payment integration be introduced in Beta or V1?
- **Impact:** Billing strategy for Ethiopian school partnerships.
- **Proposed Solution:** Retain free open access during MVP; introduce payment gateway in V1.
