import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import OfflineStatus from "@/components/offline-status";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Edutech - Learn by Building",
  description: "Project-based learning platform for the next generation.",
  manifest: "/manifest.json",
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen flex flex-col antialiased">
        {children}
        <OfflineStatus />
      </body>
    </html>
  );
}
