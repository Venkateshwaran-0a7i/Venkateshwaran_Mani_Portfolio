"use client";

import { motion, type Variants } from "framer-motion";
import { metrics, profile } from "@/data/content";
import Counter from "../Counter";
import Magnetic from "../Magnetic";
import { useLenis } from "../LenisProvider";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 46 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const lenis = useLenis();

  return (
    <section
      id="hero"
      className="section relative flex min-h-[100svh] flex-col !py-0"
      aria-label="Introduction"
    >
      {/* background watermark — candidate's first name */}
      <div
        className="hero-watermark"
        aria-hidden="true"
        style={{
          WebkitTextStroke: "2px rgba(196, 0, 36, 0.35)",
          textShadow: "0 0 50px rgba(196, 0, 36, 0.18)",
        }}
      >
        {profile.firstName}
      </div>

      <div className="wrap relative flex flex-1 items-center pb-8 pt-28 sm:pb-10 sm:pt-36">
        <motion.div className="w-full" variants={container} initial="hidden" animate="show">
          {/* eyebrow badge */}
          <motion.div variants={rise}>
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-neon/40 bg-black/45 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-neon sm:gap-3 sm:px-4 sm:py-2 sm:text-[0.72rem] sm:tracking-[0.2em]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-neon shadow-[0_0_10px_#ff3b5c]" />
              <span className="truncate">{profile.badge}</span>
            </span>
          </motion.div>

          {/* headline */}
          <motion.h1
            variants={rise}
            className="hero-title mt-5 sm:mt-7"
            style={{ maxWidth: "13ch" }}
          >
            <span className="l1">{profile.headline[0]}</span>
            <span className="l2">
              {profile.headline[1]}
              <span className="dot">.</span>
            </span>
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-5 max-w-[34rem] text-[0.95rem] leading-relaxed text-white/70 sm:mt-8 sm:text-lg"
          >
            <span className="text-white">{profile.name}</span> — {profile.summary}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={rise} className="mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#projects"
                className="btn btn-primary w-full justify-center sm:w-auto"
                onClick={(e) => {
                  e.preventDefault();
                  lenis.scrollTo("#projects", -24);
                }}
              >
                Explore Work <span aria-hidden="true">→</span>
              </a>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a href={profile.cv} download className="btn btn-ghost w-full justify-center sm:w-auto">
                Download Résumé
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* telemetry strip */}
      <motion.div
        className="relative pb-6 sm:pb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="wrap">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-white/10 bg-white/10 md:grid-cols-5">
            {metrics.map((m) => (
              <div key={m.label} className="flex flex-col-reverse justify-end gap-1.5 bg-black/70 px-3 py-3 sm:gap-2 sm:px-5 sm:py-4">
                <dt className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/45 sm:text-[0.62rem] sm:tracking-[0.18em]">
                  {m.label}
                </dt>
                <dd className="font-display text-2xl font-semibold leading-none text-white sm:text-4xl">
                  <Counter to={m.value} prefix={m.prefix} suffix={m.suffix} decimals={m.decimals} />
                </dd>
              </div>
            ))}
            <div className="col-span-2 flex items-center gap-3 bg-black/70 px-3 py-3 sm:gap-4 sm:px-5 sm:py-4 md:col-span-1">
              <span className="beacon shrink-0" aria-hidden="true" />
              <div>
                <div className="font-display text-base font-semibold uppercase leading-none text-white sm:text-lg">
                  Currently Working
                </div>
                <div className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-ok sm:text-[0.62rem] sm:tracking-[0.18em]">
                  Open to Help
                </div>
              </div>
            </div>
          </dl>
        </div>
      </motion.div>

      <div
        className="absolute bottom-3 right-6 hidden flex-col items-center gap-3 lg:flex"
        aria-hidden="true"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-white/40 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="scroll-cue" />
      </div>
    </section>
  );
}
