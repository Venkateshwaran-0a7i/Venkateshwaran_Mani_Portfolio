/**
 * Nav.tsx — fixed navigation bar with anchor links and active-section highlight.
 *
 * Architecture notes:
 * - Uses IntersectionObserver (not scroll events) to detect the active section.
 * - Active state lives in React state — it changes infrequently (section boundary).
 * - All links use href="#id" for native smooth-scroll compatibility.
 * - aria-current="page" marks the active link for screen readers.
 */
import { useState, useEffect, useCallback } from "react";
import { profile } from "../data/content";
import { SECTION_IDS, type SectionId } from "../scene/config";

const LABELS: Record<SectionId, string> = {
  hero: "Home",
  about: "About",
  work: "Work",
  stack: "Stack",
  experience: "Experience",
  contact: "Contact",
};

export default function Nav() {
  const [active, setActive] = useState<SectionId>("hero");
  const [scrolled, setScrolled] = useState(false);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 }
      );
      io.observe(el);
      observers.push(io);
    });

    return () => observers.forEach((io) => io.disconnect());
  }, []);

  // Add backdrop when user has scrolled down
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header className={`nav-header${scrolled ? " nav-scrolled" : ""}`} role="banner">
      <nav className="nav-inner" aria-label="Main navigation">
        {/* Brand */}
        <a href="#hero" className="nav-brand" aria-label="Go to top">
          <span className="dot" aria-hidden="true" />
          <span className="mono">VM</span>
        </a>

        {/* Section links */}
        <ul className="nav-links" role="list">
          {SECTION_IDS.filter((id) => id !== "hero").map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`nav-link${active === id ? " active" : ""}`}
                aria-current={active === id ? "page" : undefined}
              >
                {LABELS[id]}
              </a>
            </li>
          ))}
        </ul>

        {/* Download CV */}
        <a
          href={profile.cv}
          className="btn btn-sm"
          download
          aria-label="Download Venkateshwaran Mani's CV as PDF"
        >
          CV ↓
        </a>
      </nav>
    </header>
  );
}
