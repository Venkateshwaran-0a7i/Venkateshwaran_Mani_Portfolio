"use client";

/**
 * CinematicVideo — cursor-controlled & scroll-scrubbed 3D video background.
 *
 * The <video> is NEVER played. It is permanently paused and its `currentTime`
 * is driven by a requestAnimationFrame loop, so a short clip behaves like
 * an interactive 3D model that responds to cursor movement and scroll.
 *
 *   target time  = (scroll% × 0.72 + cursorX% × 0.28) × duration
 *   current time += (target − current) × 0.10
 *   video.currentTime = current  (only when |Δ| > 0.001 s, wrapped in try/catch)
 *
 * Seeking is NOT gated behind `readyState >= 2`. On video error the stage
 * falls back to the poster + CSS gradient. `prefers-reduced-motion` freezes
 * scrubbing + parallax at frame 0.
 */

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

const LERP = 0.1;
const TILT_LERP = 0.07;
const SEEK_EPSILON = 0.001;
const CURSOR_WEIGHT = 0.28;

const VIDEO_SRC = asset("/video/portfolio-background.mp4");
const POSTER_SRC = asset("/video/poster.jpg");

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

export default function CinematicVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const readyRef = useRef(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ptr = { x: 0.5, y: 0.5, dx: 0, dy: 0, active: false };
    let raf = 0;
    let lastHud = "";

    const markReady = () => {
      if (readyRef.current) return;
      readyRef.current = true;
      video.pause();
      try {
        video.currentTime = 0;
      } catch {
        /* seek queue not ready yet */
      }
    };

    const onError = () => setFailed(true);

    video.addEventListener("loadedmetadata", markReady);
    video.addEventListener("canplay", markReady);
    video.addEventListener("error", onError);
    if (video.readyState >= 1) markReady();

    const keepPaused = () => video.pause();
    video.addEventListener("play", keepPaused);
    video.pause();

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch" || reduceMotion) return;
      ptr.active = true;
      ptr.x = clamp01(e.clientX / window.innerWidth);
      ptr.y = clamp01(e.clientY / window.innerHeight);
      const glow = glowRef.current;
      if (glow) {
        glow.style.setProperty("--xp", `${(ptr.x * 100).toFixed(1)}%`);
        glow.style.setProperty("--yp", `${(ptr.y * 100).toFixed(1)}%`);
      }
    };
    const onLeave = () => {
      ptr.x = 0.5;
      ptr.y = 0.5;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    const tick = () => {
      raf = requestAnimationFrame(tick);

      const root = document.documentElement;
      const scrollMax = Math.max(1, root.scrollHeight - window.innerHeight);
      const scroll = clamp01((window.scrollY || root.scrollTop) / scrollMax);

      const dur = video.duration;
      if (!reduceMotion && !failed && Number.isFinite(dur) && dur > 0) {
        const w = ptr.active ? CURSOR_WEIGHT : 0;
        const progress = scroll * (1 - w) + ptr.x * w;
        targetRef.current = Math.min(progress * dur, dur - 0.05);
        currentRef.current += (targetRef.current - currentRef.current) * LERP;
        if (Math.abs(currentRef.current - video.currentTime) > SEEK_EPSILON) {
          try {
            video.currentTime = currentRef.current;
          } catch {
            /* browser seek queue can throw on fast movement */
          }
        }
      }

      if (!reduceMotion) {
        const nx = ptr.x * 2 - 1;
        const ny = ptr.y * 2 - 1;
        ptr.dx += (nx - ptr.dx) * TILT_LERP;
        ptr.dy += (ny - ptr.dy) * TILT_LERP;
        const tilt = tiltRef.current;
        if (tilt) {
          tilt.style.transform = `scale(1.06) translate3d(${(ptr.dx * -15).toFixed(2)}px, ${(ptr.dy * -15).toFixed(2)}px, 0) rotateX(${(ptr.dy * -2).toFixed(3)}deg) rotateY(${(ptr.dx * 2).toFixed(3)}deg)`;
        }
      }

      const shade = shadeRef.current;
      if (shade) {
        const depth = clamp01(window.scrollY / (window.innerHeight * 0.8));
        shade.style.opacity = (0.3 + depth * 0.45).toFixed(3);
      }

      const bar = barRef.current;
      if (bar) bar.style.transform = `scaleX(${scroll.toFixed(4)})`;

      const hud = hudRef.current;
      if (hud) {
        const txt = `${currentRef.current.toFixed(2)}s|${(scroll * 100).toFixed(0)}|${(ptr.x * 100).toFixed(0)}`;
        if (txt !== lastHud) {
          lastHud = txt;
          hud.innerHTML = reduceMotion
            ? `MOTION <b>OFF</b> · SCROLL <b>${(scroll * 100).toFixed(0)}%</b>`
            : `SCRUB <b>${currentRef.current.toFixed(2)}s</b> / ${
                Number.isFinite(dur) ? dur.toFixed(1) : "—"
              }s · SCROLL <b>${(scroll * 100).toFixed(0)}%</b> · CURSOR-X <b>${(ptr.x * 100).toFixed(0)}%</b>`;
        }
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      video.removeEventListener("loadedmetadata", markReady);
      video.removeEventListener("canplay", markReady);
      video.removeEventListener("error", onError);
      video.removeEventListener("play", keepPaused);
      readyRef.current = false;
    };
  }, [failed]);

  return (
    <>
      <div className="cine-progress" aria-hidden="true">
        <i ref={barRef} />
      </div>

      <div
        className={`cine-stage${failed ? " cine-stage--fallback" : ""}`}
        aria-hidden="true"
        style={
          failed
            ? {
                backgroundImage: `linear-gradient(135deg, #030303 0%, #1a0508 45%, #030303 100%), url(${POSTER_SRC})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <div className="cine-perspective">
          <div ref={tiltRef} className="cine-video-wrap">
            {!failed && (
              <video
                ref={videoRef}
                className="cine-video"
                poster={POSTER_SRC}
                playsInline
                muted
                preload="auto"
                tabIndex={-1}
                disablePictureInPicture
                disableRemotePlayback
              >
                <source src={VIDEO_SRC} type="video/mp4" />
              </video>
            )}
          </div>
        </div>

        <div ref={shadeRef} className="cine-shade" />
        <div className="cine-vignette" />
        <div ref={glowRef} id="cine-glow" className="cine-glow" />
        <div className="cine-grain" />
        <div className="cine-scan" />
      </div>

      <div ref={hudRef} className="cine-hud" aria-hidden="true" />
    </>
  );
}
