"use client";

/**
 * Navbar — two floating frosted-glass islands with an open center gap
 * so the hero face stays clear (name + résumé left, section links right).
 * Links show from lg up; drawer + hamburger below that.
 */

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/content";
import { useLenis } from "./LenisProvider";

export const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Journey" },
  { id: "certifications", label: "Certs" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
] as const;

export default function Navbar() {
  const lenis = useLenis();
  const [active, setActive] = useState<string>("hero");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* active-section tracking */
  useEffect(() => {
    const els = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));

    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* drawer: pause smooth-scroll + ESC */
  useEffect(() => {
    if (!open) return;
    lenis.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  const go = useCallback(
    (id: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      setOpen(false);
      // wait a tick so Lenis restarts before it is asked to scroll
      setTimeout(() => {
        if (id === "hero") lenis.scrollTo(0);
        else lenis.scrollTo(`#${id}`, -24);
      }, 30);
      history.replaceState(null, "", `#${id}`);
    },
    [lenis],
  );

  const island = `flex items-center gap-1 rounded-full border px-2 py-2 transition-all duration-500 ${
    scrolled
      ? "border-white/10 bg-black/55 shadow-[0_10px_50px_-12px_rgba(196,0,36,0.45)]"
      : "border-white/[0.07] bg-black/25"
  }`;
  const glass = {
    backdropFilter: "blur(18px) saturate(1.4)",
    WebkitBackdropFilter: "blur(18px) saturate(1.4)",
  } as const;

  return (
    <>
      {/*
        Two floating islands with an open center gap so the hero face
        stays clear — name+résumé left, section links right.
      */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between gap-2 px-2.5 pt-[max(0.85rem,env(safe-area-inset-top))] sm:gap-4 sm:px-5 sm:pt-5 lg:px-8">
        {/* left island — name + résumé (résumé collapses on tiny phones) */}
        <div
          className={`${island} pointer-events-auto max-w-[min(100%,calc(100vw-4.25rem))] gap-1.5 pl-3.5 pr-1.5 sm:gap-2 sm:pl-5 sm:pr-2`}
          style={glass}
        >
          <a
            href="#hero"
            onClick={go("hero")}
            data-magnetic
            className="min-w-0 shrink truncate font-display text-[0.95rem] font-bold uppercase tracking-[0.04em] text-white sm:text-[1.25rem]"
            aria-label={`${profile.firstName} — back to top`}
          >
            <span className="sm:hidden">Venkat</span>
            <span className="hidden sm:inline">{profile.firstName}</span>
            <span className="text-bright drop-shadow-[0_0_8px_rgba(224,0,42,0.9)]">.</span>
          </a>
          <a
            href={profile.cv}
            download
            data-magnetic
            className="shrink-0 rounded-full border border-white/15 px-2.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/80 transition hover:border-neon hover:text-white sm:px-4 sm:py-2 sm:text-[0.68rem] sm:tracking-[0.16em]"
          >
            <span className="sm:hidden">CV ↓</span>
            <span className="hidden sm:inline">Résumé ↓</span>
          </a>
        </div>

        {/* open center — face stays visible through the gap */}

        {/* right island — links (lg+) or hamburger */}
        <nav
          aria-label="Primary"
          className={`${island} pointer-events-auto shrink-0 px-1.5 sm:px-2`}
          style={glass}
        >
          <ul className="relative hidden items-center gap-0 lg:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative z-10 block rounded-full px-2.5 py-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] transition-colors xl:px-3 xl:text-[0.68rem] xl:tracking-[0.14em] ${
                      isActive ? "text-white" : "text-white/55 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-neon/50 bg-accent/30 shadow-[0_0_20px_rgba(196,0,36,0.55)]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            onClick={() => setOpen((v) => !v)}
            className="relative grid h-9 w-9 place-items-center rounded-full border border-white/15 sm:h-10 sm:w-10 lg:hidden"
          >
            <span
              className={`absolute h-px w-4 bg-white transition-transform duration-300 ${
                open ? "rotate-45" : "-translate-y-[3px]"
              }`}
            />
            <span
              className={`absolute h-px w-4 bg-white transition-transform duration-300 ${
                open ? "-rotate-45" : "translate-y-[3px]"
              }`}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              className="fixed inset-0 z-[55] bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              key="drawer"
              id="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="fixed right-0 top-0 z-[56] flex h-full w-[min(86vw,360px)] flex-col border-l border-white/10 bg-[#070707]/95 px-7 pb-8 pt-24"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 34 }}
            >
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.045 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={go(item.id)}
                      className={`flex items-baseline gap-4 border-b border-white/[0.06] py-3 font-display text-[1.9rem] font-semibold uppercase ${
                        active === item.id ? "text-neon" : "text-white"
                      }`}
                    >
                      <span className="font-mono text-[0.7rem] text-white/40">
                        0{i + 1}
                      </span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a
                href={profile.cv}
                download
                className="btn btn-primary mt-auto justify-center"
              >
                Download Résumé
              </a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
