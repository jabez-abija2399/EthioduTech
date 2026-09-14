# PWA ARCHITECTURE & SERVICE WORKER SPECIFICATION

## 1. Web App Manifest
Defined in [`public/manifest.json`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/public/manifest.json):
- `name`: "Edutech Platform"
- `short_name`: "Edutech"
- `display`: "standalone"
- `theme_color`: "#2563eb"
- `background_color`: "#0f172a"

## 2. Service Worker Integration
Configured via `@ducanh2912/next-pwa` in [`next.config.ts`](file:///home/jabez/Documents/software/project/myproduct/best/edutech/next.config.ts):
- Caches App Shell (CSS, JS bundles, static assets).
- Provides offline fallback page when static routes are requested while offline.
