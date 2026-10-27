import type { Metadata, Viewport } from "next";
import "./globals.css";
import { profile } from "@/data/content";
import { siteUrl } from "@/lib/asset";
import { oswald, syne, space, mono } from "@/lib/fonts";
import LenisProvider from "@/components/LenisProvider";
import CinematicVideo from "@/components/CinematicVideo";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";

const origin = siteUrl();
const title = `${profile.name} — ${profile.role} | Portfolio`;
const description =
  "AI R&D Engineer building LangChain agents, RAG systems and LLM pipelines. Generative AI · Python · FastAPI. Based in Madurai, India. Open to opportunities.";

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title,
  description,
  applicationName: `${profile.name} Portfolio`,
  authors: [{ name: profile.name, url: profile.github }],
  keywords: [
    "AI Engineer",
    "Generative AI",
    "LangChain",
    "RAG",
    "LLM",
    "Data Scientist",
    "Python",
    "FastAPI",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  // Paths are relative — Next prefixes basePath automatically for metadata icons/OG.
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    url: origin,
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    siteName: `${profile.name} Portfolio`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#030303",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  telephone: profile.phoneTel,
  url: origin,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Madurai",
    addressCountry: "IN",
  },
  sameAs: [profile.github, profile.linkedin],
  alumniOf: "Bharath Niketan Engineering College",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${syne.variable} ${space.variable} ${mono.variable}`}
    >
      <body className="bg-bg font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <style>{`.cine-stage{display:none!important}body{background:#030303}`}</style>
        </noscript>
        <a href="#about" className="skip-link">
          Skip to content
        </a>
        <LenisProvider>
          <CinematicVideo />
          <CustomCursor />
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
