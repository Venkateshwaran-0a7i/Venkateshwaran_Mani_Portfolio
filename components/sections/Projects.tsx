"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FolderGit2, Github, CheckCircle2, Star, Container } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

export default function Projects() {
  const { projects, personal } = PORTFOLIO_DATA;

  return (
    <section id="projects" className="py-16 sm:py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center space-x-3 mb-10 sm:mb-14">
          <div className="p-3 bg-blue-600/20 text-blue-400 rounded-2xl border border-blue-500/30 shadow-inner">
            <FolderGit2 className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white uppercase tracking-tight">
            Key Projects
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`glass-panel glass-panel-hover p-5 sm:p-8 rounded-3xl space-y-6 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                project.featured
                  ? "border-amber-500/40 bg-gradient-to-b from-amber-500/10 via-slate-900/80 to-slate-900/95 shadow-2xl shadow-amber-500/10"
                  : "border-slate-800 hover:border-blue-500/40"
              }`}
            >
              <div className="space-y-4">
                {/* Header Row: Category & Key Achievement Ribbon */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    {project.category}
                  </span>

                  {project.featured && (
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider rounded-full border border-amber-500/30">
                      <Star className="w-3.5 h-3.5 fill-amber-300 shrink-0" />
                      <span>Key Achievement</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white leading-tight">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.impactDesc}
                </p>

                {/* Project Image Container */}
                <div className="relative w-full h-44 sm:h-60 rounded-2xl overflow-hidden border border-white/10 shadow-xl group">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-80" />
                </div>

                {/* Power BI stats if featured */}
                {project.stats && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-1">
                    {project.stats.map((st) => (
                      <div
                        key={st.label}
                        className="p-3 bg-slate-950/80 rounded-xl text-center border border-white/10 shadow-inner"
                      >
                        <div className="text-base sm:text-lg font-extrabold text-amber-400 font-heading">
                          {st.value}
                        </div>
                        <div className="text-[10px] text-slate-400 uppercase font-medium tracking-wide">
                          {st.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Docker Callout */}
                {project.dockerCallout && (
                  <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/30 flex items-start gap-3.5">
                    <Container className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div className="space-y-1 text-xs sm:text-sm">
                      <strong className="text-blue-300 font-semibold block">
                        Production-Ready Deployment
                      </strong>
                      <p className="text-slate-300 leading-relaxed text-xs">
                        {project.dockerCallout}
                      </p>
                    </div>
                  </div>
                )}

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-[11px] sm:text-xs font-medium text-slate-300 bg-white/5 rounded-lg border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Repo Link Footer */}
              <div className="pt-4 mt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white text-xs sm:text-sm font-semibold rounded-xl border border-blue-500/30 hover:border-blue-600 transition-all duration-200"
                >
                  <Github className="w-4 h-4 shrink-0" />
                  <span>View Repository</span>
                </a>
                <span className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>README + Docs</span>
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* GitHub Profile Callout Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 sm:mt-12 p-6 sm:p-8 glass-panel glass-panel-hover rounded-3xl border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
        >
          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-5">
            <div className="p-4 bg-slate-800/90 text-white rounded-2xl border border-white/10 shrink-0">
              <Github className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg sm:text-xl font-bold font-heading text-white">
                GitHub Engineering Profile
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Production-ready repositories with Dockerfiles, professional READMEs &amp; clean documentation.
              </p>
            </div>
          </div>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:scale-105 transition-all shadow-xl shadow-blue-600/20 shrink-0 text-sm"
          >
            <span>Visit @Venkateshwaran-0a7i</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
