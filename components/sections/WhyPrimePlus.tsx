"use client";

import { WHY_PRIME_PLUS } from "@/lib/constants";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function WhyPrimePlus() {
  return (
    <section
      id="why"
      className="relative overflow-hidden bg-navy-900 section-pad"
      aria-labelledby="why-heading"
    >
      <div className="architectural-grid pointer-events-none absolute inset-0 opacity-15" aria-hidden />
      <div className="container-site relative">
        <SectionReveal>
          <div className="mb-14 max-w-2xl">
            <p data-reveal className="eyebrow text-gold-400">
              Why Prime Plus
            </p>
            <h2
              id="why-heading"
              data-reveal
              className="mt-4 font-display text-[clamp(2rem,4.8vw,3.75rem)] text-warm-white"
            >
              <span className="block">{WHY_PRIME_PLUS.heading[0]}</span>
              <span className="mt-1 block text-gold-400">
                {WHY_PRIME_PLUS.heading[1]}
              </span>
            </h2>
            <p data-reveal className="mt-5 text-base text-warm-white/65 md:text-lg">
              {WHY_PRIME_PLUS.subheading}
            </p>
          </div>

          <div className="grid gap-px bg-gold-500/25 sm:grid-cols-2">
            {WHY_PRIME_PLUS.principles.map((principle) => (
              <article
                key={principle.number}
                data-reveal
                className="group relative overflow-hidden bg-navy-900 p-8 transition-colors duration-300 hover:bg-navy-800/70 md:p-10"
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold-500/5 transition-transform duration-500 group-hover:scale-150"
                  aria-hidden
                />
                <p className="font-display text-4xl text-gold-500/80">
                  {principle.number}
                </p>
                <div className="mt-5 h-px w-10 bg-gold-500 transition-all duration-500 group-hover:w-16" />
                <h3 className="mt-5 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-warm-white">
                  {principle.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-warm-white/65">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
