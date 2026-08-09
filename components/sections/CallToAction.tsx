"use client";

import { CTA_CONTENT } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function CallToAction() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-navy-950 section-pad"
      aria-labelledby="cta-heading"
    >
      <div className="architectural-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 80% 50%, rgba(198,146,46,0.16) 0%, transparent 65%), radial-gradient(ellipse 40% 50% at 70% 70%, rgba(6,43,92,0.55) 0%, transparent 70%)",
        }}
      />

      {/* Abstract architectural silhouette */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 hidden h-[75%] w-[45%] opacity-40 lg:block"
        aria-hidden
      >
        <div className="absolute bottom-0 right-[18%] h-[70%] w-[18%] bg-gradient-to-t from-navy-800 to-navy-700/50" />
        <div className="absolute bottom-0 right-[38%] h-[95%] w-[22%] bg-gradient-to-t from-navy-800 via-navy-700 to-[#1a5a96]/40">
          <div className="absolute left-1/2 top-0 h-8 w-1 -translate-x-1/2 -translate-y-full bg-gold-500/70" />
        </div>
        <div className="absolute bottom-[42%] right-[8%] h-[2px] w-[70%] bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />
      </div>

      <div className="container-site relative">
        <SectionReveal>
          <div className="max-w-2xl">
            <h2
              id="cta-heading"
              data-reveal
              className="font-display text-[clamp(2.4rem,6vw,4.75rem)] text-warm-white"
            >
              <span className="block">{CTA_CONTENT.heading[0]}</span>
              <span className="mt-1 block text-gold-400">
                {CTA_CONTENT.heading[1]}
              </span>
            </h2>
            <p
              data-reveal
              className="mt-7 max-w-lg text-base leading-relaxed text-warm-white/70 md:text-lg"
            >
              {CTA_CONTENT.supporting}
            </p>
            <div
              data-reveal
              className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:items-center"
            >
              <Button href={CTA_CONTENT.primaryCta.href} variant="primary">
                {CTA_CONTENT.primaryCta.label}
              </Button>
              <Button href={CTA_CONTENT.secondaryCta.href} variant="secondary">
                {CTA_CONTENT.secondaryCta.label}
              </Button>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
