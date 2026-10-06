"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download, Mail, Github, Linkedin, Trophy } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

export default function Hero() {
  const { personal, metrics, topAchievement } = PORTFOLIO_DATA;

  return (
    <section id="summary" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-12 space-y-8"
          >
            {/* Header with Avatar */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500" />
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl bg-slate-900">
                  <Image
                    src={personal.avatar}
                    alt={personal.name}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                </div>
              </div>

              <div className="text-center sm:text-left space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-heading tracking-tight text-white">
                  {personal.name}
                </h1>
                <p className="text-lg sm:text-xl font-medium text-blue-400">
                  <span className="text-blue-400 font-semibold">{personal.title}</span>
                  <span className="text-slate-500 mx-2">|</span>
                  <span className="text-slate-300">Generative AI</span>
                  <span className="text-slate-500 mx-2">|</span>
                  <span className="text-slate-300">AI Agents</span>
                  <span className="text-slate-500 mx-2">|</span>
                  <span className="text-slate-300">LLMs</span>
                  <span className="text-slate-500 mx-2">|</span>
                  <span className="text-slate-300">RAG</span>
                </p>
              </div>
            </div>

            {/* Bio */}
            <div className="glass-panel p-6 sm:p-8 rounded-2xl space-y-3">
              <h2 className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
                Professional Summary
              </h2>
              <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                An experienced{" "}
                <span className="text-blue-400 font-semibold">AI R&D Engineer</span> working
                at the intersection of data, engineering, and business outcomes — building clean
                pipelines, training ML models, and translating raw data into clear insights teams
                can actually use. Skilled in designing{" "}
                <span className="text-purple-400 font-semibold">Generative AI solutions</span>,{" "}
                <span className="text-cyan-400 font-semibold">AI Agents</span>,{" "}
                <span className="text-blue-400 font-semibold">LLMs</span>, and{" "}
                <span className="text-indigo-400 font-semibold">RAG pipelines</span>. Proven
                track record of reducing reporting time by{" "}
                <strong className="text-white">30%</strong>, improving model accuracy by{" "}
                <strong className="text-white">20%</strong>, and delivering multiple end-to-end
                analytics and machine learning solutions across real-world projects and
                internships.
              </p>
            </div>

            {/* Metrics Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="glass-panel glass-panel-hover p-5 rounded-xl text-center space-y-1"
                >
                  <div className="text-3xl sm:text-4xl font-extrabold font-heading gradient-text">
                    {metric.value}
                    {metric.suffix}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-400 font-medium leading-tight">
                    {metric.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Top Achievement Spotlight */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/10 via-blue-600/10 to-purple-600/10 border border-amber-500/30 p-6 shadow-xl"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <div className="inline-block px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 rounded-full border border-amber-500/30">
                      {topAchievement.badge}
                    </div>
                    <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                      {topAchievement.description}
                    </p>
                  </div>
                </div>
                <div className="self-end md:self-center px-4 py-2 bg-amber-500/20 text-amber-300 font-bold font-heading rounded-xl border border-amber-500/40 text-center whitespace-nowrap">
                  {topAchievement.highlight}
                </div>
              </div>
            </motion.div>

            {/* Social & Contact Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-panel glass-panel-hover text-slate-200 hover:text-white rounded-xl transition"
                title="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-panel glass-panel-hover text-blue-400 hover:text-blue-300 rounded-xl transition"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium rounded-xl shadow-lg shadow-blue-600/30 transition hover:scale-105"
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </a>
              <div className="inline-flex items-center gap-2 px-4 py-3 glass-panel text-slate-300 text-sm font-medium rounded-xl">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>{personal.email}</span>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
