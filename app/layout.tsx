import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { MeshBackground } from "@/components/ui/MeshBackground";
import { Toaster } from "@/components/ui/sonner";
import { ThemeFAB } from "@/components/ui/ThemeFAB";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/700.css";

// Configure DM Sans via next/font (Optimized)
// Actually if I use next/font/google I don't strictly need @fontsource?
// User asked for @fontsource/dm-sans or similar.
// next/font/google is better for performance in Next 13+.
// Let's stick to next/font/google as it's standard in Next 16.

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "ExpertLink | Premium Consulting",
  description: "Book top experts instantly without timezone math.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans antialiased text-slate-900`}>
        <MeshBackground />
        {children}
        <Toaster />
        <ThemeFAB />
      </body>
    </html>
  );
}
