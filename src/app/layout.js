import { Bricolage_Grotesque, Instrument_Serif, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/data/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import AiChatbotSection from "@/components/AiChatbotSection";
import { PointerFX, ScrollProgress, CursorGlow } from "@/components/FX";
import RouteCurtain from "@/components/RouteCurtain";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

const title = `${SITE.name} | ${SITE.role}`;
const description =
  "Portfolio of Vignesh T, a full-stack developer: HRC TECH (ASP.NET Core, React, PostgreSQL, Stripe), Shop-Zone (MERN), Java practice and Power BI work, with case studies, GitHub activity and engineering notes.";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: `%s | ${SITE.name}` },
  description,
  keywords: ["Vignesh T", "Full Stack Developer", "React", "ASP.NET Core", "Java", "Next.js", "portfolio", "fresher"],
  authors: [{ name: SITE.name, url: SITE.url }],
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: SITE.url, siteName: `${SITE.name} Portfolio`, title, description },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport = { themeColor: "#06070b", colorScheme: "dark" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: SITE.role,
  url: SITE.url,
  email: `mailto:${SITE.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Perambalur", addressRegion: "Tamil Nadu", addressCountry: "IN" },
  alumniOf: "Dhanalakshmi Srinivasan Engineering College",
  sameAs: [SITE.socials.github.href, SITE.socials.linkedin.href, SITE.socials.leetcode.href],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className={`${bricolage.variable} ${instrument.variable} ${geist.variable} ${geistMono.variable}`}>
        <div className="stage" aria-hidden="true" />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink">Skip to content</a>
        <ScrollProgress />
        <PointerFX />
        <CursorGlow />
        <RouteCurtain />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <CommandPalette />
        <AiChatbotSection />
      </body>
    </html>
  );
}
