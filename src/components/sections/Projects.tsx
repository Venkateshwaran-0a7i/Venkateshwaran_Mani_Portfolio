"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { projects, profile, type Project } from "@/data/content";
import SectionHeading from "../SectionHeading";

const SPANS = [
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "md:col-span-2 lg:col-span-2",
];

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const fine = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !fine()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0‥1
    const py = (e.clientY - r.top) / r.height;
    el.style.transition = "transform 0.08s linear";
    el.style.transform = `perspective(900px) rotateX(${((0.5 - py) * 11).toFixed(2)}deg) rotateY(${((px - 0.5) * 13).toFixed(2)}deg) translateZ(10px)`;
    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateZ(0)";
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, delay: (i % 3) * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className={`${SPANS[i] ?? ""} [perspective:900px]`}
    >
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        data-magnetic
        className="obsidian group relative h-full overflow-hidden rounded-lg p-6 [transform-style:preserve-3d] sm:p-7"
        style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%" }}
      >
        {/* cursor spotlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx) var(--my), rgba(255,59,92,0.2), transparent 60%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/70 to-transparent"
        />

        <div className="relative flex h-full flex-col" style={{ transform: "translateZ(28px)" }}>
          <div className="flex items-start justify-between">
            <span className="font-display text-5xl font-bold leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,59,92,0.55)]">
              {p.index}
            </span>
            <span className="rounded border border-white/10 px-2 py-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/45">
              {p.kind}
            </span>
          </div>

          <h3 className="mt-5 font-syne text-[1.45rem] font-bold leading-tight text-white sm:text-[1.6rem]">
            {p.title}
          </h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-white/65">{p.desc}</p>

          <ul className="mt-4 space-y-1.5 text-[0.85rem] text-white/55">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-2.5">
                <span className="mt-[0.5em] h-1 w-1 shrink-0 rounded-full bg-neon" />
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-3 pt-6">
            {p.repo ? (
              <a
                href={p.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost !px-4 !py-2.5 !text-[0.72rem]"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
            ) : null}
            {p.demo ? (
              <a
                href={p.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary !px-4 !py-2.5 !text-[0.72rem]"
              >
                Live Demo <span aria-hidden="true">↗</span>
              </a>
            ) : null}
            {!p.repo && !p.demo ? (
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/35">
                Academic / internal build
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section section-veil" aria-labelledby="projects-title">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading index="03" label="Selected Work">
            <span id="projects-title">
              Things I <em>built</em>
            </span>
          </SectionHeading>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost w-full justify-center sm:w-auto"
          >
            All repos on GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
