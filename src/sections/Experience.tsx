/**
 * Experience.tsx — vertical timeline of work experience.
 *
 * The timeline spine is a thin line; each role is a node.
 * Current role gets a pulsing live dot.
 */
import { experience } from "../data/content";
import PulseDivider from "../components/PulseDivider";

export default function Experience() {
  return (
    <section id="experience" className="section experience-section reveal" aria-label="Work experience">
      <div className="section-inner">
        <p className="section-label mono">// experience</p>
        <h2 className="section-title">Experience</h2>

        <ol className="timeline" aria-label="Career timeline">
          {experience.map((role, i) => (
            <li key={`${role.org}-${role.when}`} className="timeline-item reveal">
              {/* Spine dot */}
              <div className="timeline-node" aria-hidden="true">
                {i === 0 && <span className="dot dot--live" />}
                {i !== 0 && <span className="timeline-dot" />}
              </div>

              <div className="timeline-body">
                <div className="timeline-header">
                  <h3 className="timeline-role">{role.role}</h3>
                  <span className="timeline-when mono muted">{role.when}</span>
                </div>
                <p className="timeline-org mono">{role.org}</p>
                <p className="timeline-note muted">{role.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <PulseDivider />
    </section>
  );
}
