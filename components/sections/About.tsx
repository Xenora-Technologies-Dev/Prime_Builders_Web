"use client";

import { ABOUT_CONTENT } from "@/lib/constants";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-warm-white section-pad"
      aria-labelledby="about-heading"
    >
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-35" aria-hidden />
      <div className="container-site relative">
        <SectionReveal>
          <div className="grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
            <div>
              <p data-reveal className="eyebrow text-gold-600">
                About Prime Plus
              </p>
              <h2
                id="about-heading"
                data-reveal
                className="mt-5 font-display text-[clamp(2rem,4.8vw,3.75rem)] text-navy-900"
              >
                <span className="block">{ABOUT_CONTENT.heading[0]}</span>
                <span className="mt-1 block text-gold-600">
                  {ABOUT_CONTENT.heading[1]}
                </span>
              </h2>
              <p
                data-reveal
                className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg"
              >
                {ABOUT_CONTENT.body}
              </p>
            </div>

            <ul className="flex flex-col justify-center border border-navy-800/10 bg-warm-white">
              {ABOUT_CONTENT.principles.map((principle, index) => (
                <li
                  key={principle.title}
                  data-reveal
                  className={[
                    "group relative px-7 py-7 transition-colors duration-300 hover:bg-warm-grey/50",
                    index < ABOUT_CONTENT.principles.length - 1
                      ? "border-b border-navy-800/10"
                      : "",
                  ].join(" ")}
                >
                  <span
                    className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-gold-500 transition-transform duration-500 group-hover:scale-y-100"
                    aria-hidden
                  />
                  <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-gold-600">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-base text-navy-900/75">
                    {principle.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
