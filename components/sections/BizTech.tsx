"use client";

import { motion } from "framer-motion";
import { Brain, BookOpen, Database, TrendingUp, Network, Factory, Building, CheckCircle } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

const STUDY_ICONS = {
  BookOpen,
  Database,
  TrendingUp,
  Network
};

export default function BizTech() {
  const { biztech } = PORTFOLIO_DATA;

  return (
    <section id="biztech" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center space-x-3 mb-12">
          <div className="p-3 bg-indigo-600/20 text-indigo-400 rounded-xl">
            <Brain className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-extrabold font-heading text-white uppercase tracking-tight">
            Self-Driven Learning &amp; Core Interests
          </h2>
        </div>

        {/* Statement Intro Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-8 rounded-3xl space-y-6 border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-slate-900/80"
        >
          <p className="text-slate-200 text-lg leading-relaxed font-medium">
            {biztech.statement}
          </p>
          <div className="flex flex-wrap gap-2">
            {biztech.learningTags.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 text-xs font-semibold text-indigo-300 bg-indigo-500/10 rounded-full border border-indigo-500/30"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Self-Study Library */}
        <div className="mt-12 space-y-6">
          <h3 className="text-xl font-bold font-heading text-white uppercase tracking-wider">
            📚 Self-Study Library
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {biztech.studies.map((study, index) => {
              const IconComp = STUDY_ICONS[study.icon as keyof typeof STUDY_ICONS] || BookOpen;
              return (
                <motion.div
                  key={study.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="glass-panel glass-panel-hover p-6 rounded-2xl flex items-start space-x-4"
                >
                  <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl shrink-0">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold font-heading text-white">
                      {study.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {study.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Regional Market Alignment */}
        <div className="mt-16 space-y-6">
          <h3 className="text-xl font-bold font-heading text-white uppercase tracking-wider">
            Regional Market Alignment
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {biztech.marketTracks.map((track, index) => (
              <motion.div
                key={track.industry}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-2xl space-y-4"
              >
                <div className="flex items-center space-x-4 border-b border-white/10 pb-4">
                  <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl">
                    {track.icon === "Factory" ? <Factory className="w-6 h-6" /> : <Building className="w-6 h-6" />}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold font-heading text-white uppercase">
                      {track.industry}
                    </h4>
                    <span className="text-xs text-slate-400 font-medium">
                      {track.cities}
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5">
                  {track.points.map((pt) => (
                    <li key={pt} className="flex items-center space-x-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
