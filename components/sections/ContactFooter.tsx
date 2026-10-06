"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Github } from "lucide-react";
import { PORTFOLIO_DATA } from "@/lib/data";

export default function ContactFooter() {
  const { personal } = PORTFOLIO_DATA;

  return (
    <footer id="contact" className="pt-20 pb-12 relative z-10 border-t border-white/10 bg-[#060911]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
            Let&apos;s Connect
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white uppercase tracking-tight">
            Get In Touch
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Have a project in mind, interested in AI R&amp;D collaboration, or want to discuss machine learning opportunities? Feel free to reach out directly.
          </p>
        </div>

        {/* Contact Link Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <motion.a
            href={`mailto:${personal.email}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel glass-panel-hover p-6 rounded-2xl text-center space-y-3 flex flex-col items-center justify-center group"
          >
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl group-hover:scale-110 transition">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase">Email</div>
              <div className="text-sm font-bold text-slate-200 group-hover:text-blue-400 transition truncate max-w-[200px] sm:max-w-none">
                {personal.email}
              </div>
            </div>
          </motion.a>

          <motion.a
            href={`tel:${personal.phone.replace(/\s+/g, "")}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-panel glass-panel-hover p-6 rounded-2xl text-center space-y-3 flex flex-col items-center justify-center group"
          >
            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-xl group-hover:scale-110 transition">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase">Phone</div>
              <div className="text-sm font-bold text-slate-200 group-hover:text-purple-400 transition">
                {personal.phone}
              </div>
            </div>
          </motion.a>

          <motion.a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-panel glass-panel-hover p-6 rounded-2xl text-center space-y-3 flex flex-col items-center justify-center group"
          >
            <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl group-hover:scale-110 transition">
              <Linkedin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase">LinkedIn</div>
              <div className="text-sm font-bold text-slate-200 group-hover:text-cyan-400 transition">
                LinkedIn Profile
              </div>
            </div>
          </motion.a>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-4">
            <a href={personal.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <Github className="w-4 h-4" />
            </a>
            <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
          <div className="uppercase tracking-widest">
            © 2026 {personal.name} — Built with 3D &amp; Premium Aesthetics
          </div>
        </div>

      </div>
    </footer>
  );
}
