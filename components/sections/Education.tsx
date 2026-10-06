"use client";

import { motion } from "framer-motion";
import { GraduationCap, Quote } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

export default function Education() {
  const { education, quote } = PORTFOLIO_DATA;

  return (
    <section id="education" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center space-x-3 mb-12">
          <div className="p-3 bg-blue-600/20 text-blue-400 rounded-xl">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-extrabold font-heading text-white uppercase tracking-tight">
            Education
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {education.map((item, index) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
                  {item.period}
                </span>
                <h3 className="text-xl font-bold font-heading text-white">
                  {item.degree}
                </h3>
                <p className="text-sm font-medium text-slate-400">
                  {item.institution}
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Quote Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 via-slate-900/50 to-blue-900/20 border-purple-500/30 flex flex-col justify-between space-y-4 relative overflow-hidden"
          >
            <Quote className="w-10 h-10 text-purple-400/40" />
            <p className="text-slate-200 italic text-base leading-relaxed">
              &quot;{quote.text}&quot;
            </p>
            <p className="text-xs font-bold text-purple-400 uppercase tracking-widest text-right">
              — {quote.author}
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
