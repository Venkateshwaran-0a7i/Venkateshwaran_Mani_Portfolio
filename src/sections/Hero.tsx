/**
 * Hero.tsx — full-viewport hero section.
 *
 * Content sourced exclusively from content.ts — no hard-coded copy here.
 * The "OPEN TO WORK" badge uses a live-pulse dot (CSS animation).
 */
import { profile } from "../data/content";
import PulseDivider from "../components/PulseDivider";

export default function Hero() {
  return (
    <section id="hero" className="section hero-section" aria-label="Hero">
      <div className="section-inner hero-inner">
        {/* Live badge */}
        <p className="hero-badge mono">
          <span className="dot" aria-hidden="true" />
          <span>OPEN TO WORK</span>
        </p>

        {/* h1 — only one per page */}
        <h1 className="hero-name">{profile.name}</h1>
        <p className="hero-role">{profile.role}</p>
        <p className="hero-tagline muted">{profile.tagline}</p>

        <div className="hero-cta">
          <a href="#work" className="btn btn-solid">
            View Work
          </a>
          <a href={profile.cv} className="btn" download>
            Download CV ↓
          </a>
        </div>

        <div className="hero-meta mono muted">
          <span>📍 {profile.location}</span>
        </div>
      </div>

      <PulseDivider />
    </section>
  );
}
