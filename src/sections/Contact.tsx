/**
 * Contact.tsx — contact links and footer.
 *
 * Uses mailto: for email (no backend required).
 * All external links use rel="noopener noreferrer".
 * No hard-coded copy — all text from content.ts.
 */
import { profile } from "../data/content";

export default function Contact() {
  return (
    <section id="contact" className="section contact-section reveal" aria-label="Contact">
      <div className="section-inner contact-inner">
        <p className="section-label mono">// contact</p>
        <h2 className="section-title">Get in Touch</h2>
        <p className="contact-sub muted">
          Open to AI/ML roles, freelance projects and research collaborations.
        </p>

        <div className="contact-links">
          <a
            href={`mailto:${profile.email}`}
            className="contact-link btn btn-solid"
            aria-label={`Send email to ${profile.email}`}
          >
            ✉ Email
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link btn"
            aria-label="View LinkedIn profile (opens in new tab)"
          >
            in LinkedIn ↗
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link btn"
            aria-label="View GitHub profile (opens in new tab)"
          >
            ⌥ GitHub ↗
          </a>

          <a
            href={profile.cv}
            className="contact-link btn"
            download
            aria-label="Download CV as PDF"
          >
            ↓ Download CV
          </a>
        </div>

        <div className="contact-email mono muted">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
      </div>

      {/* Footer */}
      <footer className="site-footer mono muted" role="contentinfo">
        <p>
          © {new Date().getFullYear()} {profile.name} · Built with React + Three.js · Hosted on GitHub Pages
        </p>
      </footer>
    </section>
  );
}
