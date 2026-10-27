import Link from "next/link";
import { asset } from "@/lib/asset";

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-neon">
        404 / signal lost
      </p>
      <h1 className="mt-4 font-display text-5xl font-bold uppercase text-white sm:text-7xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-white/60">
        This route does not exist in the portfolio map. Return home or download the résumé.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Back to home <span aria-hidden="true">→</span>
        </Link>
        <a href={asset("/Venkateshwaran_Mani_CV.pdf")} download className="btn btn-ghost">
          Download résumé
        </a>
      </div>
    </main>
  );
}
