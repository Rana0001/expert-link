import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { MeshBackground } from "@/components/ui/MeshBackground";
import { Toaster } from "@/components/ui/sonner";
import { ThemeFAB } from "@/components/ui/ThemeFAB";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
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
      <body className={`${archivo.variable} ${spaceGrotesk.variable} font-sans antialiased text-slate-900`}>
        <MeshBackground />
        {children}
        <Toaster />
        <ThemeFAB />
      </body>
    </html>
  );
}
