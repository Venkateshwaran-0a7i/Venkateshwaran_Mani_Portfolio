"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  index: string;
  label: string;
  children: ReactNode;
  className?: string;
}

/** Shared eyebrow + big Oswald title with a masked reveal. */
export default function SectionHeading({ index, label, children, className = "" }: Props) {
  return (
    <div className={className}>
      <motion.div
        className="eyebrow"
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
      >
        {index} / {label}
      </motion.div>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.h2>
    </div>
  );
}
