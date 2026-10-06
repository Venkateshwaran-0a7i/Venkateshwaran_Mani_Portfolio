import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Venkateshwaran M | Portfolio & AI R&D Engineer",
  description:
    "Portfolio of Venkateshwaran M — AI R&D Engineer specializing in Generative AI, AI Agents, LLMs, and RAG architectures. Experienced in building clean pipelines, training ML models, and delivering automated workflows.",
  keywords: [
    "Venkateshwaran M",
    "AI R&D Engineer",
    "Generative AI",
    "AI Agents",
    "LLMs",
    "RAG",
    "Data Science",
    "Machine Learning",
    "Power BI",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: "Venkateshwaran M" }],
  openGraph: {
    title: "Venkateshwaran M | Portfolio & AI R&D Engineer",
    description:
      "Check out my latest projects and engineering work in AI, Generative AI, LLMs, and RAG architectures.",
    url: "https://venkateshwaran-0a7i.github.io/Venkateshwaran_Mani_Portfolio/",
    siteName: "Venkateshwaran M Portfolio",
    images: [
      {
        url: "https://venkateshwaran-0a7i.github.io/Venkateshwaran_Mani_Portfolio/Venkateshwaran.jpeg",
        width: 800,
        height: 800,
        alt: "Venkateshwaran M Profile Picture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Venkateshwaran M | Portfolio & AI R&D Engineer",
    description:
      "AI R&D Engineer specializing in Generative AI, AI Agents, LLMs, and RAG architectures.",
    images: ["https://venkateshwaran-0a7i.github.io/Venkateshwaran_Mani_Portfolio/Venkateshwaran.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} bg-[#090d16] text-slate-100 antialiased selection:bg-blue-600 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
