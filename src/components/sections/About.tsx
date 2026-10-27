"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile, skillMatrix, strengths } from "@/data/content";
import SectionHeading from "../SectionHeading";

const fade = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function About() {
  const [domain, setDomain] = useState(skillMatrix[0].id);
  const current = skillMatrix.find((d) => d.id === domain) ?? skillMatrix[0];

  return (
    <section id="about" className="section section-veil" aria-labelledby="about-title">
      <div className="wrap">
        <SectionHeading index="02" label="About">
          <span id="about-title">
            Cyber <em>inspection</em>
          </span>
        </SectionHeading>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* ── terminal ────────────────────────────────────────────── */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="obsidian overflow-hidden rounded-lg lg:col-span-7"
          >
            <div className="flex items-center gap-2 border-b border-white/10 bg-black/50 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-[0.68rem] tracking-wider text-white/45">
                venkat@portfolio:~/about
              </span>
            </div>

            <div className="space-y-5 overflow-x-auto p-5 font-mono text-[0.78rem] leading-relaxed sm:p-8 sm:text-[0.84rem]">
              <div>
                <p className="text-neon">
                  <span className="text-ok">➜</span> ~ whoami
                </p>
                <p className="mt-1.5 text-white">
                  {profile.name} <span className="text-white/40">/</span> {profile.role}
                </p>
              </div>
              <div>
                <p className="text-neon">
                  <span className="text-ok">➜</span> ~ cat objective.txt
                </p>
                <p className="mt-1.5 text-white/75">{profile.objective}</p>
              </div>
              <div>
                <p className="text-neon">
                  <span className="text-ok">➜</span> ~ echo $LOCATION
                </p>
                <p className="mt-1.5 text-white/75">{profile.location}</p>
              </div>
              <div>
                <p className="text-neon">
                  <span className="text-ok">➜</span> ~ ls ./interests
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.interests.map((i) => (
                    <span key={i} className="chip">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-neon">
                  <span className="text-ok">➜</span> ~ locale --spoken
                </p>
                <p className="mt-1.5 text-white/75">{profile.languages.join("  ·  ")}</p>
              </div>
              <p className="caret text-neon">
                <span className="text-ok">➜</span> ~{" "}
              </p>
            </div>
          </motion.div>

          {/* ── core strengths ──────────────────────────────────────── */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <motion.p
              variants={fade}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-white/45"
            >
              {"// core strengths"}
            </motion.p>
            {strengths.map((s, i) => (
              <motion.div
                key={s.title}
                variants={fade}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08 }}
                className="obsidian group relative flex-1 overflow-hidden rounded-lg p-6 transition-colors hover:border-neon/40"
              >
                <span className="absolute inset-y-0 left-0 w-[3px] bg-gradient-to-b from-neon to-accent opacity-70 transition-opacity group-hover:opacity-100" />
                <div className="flex items-baseline justify-between">
                  <h3 className="font-syne text-xl font-bold text-white">{s.title}</h3>
                  <span className="font-mono text-xs text-white/30">0{i + 1}</span>
                </div>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-white/65">{s.text}</p>
              </motion.div>
            ))}
          </div>

          {/* ── interactive skills matrix ───────────────────────────── */}
          <motion.div
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="obsidian rounded-lg p-4 sm:p-6 lg:col-span-12"
          >
            <div className="mb-5 flex items-center justify-between">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-neon">
                ▸ skills matrix — select a domain to scan
              </p>
              <span className="hidden font-mono text-[0.65rem] text-white/35 sm:block">
                {skillMatrix.length} domains indexed
              </span>
            </div>

            <div className="grid gap-5 md:grid-cols-[240px_1fr]">
              <div role="tablist" aria-label="Skill domains" className="flex flex-row gap-2 overflow-x-auto pb-2 md:flex-col md:overflow-visible md:pb-0">
                {skillMatrix.map((d) => {
                  const on = d.id === domain;
                  return (
                    <button
                      key={d.id}
                      role="tab"
                      aria-selected={on}
                      onClick={() => setDomain(d.id)}
                      onMouseEnter={() => setDomain(d.id)}
                      data-magnetic
                      className={`relative shrink-0 rounded-md border px-4 py-3 text-left font-mono text-[0.75rem] uppercase tracking-[0.1em] transition-colors ${
                        on
                          ? "border-neon/60 text-white"
                          : "border-white/10 text-white/50 hover:text-white"
                      }`}
                    >
                      {on && (
                        <motion.span
                          layoutId="matrix-active"
                          className="absolute inset-0 rounded-md bg-accent/25"
                          transition={{ type: "spring", stiffness: 420, damping: 34 }}
                        />
                      )}
                      <span className="relative">{d.label}</span>
                    </button>
                  );
                })}
              </div>

              <div role="tabpanel" className="relative min-h-[190px] rounded-md border border-white/[0.07] bg-black/50 p-5 sm:p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/40">
                      scan result · {current.label}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {current.skills.map((s) => (
                        <span key={s} className="chip !border-neon/30 !text-white">
                          {s}
                        </span>
                      ))}
                    </div>
                    <ul className="mt-5 space-y-2 font-mono text-[0.78rem] text-white/70">
                      {current.evidence.map((e) => (
                        <li key={e} className="flex gap-3">
                          <span className="text-ok">✓</span>
                          {e}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
