/**
 * ProjectCard.tsx — 3D perspective tilt card for the Work section.
 *
 * Architecture notes:
 * - Tilt implemented via CSS transform on the card element directly —
 *   no React state, no requestAnimationFrame, just inline style mutation.
 * - Repo and Demo buttons render only when the URL is a non-empty string.
 * - All external links use rel="noopener noreferrer" for security.
 * - Keyboard users can focus cards; tilt is purely visual enhancement.
 */
import { useRef } from "react";
import type { Project } from "../data/content";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null!);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(8px)`;
  };

  const handleMouseLeave = () => {
    cardRef.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
  };

  // Keyboard accessibility — reset transform on focus loss
  const handleBlur = () => {
    cardRef.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
  };

  return (
    <article
      ref={cardRef}
      className="card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}
      aria-label={`Project: ${project.title}`}
      // Staggered reveal delay driven by CSS custom property
      style={{ "--delay": `${index * 0.1}s` } as React.CSSProperties}
    >
      {/* Index badge */}
      <span className="card-index mono" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3 className="card-title">{project.title}</h3>
      <p className="card-stack mono">{project.stack}</p>
      <p className="card-desc muted">{project.desc}</p>

      {/* Links — only rendered when URLs are non-empty strings */}
      {(project.repo || project.demo) && (
        <div className="card-links">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
              aria-label={`View source code for ${project.title}`}
            >
              Code ↗
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="card-link card-link--demo"
              aria-label={`View live demo of ${project.title}`}
            >
              Demo ↗
            </a>
          )}
        </div>
      )}
    </article>
  );
}
