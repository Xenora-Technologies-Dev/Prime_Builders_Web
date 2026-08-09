"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PORTFOLIO_CONTENT } from "@/lib/constants";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function CategoryIcon({ type }: { type: "tower" | "interior" | "bridge" }) {
  if (type === "tower") {
    return (
      <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden>
        <rect x="26" y="8" width="12" height="40" fill="#062B5C" />
        <rect x="28" y="4" width="8" height="4" fill="#C6922E" />
        <rect x="16" y="28" width="10" height="20" fill="#0a3a72" opacity="0.8" />
        <rect x="40" y="32" width="8" height="16" fill="#0a3a72" opacity="0.7" />
        <line x1="12" y1="50" x2="52" y2="50" stroke="#C6922E" strokeWidth="1" />
      </svg>
    );
  }
  if (type === "interior") {
    return (
      <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden>
        <rect x="10" y="16" width="44" height="32" fill="none" stroke="#062B5C" strokeWidth="1.5" />
        <line x1="10" y1="30" x2="54" y2="30" stroke="#C6922E" strokeWidth="1" />
        <rect x="16" y="34" width="14" height="10" fill="#0a3a72" opacity="0.35" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden>
      <path d="M6 44 L22 28 L42 28 L58 44" fill="none" stroke="#062B5C" strokeWidth="1.5" />
      <path d="M6 44 L22 30 L42 30 L58 44" fill="none" stroke="#C6922E" strokeWidth="1" />
      <line x1="32" y1="30" x2="32" y2="52" stroke="#A9ADB3" strokeWidth="1.5" />
    </svg>
  );
}

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !visualRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: visualRef.current,
          start: "top 70%",
          end: "bottom 40%",
          scrub: 1,
        },
      });

      tl.fromTo(
        "[data-cs-line]",
        { strokeDashoffset: 320, opacity: 0.2 },
        { strokeDashoffset: 0, opacity: 1, stagger: 0.05, duration: 1 },
      )
        .fromTo(
          "[data-cs-rise]",
          { scaleY: 0, opacity: 0 },
          {
            scaleY: 1,
            opacity: 1,
            transformOrigin: "bottom center",
            stagger: 0.08,
            duration: 0.8,
          },
          "-=0.4",
        )
        .fromTo(
          "[data-cs-plate]",
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            transformOrigin: "center",
            stagger: 0.06,
            duration: 0.6,
          },
          "-=0.3",
        )
        .fromTo(
          "[data-cs-gold]",
          { opacity: 0 },
          { opacity: 1, duration: 0.7 },
        )
        .fromTo(
          "[data-cs-title]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2",
        )
        .fromTo(
          "[data-cs-sweep]",
          { x: -80, opacity: 0 },
          { x: 80, opacity: 0.8, duration: 1.2 },
        );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden bg-warm-white section-pad"
      aria-labelledby="portfolio-heading"
    >
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <div className="container-site relative">
        <SectionReveal>
          <div className="mb-12 max-w-2xl">
            <p data-reveal className="eyebrow text-gold-600">
              Our Portfolio
            </p>
            <p
              data-reveal
              className="mt-4 text-[11px] font-medium uppercase tracking-[0.28em] text-navy-800/50"
            >
              {PORTFOLIO_CONTENT.label}
            </p>
            <h2
              id="portfolio-heading"
              data-reveal
              className="mt-4 font-display text-[clamp(2.2rem,5vw,3.75rem)] text-navy-900"
            >
              <span className="block">{PORTFOLIO_CONTENT.heading[0]}</span>
              <span className="block text-gold-600">
                {PORTFOLIO_CONTENT.heading[1]}
              </span>
            </h2>
            <p
              data-reveal
              className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg"
            >
              {PORTFOLIO_CONTENT.supporting}
            </p>
          </div>
        </SectionReveal>

        {/* Coming Soon architectural visual */}
        <div
          ref={visualRef}
          className="relative mx-auto mt-4 aspect-[16/10] w-full max-w-4xl overflow-hidden border border-navy-800/10 bg-navy-900"
          data-cursor="EXPLORE"
        >
          <div className="architectural-grid absolute inset-0 opacity-25" aria-hidden />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 50% 60% at 50% 45%, rgba(198,146,46,0.12) 0%, transparent 65%)",
            }}
            aria-hidden
          />

          <svg
            viewBox="0 0 640 400"
            className="absolute inset-0 h-full w-full"
            fill="none"
            aria-hidden
          >
            {/* Blueprint / wireframe lines */}
            <g data-cs-line stroke="#A9ADB3" strokeWidth="1" strokeDasharray="320">
              <rect x="250" y="60" width="140" height="240" />
              <rect x="170" y="140" width="70" height="160" />
              <rect x="400" y="160" width="80" height="140" />
              <line x1="120" y1="300" x2="520" y2="300" />
              <path d="M140 280 L250 200 L390 200 L500 280" />
            </g>

            {/* Rising verticals */}
            <g data-cs-rise>
              <rect x="270" y="80" width="8" height="200" fill="#1b5ca3" opacity="0.55" />
              <rect x="310" y="70" width="10" height="210" fill="#0a3a72" opacity="0.7" />
              <rect x="355" y="90" width="8" height="190" fill="#1b5ca3" opacity="0.5" />
              <rect x="190" y="160" width="8" height="120" fill="#0a3a72" opacity="0.55" />
              <rect x="430" y="180" width="8" height="100" fill="#0a3a72" opacity="0.55" />
            </g>

            {/* Floor plates */}
            <g data-cs-plate stroke="#D9B45A" strokeWidth="1.2">
              <line x1="250" y1="120" x2="390" y2="120" />
              <line x1="250" y1="170" x2="390" y2="170" />
              <line x1="250" y1="220" x2="390" y2="220" />
              <line x1="250" y1="270" x2="390" y2="270" />
            </g>

            {/* Gold structural accents */}
            <g data-cs-gold>
              <rect x="305" y="48" width="30" height="10" fill="#C6922E" />
              <path
                d="M140 278 L250 198 L390 198 L500 278"
                stroke="#C6922E"
                strokeWidth="2"
              />
              <line x1="320" y1="48" x2="320" y2="38" stroke="#D9B45A" strokeWidth="2" />
            </g>

            {/* Light sweep */}
            <rect
              data-cs-sweep
              x="200"
              y="60"
              width="40"
              height="240"
              fill="url(#goldSweep)"
              opacity="0"
            />
            <defs>
              <linearGradient id="goldSweep" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#C6922E" stopOpacity="0" />
                <stop offset="50%" stopColor="#D9B45A" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#C6922E" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          <div
            data-cs-title
            className="absolute inset-0 flex flex-col items-center justify-center text-center"
          >
            <p className="font-display text-[clamp(2.5rem,8vw,5rem)] leading-none text-warm-white">
              <span className="block">Coming</span>
              <span className="block text-gold-400">Soon</span>
            </p>
            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.32em] text-steel">
              {PORTFOLIO_CONTENT.comingSoonLabel}
            </p>
          </div>
        </div>

        {/* Category placeholders */}
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {PORTFOLIO_CONTENT.categories.map((category) => (
            <article
              key={category.id}
              className="border border-navy-800/10 bg-warm-white/80 p-6 transition-colors duration-300 hover:border-gold-500/40"
            >
              <CategoryIcon type={category.visual} />
              <h3 className="mt-5 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-navy-900">
                {category.title}
              </h3>
              <div className="mt-3 h-px w-8 bg-gold-500" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
