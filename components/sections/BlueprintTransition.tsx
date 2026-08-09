"use client";

import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ConstructionFallback } from "@/components/3d/ConstructionFallback";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ConstructionCanvas = dynamic(
  () =>
    import("@/components/3d/ConstructionCanvas").then(
      (m) => m.ConstructionCanvas,
    ),
  { ssr: false, loading: () => <ConstructionFallback progress={0.35} /> },
);

const STAGES = [
  {
    number: "01",
    title: "Foundation",
    description: "Groundwork and structural base.",
    at: 0,
  },
  {
    number: "02",
    title: "Structure",
    description: "Core columns and framework rise.",
    at: 0.14,
  },
  {
    number: "03",
    title: "Floors",
    description: "Levels stack from bottom to top.",
    at: 0.3,
  },
  {
    number: "04",
    title: "Finishing",
    description: "Facade, form and architectural detail.",
    at: 0.68,
  },
  {
    number: "05",
    title: "Handover",
    description: "A finished building, ready for purpose.",
    at: 0.86,
  },
] as const;

export function BlueprintTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      if (prefersReducedMotion) {
        setProgress(1);
        return;
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=240%",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });

      gsap.fromTo(
        "[data-bp-copy]",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] },
  );

  const use3D = mounted && !isMobile && !prefersReducedMotion;

  const activeIndex = (() => {
    let idx = 0;
    STAGES.forEach((stage, i) => {
      if (progress >= stage.at) idx = i;
    });
    return idx;
  })();

  return (
    <section
      ref={sectionRef}
      id="blueprint"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-warm-white"
      aria-labelledby="blueprint-heading"
    >
      <div className="blueprint-grid absolute inset-0 opacity-45" aria-hidden />

      <div className="container-site relative grid items-center gap-10 py-14 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <div>
          <p data-bp-copy className="eyebrow text-gold-600">
            Architectural Process
          </p>
          <h2
            id="blueprint-heading"
            data-bp-copy
            className="mt-4 font-display text-[clamp(2.15rem,4.8vw,3.85rem)] leading-[1.05] text-navy-900"
          >
            <span className="block">Blueprint</span>
            <span className="block text-gold-600">to Structure</span>
            <span className="block">to Finished Space.</span>
          </h2>
          <p
            data-bp-copy
            className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-muted md:text-lg"
          >
            Scroll to watch a building rise from the ground up — foundation,
            structure, floors, finishing and handover.
          </p>

          <ol data-bp-copy className="mt-10 space-y-0 border-l border-navy-800/10">
            {STAGES.map((stage, index) => {
              const active = index === activeIndex;
              const done = index < activeIndex;
              return (
                <li
                  key={stage.number}
                  className={[
                    "relative border-b border-navy-800/10 py-4 pl-6 transition-colors duration-300 last:border-b-0",
                    active ? "bg-warm-grey/40" : "",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "absolute left-[-5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 transition-colors duration-300",
                      active
                        ? "border-gold-500 bg-gold-500"
                        : done
                          ? "border-gold-500/70 bg-gold-500/40"
                          : "border-navy-800/25 bg-warm-white",
                    ].join(" ")}
                    aria-hidden
                  />
                  <div className="flex items-baseline gap-3">
                    <span
                      className={[
                        "font-display text-2xl md:text-3xl",
                        active ? "text-gold-600" : "text-navy-800/30",
                      ].join(" ")}
                    >
                      {stage.number}
                    </span>
                    <div>
                      <h3
                        className={[
                          "font-sans text-sm font-semibold uppercase tracking-[0.18em] md:text-[0.95rem] md:tracking-[0.2em]",
                          active ? "text-navy-900" : "text-navy-800/55",
                        ].join(" ")}
                      >
                        {stage.title}
                      </h3>
                      <p
                        className={[
                          "mt-1 text-sm leading-relaxed md:text-[0.95rem]",
                          active ? "text-muted" : "text-navy-800/40",
                        ].join(" ")}
                      >
                        {stage.description}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div data-bp-copy className="mt-6 h-[2px] w-full max-w-sm overflow-hidden bg-navy-800/10">
            <div
              className="h-full bg-gold-500 transition-[width] duration-150"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </div>

        <div className="relative mx-auto aspect-[5/6] w-full max-w-xl overflow-hidden border border-navy-800/10 bg-gradient-to-b from-warm-white to-warm-grey/80 shadow-[0_24px_60px_rgba(4,26,53,0.08)] sm:aspect-square">
          {use3D ? (
            <ConstructionCanvas
              progress={progress}
              reducedMotion={prefersReducedMotion}
            />
          ) : (
            <ConstructionFallback
              progress={progress || (prefersReducedMotion ? 1 : 0.4)}
            />
          )}
        </div>
      </div>
    </section>
  );
}
