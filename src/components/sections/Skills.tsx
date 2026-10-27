"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/data/content";
import SectionHeading from "../SectionHeading";

export default function Skills() {
  const groups = Object.entries(skillGroups);

  return (
    <section id="skills" className="section section-veil" aria-labelledby="skills-title">
      <div className="wrap">
        <SectionHeading index="06" label="Arsenal">
          <span id="skills-title">
            Tech <em>stack</em>
          </span>
        </SectionHeading>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map(([group, skills], gi) => (
            <motion.div
              key={group}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (gi % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="obsidian group relative overflow-hidden rounded-lg p-5 transition-colors hover:border-neon/40 sm:p-6"
            >
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex items-baseline justify-between">
                <h3 className="font-syne text-lg font-bold text-white">{group}</h3>
                <span className="font-mono text-[0.65rem] text-white/35">
                  {String(skills.length).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className="chip">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
