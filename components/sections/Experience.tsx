"use client";

import { motion } from "framer-motion";
import { Briefcase, CheckCircle2 } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

export default function Experience() {
  const { experience } = PORTFOLIO_DATA;

  return (
    <section id="experience" className="py-16 sm:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-10 sm:mb-14">
          <div className="p-3 bg-cyan-600/20 text-cyan-400 rounded-2xl border border-cyan-500/30 shadow-inner">
            <Briefcase className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white uppercase tracking-tight">
            Professional Experience
          </h2>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative border-l-2 border-slate-800 ml-3 sm:ml-6 space-y-10 sm:space-y-12 pl-5 sm:pl-10">
          {experience.map((item, index) => (
            <motion.div
              key={item.role + item.company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="relative group"
            >
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[27px] sm:-left-[47px] top-2.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-900 border-2 border-cyan-400 group-hover:border-purple-400 group-hover:scale-125 transition-all duration-300 shadow-md shadow-cyan-400/50" />

              {/* Experience Card */}
              <div className="glass-panel glass-panel-hover p-5 sm:p-8 rounded-3xl space-y-4 border-slate-800 hover:border-cyan-500/40">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-block px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 rounded-full border border-cyan-500/20">
                      {item.period}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold font-heading text-white leading-tight">
                    {item.role}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-300">
                    {item.company}
                  </p>
                </div>

                {/* Impact Badge Callout */}
                <div className="inline-flex max-w-full items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs sm:text-sm font-medium text-cyan-200 leading-normal">
                  <span>{item.badge}</span>
                </div>

                {/* Bullet points list */}
                <ul className="space-y-3 pt-2">
                  {item.points.map((point, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-1 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
