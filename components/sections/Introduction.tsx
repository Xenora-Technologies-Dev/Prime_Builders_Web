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
        </SectionReveal>
      </div>
    </section>
  );
}
