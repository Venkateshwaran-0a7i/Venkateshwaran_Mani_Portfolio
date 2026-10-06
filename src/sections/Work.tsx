/**
 * Work.tsx — project cards grid.
 *
 * Maps over the projects array from content.ts.
 * ProjectCard handles tilt and conditional button rendering.
 */
import { projects } from "../data/content";
import ProjectCard from "../components/ProjectCard";
import PulseDivider from "../components/PulseDivider";

export default function Work() {
  return (
    <section id="work" className="section work-section reveal" aria-label="Work">
      <div className="section-inner">
        <p className="section-label mono">// work</p>
        <h2 className="section-title">Projects</h2>
        <p className="section-sub muted">
          Selected work — data engineering, AI pipelines and automation.
        </p>

        <div className="cards-grid" role="list">
          {projects.map((project, i) => (
            <div key={project.title} role="listitem">
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      </div>

      <PulseDivider />
    </section>
  );
}
