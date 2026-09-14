import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: false,
  register: true,
});

const nextConfig: NextConfig = {
  turbopack: {},
  // Add other Next.js config options here if needed
};

// Trigger dev server reload for updated Prisma Client schema: 2026-09-15
export default withPWA(nextConfig);
