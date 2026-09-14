# LOW-BANDWIDTH OPTIMIZATION SPECIFICATION

## 1. Bandwidth Budget Constraints
- **Target Page Load Size:** < 500 KB total bundle for initial load.
- **Media Asset Policy:** Text & SVG first. Video streaming is omitted in favor of lightweight interactive code sandboxes and Markdown instructions.
- **Font Optimization:** Subsetted Geist / system font stacks (`system-ui`, `-apple-system`, `BlinkMacSystemFont`).
- **Prisma SQLite Local Latency:** 0ms network roundtrips for local database operations.
