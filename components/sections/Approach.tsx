"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { APPROACH_STEPS } from "@/lib/constants";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Approach() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;

      gsap.fromTo(
        "[data-approach-step]",
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        "[data-approach-line]",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      id="approach"
      className="relative overflow-hidden bg-warm-white section-pad"
      aria-labelledby="approach-heading"
    >
      <div className="container-site">
        <SectionReveal>
          <div className="mb-14 max-w-2xl">
            <p data-reveal className="eyebrow text-gold-600">
              Our Approach
            </p>
            <h2
              id="approach-heading"
              data-reveal
              className="mt-4 font-display text-[clamp(2rem,4.8vw,3.75rem)] text-navy-900"
            >
              <span className="block">From Vision</span>
              <span className="block text-gold-600">to Reality.</span>
            </h2>
          </div>
        </SectionReveal>

        <ol className="relative grid gap-0 md:grid-cols-4">
          <div
            data-approach-line
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px origin-left bg-gradient-to-r from-transparent via-gold-500 to-transparent md:block"
            aria-hidden
          />
          {APPROACH_STEPS.map((step) => (
            <li
              key={step.number}
              data-approach-step
              className="relative border-t border-navy-800/10 py-8 md:border-t-0 md:px-5 md:py-0"
            >
              <div className="mb-6 flex h-4 w-4 items-center justify-center rounded-full border border-gold-500 bg-warm-white">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
              </div>
              <p className="font-display text-3xl text-gold-500">{step.number}</p>
              <h3 className="mt-3 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-navy-900">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
