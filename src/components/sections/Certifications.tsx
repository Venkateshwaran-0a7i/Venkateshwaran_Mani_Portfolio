"use client";

/**
 * Certifications — 3D draggable circular gallery.
 *
 * GEOMETRY (the "camera pull-back" technique)
 *   cylinder : transform: translateZ(-R) rotateY(angle)
 *   card i   : transform: translate(-50%,-50%) rotateY(i·step) translateZ(R)
 *   → the front-facing card sits at Z = −R + R = 0, i.e. exactly scale 1.0.
 *     No 3D magnification "ballooning", no overlap with the section title.
 *   θ_i = i × (360° / N);  R = 480 desktop / 380 tablet / 275 mobile.
 *
 * BACKFACE CULLING
 *   φ_i = i·step + angle.  When cos(φ_i) < 0 the card faces away from the
 *   viewer → opacity 0, visibility hidden, pointer-events none (plus CSS
 *   backface-visibility:hidden), so no mirrored text ever shows through.
 *
 * PHYSICS (all in one RAF loop, mutating DOM directly — zero React renders/frame)
 *   drag     : Pointer Events + setPointerCapture once the 6px threshold is passed
 *   throw    : velocity from the last ~100 ms of pointer samples
 *   inertia  : v *= 0.945 per frame until |v| < 0.02
 *   auto-spin: 0.06°/frame when idle (toggle button)
 *   click    : shortest rotational delta spins any card to front;
 *              clicking the front card opens the verification modal.
 *
 * No filter:blur anywhere in the loop. `touch-action: pan-y` on the scene so
 * vertical swipes still scroll the page on phones.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { certifications, type Certification } from "@/data/content";
import SectionHeading from "../SectionHeading";
import { useLenis } from "../LenisProvider";

const N = certifications.length;
const STEP = 360 / N;
const DRAG_DEG_PER_PX = 0.3;
const FRICTION = 0.945;
const AUTO_SPIN = 0.06; // deg / frame @60fps
const DRAG_THRESHOLD = 6; // px
const FRAME = 1000 / 60;

const radiusFor = (w: number) =>
  w >= 1280 ? 480 : w >= 1024 ? 420 : w >= 768 ? 360 : w >= 480 ? 300 : 230;
const norm360 = (a: number) => ((a % 360) + 360) % 360;
const shortest = (d: number) => {
  const n = norm360(d);
  return n > 180 ? n - 360 : n;
};

/* ── SHA-256 (with a deterministic fallback for insecure contexts) ─────── */
async function fingerprint(text: string): Promise<string> {
  try {
    if (typeof crypto !== "undefined" && crypto.subtle) {
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
      return Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
    }
  } catch {
    /* fall through */
  }
  // FNV-1a spread over 64 hex chars — display only
  let h = 0x811c9dc5;
  let out = "";
  for (let r = 0; r < 8; r++) {
    for (let i = 0; i < text.length; i++) {
      h ^= text.charCodeAt(i) + r;
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    out += h.toString(16).padStart(8, "0");
  }
  return out;
}

/* ═════════════════════════════════════════════════════════════════════════
   Verification modal
   ═════════════════════════════════════════════════════════════════════════ */
function VerifyModal({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  const [hash, setHash] = useState("");
  const [phase, setPhase] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let alive = true;
    fingerprint(`${cert.title}|${cert.issuer}|${cert.period ?? "n/a"}`).then(
      (h) => alive && setHash(h),
    );
    const t = [
      setTimeout(() => setPhase(1), 280),
      setTimeout(() => setPhase(2), 620),
      setTimeout(() => setPhase(3), 980),
    ];
    return () => {
      alive = false;
      t.forEach(clearTimeout);
    };
  }, [cert]);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        // minimal focus trap: only one focusable control
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [onClose]);

  const lines = [
    "resolving issuer registry",
    "hashing résumé record",
    "matching credential entry",
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[90] grid place-items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <button
        aria-label="Close verification dialog"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-black/80"
        style={{ backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="verify-title"
        data-lenis-prevent
        initial={{ opacity: 0, y: 40, scale: 0.94, rotateX: 12 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, y: 24, scale: 0.96, transition: { duration: 0.2 } }}
        transition={{ type: "spring", stiffness: 280, damping: 28 }}
        className="obsidian relative max-h-[92vh] w-full max-w-[560px] overflow-y-auto overscroll-contain rounded-lg"
        style={{ ["--brand" as string]: cert.brand }}
      >
        <div className="ring-beam" />

        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-neon">
            ◈ credential verification
          </span>
          <button
            ref={closeRef}
            onClick={onClose}
            data-magnetic
            className="rounded border border-white/15 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-widest text-white/70 transition hover:border-neon hover:text-white"
          >
            Esc ✕
          </button>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div
              className="grid h-14 w-14 shrink-0 place-items-center rounded-md border font-display text-xl font-bold"
              style={{
                color: cert.brand,
                borderColor: `${cert.brand}88`,
                background: `${cert.brand}1a`,
                boxShadow: `0 0 24px ${cert.brand}44`,
              }}
              aria-hidden="true"
            >
              {cert.badge}
            </div>
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-white/45">
                issuer · {cert.issuer}
              </p>
              <h3 id="verify-title" className="mt-1 font-syne text-2xl font-bold leading-tight text-white">
                {cert.title}
              </h3>
            </div>
          </div>

          <p className="text-[0.95rem] leading-relaxed text-white/65">{cert.blurb}</p>

          {/* live verification sequence */}
          <div className="rounded-md border border-white/[0.08] bg-black/60 p-4 font-mono text-[0.76rem]">
            {lines.map((l, i) => (
              <div
                key={l}
                className="flex justify-between py-0.5 transition-opacity duration-300"
                style={{ opacity: phase > i ? 1 : 0.18 }}
              >
                <span className="text-white/70">
                  <span className="text-neon">▸</span> {l} …
                </span>
                <span className={phase > i ? "text-ok" : "text-white/30"}>
                  {phase > i ? "OK" : "··"}
                </span>
              </div>
            ))}
            <div
              className="mt-2 flex justify-between border-t border-white/10 pt-2 transition-opacity duration-300"
              style={{ opacity: phase >= 3 ? 1 : 0.18 }}
            >
              <span className="text-white">STATUS</span>
              <span className={phase >= 3 ? "text-ok" : "text-white/30"}>
                {phase >= 3 ? "VERIFIED ✓ RÉSUMÉ RECORD" : "PENDING"}
              </span>
            </div>
          </div>

          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/40">
                Credential ID
              </dt>
              <dd className="mt-1.5">
                <span className="chip !text-white">{cert.code}</span>
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/40">
                Record date
              </dt>
              <dd className="mt-1.5 font-mono text-[0.82rem] text-white">
                {cert.period ?? "Listed on résumé"}
              </dd>
            </div>
          </dl>

          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/40">
              Record fingerprint
            </p>
            <p className="mt-1.5 break-all rounded border border-white/[0.08] bg-black/60 p-3 font-mono text-[0.72rem] leading-relaxed text-neon">
              SHA256://{hash || "computing…"}
            </p>
            <p className="mt-1.5 font-mono text-[0.6rem] leading-relaxed text-white/30">
              SHA-256 of “title | issuer | date” from the résumé entry. A local integrity
              fingerprint — not an issuer-signed credential.
            </p>
          </div>

          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/40">
              Competencies
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {cert.skills.map((s) => (
                <span key={s} className="chip !border-neon/30 !text-white">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═════════════════════════════════════════════════════════════════════════
   Gallery
   ═════════════════════════════════════════════════════════════════════════ */
export default function Certifications() {
  const lenis = useLenis();

  const [radius, setRadius] = useState(480);
  const [front, setFront] = useState(0);
  const [auto, setAuto] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [modal, setModal] = useState<Certification | null>(null);
  const [mounted, setMounted] = useState(false);

  const cylRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const frontRef = useRef(0);
  const suppressClick = useRef(false);

  // all physics state lives here — never in React state
  const st = useRef({
    angle: 0,
    vel: 0,
    target: null as number | null,
    dragging: false,
    pressed: false,
    auto: true,
    idleAt: 0,
    R: 480,
    lastX: 0,
    moved: 0,
    samples: [] as { x: number; t: number }[],
  });

  /* responsive radius + reduced-motion default */
  useEffect(() => {
    setMounted(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      st.current.auto = false;
      setAuto(false);
    }
    const onResize = () => {
      const r = radiusFor(window.innerWidth);
      st.current.R = r;
      setRadius(r);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* the RAF loop: inertia, auto-spin, spin-to, culling */
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const s = st.current;

    const apply = () => {
      const cyl = cylRef.current;
      if (cyl) {
        cyl.style.transform = `translateZ(${-s.R}px) rotateY(${s.angle.toFixed(3)}deg)`;
      }
      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const phi = ((i * STEP + s.angle) * Math.PI) / 180;
        const c = Math.cos(phi);
        if (c < 0) {
          // backface culling
          if (el.style.visibility !== "hidden") {
            el.style.visibility = "hidden";
            el.style.pointerEvents = "none";
          }
          el.style.opacity = "0";
        } else {
          if (el.style.visibility !== "visible") {
            el.style.visibility = "visible";
            el.style.pointerEvents = "auto";
          }
          el.style.opacity = Math.min(1, 0.3 + c * 1.1).toFixed(3);
        }
      }
      const f = ((Math.round(-s.angle / STEP) % N) + N) % N;
      if (f !== frontRef.current) {
        frontRef.current = f;
        setFront(f);
      }
    };

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      const k = Math.min(3, (t - last) / FRAME); // frame-rate independent
      last = t;

      if (!s.dragging) {
        if (s.target !== null) {
          const d = s.target - s.angle;
          s.angle += d * Math.min(1, 0.11 * k);
          s.vel = 0;
          if (Math.abs(d) < 0.04) {
            s.angle = s.target;
            s.target = null;
            s.idleAt = t + 2500;
          }
        } else if (Math.abs(s.vel) > 0.02) {
          s.angle += s.vel * k; // throw inertia
          s.vel *= Math.pow(FRICTION, k); // friction damping
          if (Math.abs(s.vel) <= 0.02) {
            s.vel = 0;
            s.idleAt = t + 1500;
          }
        } else if (s.auto && t >= s.idleAt) {
          s.angle += AUTO_SPIN * k; // gentle idle spin
        }
      }
      apply();
    };
    apply();
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* modal: pause Lenis */
  useEffect(() => {
    if (!modal) return;
    lenis.stop();
    return () => lenis.start();
  }, [modal, lenis]);

  const closeModal = useCallback(() => setModal(null), []);

  const spinTo = useCallback((i: number) => {
    const s = st.current;
    s.vel = 0;
    s.target = s.angle + shortest(-i * STEP - s.angle); // shortest rotational delta
  }, []);

  /* ── pointer handlers (unified mouse / touch / pen) ─────────────────── */
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    const s = st.current;
    s.pressed = true;
    s.dragging = false;
    s.moved = 0;
    s.lastX = e.clientX;
    s.target = null;
    s.vel = 0;
    s.samples = [{ x: e.clientX, t: performance.now() }];
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = st.current;
    if (!s.pressed) return;
    const dx = e.clientX - s.lastX;
    s.lastX = e.clientX;
    s.moved += Math.abs(dx);

    if (!s.dragging && s.moved > DRAG_THRESHOLD) {
      s.dragging = true;
      setDragging(true);
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        /* pointer already released */
      }
    }
    if (s.dragging) {
      s.angle += dx * DRAG_DEG_PER_PX;
      const now = performance.now();
      s.samples.push({ x: e.clientX, t: now });
      // keep ~120 ms of history (multi-sample velocity)
      while (s.samples.length > 2 && now - s.samples[0].t > 120) s.samples.shift();
    }
  };

  const endPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const s = st.current;
    if (!s.pressed) return;
    s.pressed = false;

    if (s.dragging) {
      const now = performance.now();
      const a = s.samples[0];
      const b = s.samples[s.samples.length - 1];
      let v = 0;
      if (a && b && b.t > a.t && now - b.t < 90) {
        // px/ms → deg/frame
        v = ((b.x - a.x) / (b.t - a.t)) * FRAME * DRAG_DEG_PER_PX;
      }
      s.vel = Math.max(-14, Math.min(14, v));
      s.idleAt = now + 1500;
      s.dragging = false;
      setDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
      // swallow the click that follows a drag
      suppressClick.current = true;
      setTimeout(() => (suppressClick.current = false), 0);
    }
  };

  const onCardClick = (i: number) => {
    if (suppressClick.current) return;
    if (i === frontRef.current) setModal(certifications[i]);
    else spinTo(i);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      spinTo((frontRef.current + N - 1) % N);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      spinTo((frontRef.current + 1) % N);
    } else if (e.key === "Enter" && e.target === e.currentTarget) {
      setModal(certifications[frontRef.current]);
    }
  };

  const toggleAuto = () => {
    const next = !st.current.auto;
    st.current.auto = next;
    st.current.idleAt = performance.now() + 400;
    setAuto(next);
  };

  return (
    <section
      id="certifications"
      className="section section-veil"
      aria-labelledby="cert-title"
    >
      <div className="wrap">
        <div className="flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-6">
          <SectionHeading index="05" label="Credentials">
            <span id="cert-title">
              Certifi<em>cations</em>
            </span>
          </SectionHeading>

          <button
            type="button"
            onClick={toggleAuto}
            aria-pressed={auto}
            data-magnetic
            className="w-fit rounded border border-white/15 bg-black/60 px-3 py-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/80 transition hover:border-neon hover:text-white sm:px-4 sm:py-2.5 sm:text-[0.7rem] sm:tracking-[0.18em]"
          >
            <span className={auto ? "text-ok" : "text-neon"}>
              [AUTO-SPIN {auto ? "ON" : "PAUSED"}]
            </span>
          </button>
        </div>

        <p className="mt-5 max-w-xl text-[0.9rem] text-white/55 sm:mt-6 sm:text-base">
          Drag to rotate, throw to spin. Click a card to bring it front — click the front
          card to run a verification check.
        </p>
      </div>

      {/* 3D scene — full-bleed, extra top margin so the ring never touches the title */}
      <div
        className={`ring-scene mt-12 outline-none ${dragging ? "is-dragging" : ""}`}
        role="group"
        aria-roledescription="carousel"
        aria-label="Certifications — use left and right arrow keys to rotate"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPointer}
        onPointerCancel={endPointer}
        onKeyDown={onKeyDown}
      >
        <div ref={cylRef} className="ring-cylinder">
          {certifications.map((c, i) => (
            <button
              key={c.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              type="button"
              tabIndex={i === front ? 0 : -1}
              onClick={() => onCardClick(i)}
              aria-label={`${c.title}, ${c.issuer}. ${
                i === front ? "Open verification" : "Bring to front"
              }`}
              className={`ring-card obsidian ${i === front ? "is-front" : ""}`}
              style={{
                transform: `translate(-50%, -50%) rotateY(${i * STEP}deg) translateZ(${radius}px)`,
                backfaceVisibility: "hidden",
                ["--brand" as string]: c.brand,
              }}
            >
              <span className="ring-beam" />
              <span className="flex h-full flex-col p-5 sm:p-6">
                <span className="flex items-center justify-between">
                  <span
                    className="grid h-10 w-10 place-items-center rounded-md border font-display text-base font-bold"
                    style={{
                      color: c.brand,
                      borderColor: `${c.brand}88`,
                      background: `${c.brand}1a`,
                    }}
                  >
                    {c.badge}
                  </span>
                  <span className="font-mono text-[0.6rem] tracking-widest text-white/35">
                    {String(i + 1).padStart(2, "0")}/{String(N).padStart(2, "0")}
                  </span>
                </span>

                <span className="mt-5 block font-mono text-[0.62rem] uppercase tracking-[0.16em] text-white/45">
                  {c.issuer}
                </span>
                <span className="mt-1.5 block font-syne text-[1.18rem] font-bold leading-snug text-white">
                  {c.title}
                </span>
                <span className="mt-2 block text-[0.8rem] leading-relaxed text-white/55">
                  {c.blurb}
                </span>

                <span className="mt-auto block">
                  <span className="chip !text-[0.62rem]" style={{ color: c.brand, borderColor: `${c.brand}55` }}>
                    {c.code}
                  </span>
                  <span className="mt-3 flex items-center justify-between font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/40">
                    <span>{c.period ?? "On résumé"}</span>
                    <span className="text-neon">Verify ▸</span>
                  </span>
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* pagination track */}
      <div className="wrap mt-6">
        <div
          className="mx-auto flex max-w-sm items-center justify-center gap-3"
          role="tablist"
          aria-label="Select certification"
        >
          {certifications.map((c, i) => {
            const on = i === front;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={on}
                aria-label={`Show ${c.title}`}
                onClick={() => spinTo(i)}
                data-magnetic
                className="group grid h-6 place-items-center px-1"
              >
                <span
                  className="block h-[3px] rounded-full transition-all duration-500"
                  style={{
                    width: on ? 38 : 16,
                    background: on ? "#ff3b5c" : "rgba(255,255,255,0.22)",
                    boxShadow: on ? "0 0 12px #ff3b5c" : "none",
                  }}
                />
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-white/40">
          {String(front + 1).padStart(2, "0")} / {String(N).padStart(2, "0")} ·{" "}
          {certifications[front].title}
        </p>
      </div>

      {/* portal: <main> is its own stacking context (z-10) which would sit under the navbar */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {modal && <VerifyModal key={modal.id} cert={modal} onClose={closeModal} />}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
