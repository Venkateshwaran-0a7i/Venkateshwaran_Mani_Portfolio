import dynamic from "next/dynamic";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import BizTech from "@/components/sections/BizTech";
import Certifications from "@/components/sections/Certifications";
import ContactFooter from "@/components/sections/ContactFooter";
import LucyAssistant from "@/components/ui/LucyAssistant";

// Dynamically import Three.js Hero Canvas with SSR disabled to prevent hydration mismatch
const HeroBackgroundCanvas = dynamic(
  () => import("@/components/canvas/HeroBackgroundCanvas"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#090d16] text-slate-100 overflow-hidden">
      {/* 3D WebGL Background Canvas */}
      <HeroBackgroundCanvas />

      {/* Main UI Sections */}
      <Navbar />
      <Hero />
      <Education />
      <Skills />
      <Experience />
      <Projects />
      <BizTech />
      <Certifications />
      <ContactFooter />

      {/* Floating Gemini AI Assistant */}
      <LucyAssistant />
    </main>
  );
}
