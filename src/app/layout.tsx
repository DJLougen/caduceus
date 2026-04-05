import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Caduceus — The Hermes Agent Evaluation Framework",
    template: "%s | Caduceus",
  },
  description:
    "Rigorous, adversarial testing for production-grade Hermes agents. Standardized benchmarks across 315+ tasks, 8 domains, and 4 difficulty levels.",
  openGraph: {
    title: "Caduceus — The Hermes Agent Evaluation Framework",
    description:
      "Where Hermes Agents Prove Their Cunning. Rigorous benchmarks for production-grade AI agents.",
    siteName: "Caduceus",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caduceus — The Hermes Agent Evaluation Framework",
    description:
      "Where Hermes Agents Prove Their Cunning. Rigorous benchmarks for production-grade AI agents.",
    creator: "@DJLougen",
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
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0A0A] text-[#F5F5F5]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
