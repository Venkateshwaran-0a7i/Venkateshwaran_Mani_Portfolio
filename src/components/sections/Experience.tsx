"use client";

/**
 * Experience — bilateral alternating timeline combining work + education.
 * - Neon laser spine (50% on desktop, left rail on mobile) that fills as you scroll.
 * - Cards alternate left / right; glowing waypoint nodes pulse green (current) or red.
 * - Filter pills (All / Work Experience / Education) with spring-animated indicator.
 */

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { journey, type JourneyType } from "@/data/content";
import SectionHeading from "../SectionHeading";

type Filter = "all" | JourneyType;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "work", label: "Work Experience" },
  { id: "education", label: "Education" },
];

export default function Experience() {
  const [filter, setFilter] = useState<Filter>("all");
  const listRef = useRef<HTMLDivElement>(null);

  const items = journey.filter((m) => filter === "all" || m.type === filter);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 55%"],
  });
  const fill = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  return (
    <section id="experience" className="section section-veil" aria-labelledby="exp-title">
      <div className="wrap">
        <div className="flex flex-col gap-6 lg:flex-row lg:flex-wrap lg:items-end lg:justify-between lg:gap-8">
          <SectionHeading index="04" label="Journey">
            <span id="exp-title">
              Experience <em>&amp;</em> Education
            </span>
          </SectionHeading>

          <div
            role="tablist"
            aria-label="Filter timeline"
            className="relative -mx-1 flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/10 bg-black/60 p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {FILTERS.map((f) => {
              const on = filter === f.id;
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setFilter(f.id)}
                  data-magnetic
                  className={`relative shrink-0 rounded-full px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] transition-colors sm:px-5 sm:text-[0.68rem] sm:tracking-[0.14em] ${
                    on ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="exp-filter"
                      className="absolute inset-0 rounded-full border border-neon/50 bg-accent/40 shadow-[0_0_18px_rgba(196,0,36,0.6)]"
                      transition={{ type: "spring", stiffness: 460, damping: 30 }}
                    />
                  )}
                  <span className="relative whitespace-nowrap">{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div ref={listRef} className="relative mt-16">
          {/* laser spine */}
          <div className="spine left-[18px] md:left-1/2 md:-translate-x-1/2" aria-hidden="true">
            <motion.div className="spine-fill" style={{ scaleY: fill }} />
          </div>

          <ol className="relative space-y-10 md:space-y-14">
            <AnimatePresence mode="popLayout" initial={false}>
              {items.map((m, i) => {
                const left = i % 2 === 0;
                const ring = m.current ? "#18e08a" : "#ff3b5c";
                return (
                  <motion.li
                    key={m.id}
                    layout
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    className="relative pl-12 sm:pl-14 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-20 md:pl-0"
                  >
                    {/* waypoint node */}
                    <span
                      className="absolute left-[18px] top-8 z-10 -translate-x-1/2 md:left-1/2"
                      style={{ ["--ring" as string]: ring }}
                      aria-hidden="true"
                    >
                      <span className="node block" />
                    </span>

                    {/* connector tick to card (desktop) */}
                    <span
                      aria-hidden="true"
                      className={`absolute top-[2.45rem] hidden h-px w-[2rem] md:block ${
                        left
                          ? "right-1/2 mr-2 bg-gradient-to-l from-neon/60 to-transparent"
                          : "left-1/2 ml-2 bg-gradient-to-r from-neon/60 to-transparent"
                      }`}
                    />

                    <article
                      className={`obsidian group relative rounded-lg p-4 transition-colors hover:border-neon/40 sm:p-7 ${
                        left ? "md:col-start-1" : "md:col-start-2"
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                        <span className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-neon sm:text-[0.68rem] sm:tracking-[0.18em]">
                          {m.type === "work" ? "▸ Work" : "▸ Education"}
                          {m.current && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-ok/40 px-2 py-0.5 text-[0.6rem] text-ok">
                              <span className="h-1.5 w-1.5 rounded-full bg-ok" /> Active
                            </span>
                          )}
                        </span>
                        <span className="font-mono text-[0.65rem] text-white/50 sm:text-[0.72rem]">{m.when}</span>
                      </div>

                      <h3 className="mt-3 font-syne text-[1.15rem] font-bold leading-tight text-white sm:mt-4 sm:text-[1.5rem]">
                        {m.title}
                      </h3>
                      <p className="mt-1 text-[0.95rem] text-white/60">
                        {m.org}
                        {m.location ? <span className="text-white/35"> · {m.location}</span> : null}
                      </p>

                      <ul className="mt-4 space-y-2 text-[0.9rem] leading-relaxed text-white/68">
                        {m.bullets.map((b) => (
                          <li key={b} className="flex gap-3">
                            <span className="mt-[0.6em] h-px w-3 shrink-0 bg-neon" />
                            {b}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {m.tags.map((t) => (
                          <span key={t} className="chip">
                            {t}
                          </span>
                        ))}
                      </div>
                    </article>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ol>
        </div>
      </div>
    </section>
  );
}
