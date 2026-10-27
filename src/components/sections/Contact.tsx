"use client";

/**
 * Contact — communication channels + optional client-side form.
 *
 * Form behaviour (static-export safe, no API routes):
 *   1. If NEXT_PUBLIC_FORM_ENDPOINT is set → POST JSON/urlencoded to Formspree /
 *      Web3Forms / Getform compatible endpoints.
 *   2. Otherwise → mailto: with prefilled subject/body + copy-to-clipboard.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/content";
import SectionHeading from "../SectionHeading";
import Magnetic from "../Magnetic";

const FORM_ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";

const CHANNELS = [
  {
    id: "01",
    label: "LinkedIn",
    hint: "Connect professionally",
    value: "venkateshwaran-m",
    href: profile.linkedin,
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V23h-4v-6.55c0-1.56-.03-3.57-2.18-3.57-2.18 0-2.51 1.7-2.51 3.46V23h-4V8.5z" />
      </svg>
    ),
  },
  {
    id: "02",
    label: "Email",
    hint: "Drop a line",
    value: profile.email,
    href: `mailto:${profile.email}`,
    external: false,
    copy: profile.email,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 7 9-7" />
      </svg>
    ),
  },
  {
    id: "03",
    label: "Mobile",
    hint: "Call or WhatsApp",
    value: profile.phone,
    href: `tel:${profile.phoneTel}`,
    external: false,
    copy: profile.phoneTel,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M6.5 3.5h3l1.5 4.5-2 1.5a14 14 0 006 6l1.5-2 4.5 1.5v3a2 2 0 01-2.2 2A17.5 17.5 0 014.5 5.7a2 2 0 012-2.2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "04",
    label: "GitHub",
    hint: "Code & projects",
    value: "Venkateshwaran-0a7i",
    href: profile.github,
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
        <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.1-.75.08-.74.08-.74 1.21.09 1.85 1.25 1.85 1.25 1.08 1.85 2.83 1.32 3.52 1.01.11-.78.42-1.32.76-1.62-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0024 12.5C24 5.87 18.63.5 12 .5z" />
      </svg>
    ),
  },
] as const;

type FormState = { name: string; email: string; message: string };

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const copyValue = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* noop */
      }
      document.body.removeChild(ta);
    }
    setCopied(key);
    setTimeout(() => setCopied(null), 1800);
  };

  const set =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `Portfolio enquiry from ${form.name || "a visitor"}`;
    const body = `${form.message}\n\n— ${form.name}\n${form.email}`;

    if (!FORM_ENDPOINT) {
      const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      setStatus("ok");
      setStatusMsg("Opening your mail client… (or use Copy message)");
      return;
    }

    setStatus("sending");
    setStatusMsg("Sending…");
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          subject,
          // Web3Forms compatibility (ignored by Formspree/Getform)
          access_key: FORM_ENDPOINT.includes("web3forms")
            ? new URL(FORM_ENDPOINT).searchParams.get("key") || undefined
            : undefined,
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("ok");
      setStatusMsg("Message sent — thank you.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("err");
      setStatusMsg("Send failed. Use email / copy message below.");
    }
  };

  const copyMessage = () => {
    const text = `To: ${profile.email}\nSubject: Portfolio enquiry from ${form.name || "a visitor"}\n\n${form.message}\n\n— ${form.name}\n${form.email}`;
    void copyValue("form", text);
  };

  return (
    <section id="contact" className="section section-veil !pb-10" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="mx-auto max-w-3xl text-center [&_.eyebrow]:justify-center [&_.section-title]:text-center">
          <SectionHeading index="07" label="Contact">
            <span id="contact-title">
              Let’s <em>connect</em>
            </span>
          </SectionHeading>
          <p className="mx-auto mt-5 max-w-xl text-[0.95rem] leading-relaxed text-white/60 sm:text-base">
            Open to AI / GenAI roles and collaborations. Reach me on any channel below.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="obsidian relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-lg p-5 sm:mt-14 sm:p-8"
        >
          <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-neon to-transparent shadow-[0_0_16px_#ff3b5c]" />
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-neon">
            ▸ communication channels
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4">
            {CHANNELS.map((c, i) => (
              <motion.li
                key={c.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.5 }}
              >
                <Magnetic strength={0.25} className="block w-full">
                  <a
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="group flex w-full items-start gap-4 rounded-lg border border-white/10 bg-black/40 p-4 transition-colors hover:border-neon/50 hover:bg-accent/10 sm:p-5"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-neon/35 bg-accent/15 text-neon transition group-hover:border-neon group-hover:shadow-[0_0_18px_rgba(196,0,36,0.45)]">
                      {c.icon}
                    </span>
                    <span className="min-w-0 flex-1 text-left">
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-white/40">
                          {c.id} / {c.label}
                        </span>
                        <span className="font-mono text-[0.6rem] uppercase tracking-widest text-neon opacity-0 transition group-hover:opacity-100">
                          open ↗
                        </span>
                      </span>
                      <span className="mt-1 block truncate font-syne text-[1.05rem] font-semibold text-white sm:text-lg">
                        {c.value}
                      </span>
                      <span className="mt-0.5 block font-mono text-[0.68rem] text-white/45">
                        {c.hint}
                      </span>
                    </span>
                  </a>
                </Magnetic>
                {"copy" in c && c.copy ? (
                  <button
                    type="button"
                    onClick={() => copyValue(c.id, c.copy)}
                    className="mt-2 w-full rounded border border-white/10 px-3 py-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-white/50 transition hover:border-neon/40 hover:text-white"
                    aria-live="polite"
                  >
                    {copied === c.id ? "✓ Copied" : `Copy ${c.label}`}
                  </button>
                ) : null}
              </motion.li>
            ))}
          </ul>

          {/* Optional transmit form — works offline via mailto when no endpoint is set */}
          <form onSubmit={submit} className="mt-10 border-t border-white/10 pt-8">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-neon">
              ▸ {FORM_ENDPOINT ? "transmit message" : "compose mail"}
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/45">
                  01 / Name
                </span>
                <input
                  className="field"
                  required
                  autoComplete="name"
                  placeholder="Ada Lovelace"
                  value={form.name}
                  onChange={set("name")}
                />
              </label>
              <label className="block">
                <span className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/45">
                  02 / Email
                </span>
                <input
                  className="field"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={set("email")}
                />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="mb-2 block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-white/45">
                03 / Message
              </span>
              <textarea
                className="field min-h-[120px] resize-y"
                required
                placeholder="Tell me about the problem you’re solving…"
                value={form.message}
                onChange={set("message")}
              />
            </label>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <Magnetic>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === "sending"}
                >
                  {FORM_ENDPOINT ? "Send transmission" : "Open mail client"}{" "}
                  <span aria-hidden="true">→</span>
                </button>
              </Magnetic>
              {!FORM_ENDPOINT && (
                <button
                  type="button"
                  onClick={copyMessage}
                  className="btn btn-ghost"
                >
                  {copied === "form" ? "✓ Copied" : "Copy message"}
                </button>
              )}
            </div>
            <p
              role="status"
              className={`mt-3 text-center font-mono text-[0.7rem] uppercase tracking-[0.14em] ${
                status === "err" ? "text-neon" : status === "ok" ? "text-ok" : "text-white/40"
              }`}
            >
              {statusMsg || (FORM_ENDPOINT ? " " : "No form endpoint set — uses mailto:")}
            </p>
          </form>
        </motion.div>

        <footer className="mt-16 text-center font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/35">
          © {new Date().getFullYear()} {profile.name}
        </footer>
      </div>
    </section>
  );
}
