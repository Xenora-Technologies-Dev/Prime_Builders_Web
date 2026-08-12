"use client";

import { INTRO_CONTENT } from "@/lib/constants";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function Introduction() {
  return (
    <section
      id="introduction"
      className="surface-light relative overflow-hidden section-pad"
      aria-labelledby="intro-heading"
    >
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="container-site relative">
        <SectionReveal>
          <div className="mx-auto max-w-3xl text-center">
            <div data-reveal className="mx-auto mb-8 gold-rule" />
            <h2
              id="intro-heading"
              data-reveal
              className="font-display text-[clamp(2rem,5vw,3.75rem)] text-navy-900"
            >
              <span className="block">{INTRO_CONTENT.heading[0]}</span>
              <span className="mt-1 block text-gold-600">
                {INTRO_CONTENT.heading[1]}
              </span>
            </h2>
            <p
              data-reveal
              className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
            >
              {INTRO_CONTENT.body}
            </p>
          </div>

          <ul className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
            {INTRO_CONTENT.points.map((point) => (
              <li
                key={point.title}
                data-reveal
                className="border border-navy-800/10 bg-warm-white/70 p-5 text-left sm:p-6"
              >
                <div className="mb-4 h-px w-8 bg-gold-500" aria-hidden />
                <h3 className="font-display text-2xl text-navy-900">
                  {point.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {point.text}
                </p>
              </li>
            ))}
          </ul>
        </SectionReveal>
      </div>
    </section>
  );
}
