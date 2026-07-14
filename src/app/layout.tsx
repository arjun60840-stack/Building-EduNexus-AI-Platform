import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "EduNexus AI — Connecting Every Classroom with Intelligence",
  description:
    "The AI-powered Smart School Management Platform that replaces outdated school ERP systems. Manage students, teachers, attendance, fees, homework, and more — all in one intelligent platform.",
  keywords: [
    "school management",
    "AI education",
    "smart school",
    "ERP",
    "attendance",
    "homework",
    "fee management",
  ],
  authors: [{ name: "EduNexus AI" }],
  openGraph: {
    title: "EduNexus AI — Smart School Management Platform",
    description:
      "Replace outdated school systems with one intelligent platform powered by AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-[var(--font-inter)]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
