"use client";

import { motion } from "framer-motion";
import { Award, Sparkles, Heart } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

export default function Certifications() {
  const { certifications, additional } = PORTFOLIO_DATA;

  return (
    <section id="certifications" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Certifications Section */}
        <div>
          <div className="flex items-center space-x-3 mb-12">
            <div className="p-3 bg-amber-600/20 text-amber-400 rounded-xl">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-extrabold font-heading text-white uppercase tracking-tight">
              Professional Certifications
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="glass-panel glass-panel-hover p-6 rounded-2xl space-y-3 border-amber-500/20 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {cert.org}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-200 leading-snug">
                    {cert.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Additional Info (Strengths & Interests) */}
        <div id="additional">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-emerald-600/20 text-emerald-400 rounded-xl">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-white uppercase tracking-tight">
              Additional Information
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Strengths */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4"
            >
              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
                Core Strengths
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {additional.strengths.map((str) => (
                  <div
                    key={str}
                    className="p-3 bg-white/5 rounded-xl text-xs font-medium text-slate-200 border border-white/5 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="glass-panel p-6 sm:p-8 rounded-2xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-rose-400">
                  <Heart className="w-4 h-4" />
                  <h3 className="text-xs font-bold uppercase tracking-widest">
                    Areas of Interest
                  </h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed font-medium">
                  {additional.interests}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
