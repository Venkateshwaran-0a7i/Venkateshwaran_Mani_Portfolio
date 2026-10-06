"use client";

import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

export default function Skills() {
  const { skills } = PORTFOLIO_DATA;

  return (
    <section id="skills" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center space-x-3 mb-12">
          <div className="p-3 bg-purple-600/20 text-purple-400 rounded-xl">
            <Cpu className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-extrabold font-heading text-white uppercase tracking-tight">
            Technical Expertise
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 * index }}
              className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-heading text-white">
                    {skill.name}
                  </h3>
                  <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                    {skill.level}%
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {skill.desc}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
