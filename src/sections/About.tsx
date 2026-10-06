/**
 * About.tsx — profile summary and animated count-up stats.
 *
 * Uses Count component for stats — each counter animates when it enters
 * the viewport. All copy comes from content.ts.
 */
import { profile, stats, education } from "../data/content";
import Count from "../components/Count";
import PulseDivider from "../components/PulseDivider";

export default function About() {
  return (
    <section id="about" className="section about-section reveal" aria-label="About">
      <div className="section-inner">
        <p className="section-label mono">// about</p>
        <h2 className="section-title">About Me</h2>

        <div className="about-grid">
          {/* Summary */}
          <div className="about-summary">
            <p className="about-text">{profile.summary}</p>

            <div className="about-edu mono">
              <span className="edu-label muted">Education</span>
              <strong>{education.degree}</strong>
              <span className="muted">{education.institution}</span>
              <span className="muted">{education.period} · {education.aggregate} aggregate</span>
            </div>
          </div>

          {/* Stats */}
          <div className="about-stats" role="list" aria-label="Key achievements">
            {stats.map((s) => (
              <div key={s.label} className="stat-card reveal" role="listitem">
                <div className="stat-value">
                  <Count to={s.value} suffix={s.suffix} label={s.label} />
                </div>
                <p className="stat-label muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <PulseDivider />
    </section>
  );
}
