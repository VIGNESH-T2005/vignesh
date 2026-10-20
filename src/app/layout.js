import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/data/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import AiChatbotSection from "@/components/AiChatbotSection";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["600", "700"], variable: "--font-poppins", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

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
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: `${SITE.name} Portfolio`,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0b0d12",
  colorScheme: "dark",
};

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
      <body className={`${inter.variable} ${poppins.variable} ${mono.variable}`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <CommandPalette />
        <AiChatbotSection />
      </body>
    </html>
  );
}
