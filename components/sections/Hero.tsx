"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { HERO_CONTENT } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { HeroVisualFallback } from "@/components/3d/HeroVisualFallback";
import { useIsDesktop, usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { gsap, ScrollTrigger, useGSAP, MOTION } from "@/lib/motion";

const HeroCanvas = dynamic(
  () => import("@/components/3d/HeroCanvas").then((mod) => mod.HeroCanvas),
  {
    ssr: false,
    loading: () => <HeroVisualFallback />,
  },
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const isDesktop = useIsDesktop();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Warm the 3D chunk on desktop so the hero doesn't wait on first interaction
  useEffect(() => {
    if (!isDesktop || prefersReducedMotion) return;
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(() => {
          void import("@/components/3d/HeroCanvas");
        })
      : window.setTimeout(() => {
          void import("@/components/3d/HeroCanvas");
        }, 200);
    return () => {
      if (typeof idle === "number") window.clearTimeout(idle);
      else window.cancelIdleCallback?.(idle);
    };
  }, [isDesktop, prefersReducedMotion]);

  useEffect(() => {
    if (!isDesktop || prefersReducedMotion) return;

    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isDesktop, prefersReducedMotion]);

  useGSAP(
    () => {
      if (!sectionRef.current || !textRef.current) return;

      const reveals = textRef.current.querySelectorAll("[data-hero-reveal]");

      if (prefersReducedMotion) {
        gsap.set(reveals, { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      // Fast entrance — content becomes readable almost immediately
      gsap.fromTo(
        reveals,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: MOTION.heroDuration,
          stagger: MOTION.heroStagger,
          ease: "power2.out",
          delay: 0.02,
        },
      );

      const scrollLine = textRef.current.querySelector("[data-scroll-line]");
      if (scrollLine) {
        gsap.to(scrollLine, {
          scaleX: 1.35,
          transformOrigin: "left center",
          duration: 1.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // Desktop only: cinematic pin + 3D scroll coupling
      if (isDesktop) {
        gsap.to(textRef.current, {
          y: -36,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "+=110%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            progressRef.current = self.progress;
            setScrollProgress(self.progress);
            if (textRef.current) {
              gsap.set(textRef.current, {
                opacity: 1 - self.progress * 0.5,
                x: -self.progress * 20,
              });
            }
          },
        });
      }
    },
    {
      scope: sectionRef,
      dependencies: [prefersReducedMotion, isDesktop],
      revertOnUpdate: true,
    },
  );

  const use3D = mounted && isDesktop && !prefersReducedMotion;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-navy-950 lg:block"
      aria-labelledby="hero-heading"
    >
      {/* Visual: full-bleed on mobile (behind/above fold), right rail on desktop */}
      <div className="pointer-events-none absolute inset-0 lg:left-[38%] lg:right-0">
        {use3D ? (
          <HeroCanvas
            reducedMotion={prefersReducedMotion}
            scrollProgress={scrollProgress}
            mouse={mouseRef}
          />
        ) : (
          <HeroVisualFallback />
        )}
      </div>

      <div
        className="pointer-events-none absolute inset-0 hero-scrim-mobile lg:hero-scrim"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[50%] bg-gradient-to-r from-navy-950 via-navy-950/88 to-transparent lg:block"
        aria-hidden
      />

      <div
        ref={textRef}
        className="relative z-10 container-site flex w-full flex-1 flex-col justify-end pb-12 pt-[calc(var(--spacing-nav)+1.25rem)] sm:pb-14 lg:justify-center lg:pb-20 lg:pt-[calc(var(--spacing-nav)+2.5rem)]"
      >
        <div className="max-w-xl lg:max-w-2xl">
          <p
            data-hero-reveal
            className="eyebrow mb-3 text-gold-400 sm:mb-4"
          >
            {HERO_CONTENT.brandLabel}
          </p>

          <p
            data-hero-reveal
            className="mb-5 text-[10px] font-medium uppercase tracking-[0.24em] text-steel sm:mb-6 sm:text-[11px] sm:tracking-[0.28em]"
          >
            {HERO_CONTENT.categoryLabel}
          </p>

          <h1
            id="hero-heading"
            className="font-display text-[clamp(2.35rem,9vw,5.75rem)] leading-[0.95] text-warm-white"
          >
            <span data-hero-reveal className="block">
              {HERO_CONTENT.headline[0]}
            </span>
            <span data-hero-reveal className="block">
              {HERO_CONTENT.headline[1]}
            </span>
            <span data-hero-reveal className="mt-1 block text-gold-400">
              {HERO_CONTENT.headline[2]}
            </span>
          </h1>

          <p
            data-hero-reveal
            className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-warm-white/70 sm:mt-7 sm:text-base md:text-lg"
          >
            {HERO_CONTENT.supporting}
          </p>

          <div
            data-hero-reveal
            className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-3.5"
          >
            <Button
              href={HERO_CONTENT.primaryCta.href}
              variant="primary"
              className="w-full sm:w-auto"
              dataCursor="EXPLORE"
            >
              {HERO_CONTENT.primaryCta.label}
            </Button>
            <Button
              href={HERO_CONTENT.secondaryCta.href}
              variant="secondary"
              className="w-full sm:w-auto"
              dataCursor="BUILD"
            >
              {HERO_CONTENT.secondaryCta.label}
            </Button>
          </div>

          <div
            data-hero-reveal
            className="mt-10 flex items-center gap-4 lg:mt-14"
            aria-hidden
          >
            <span
              data-scroll-line
              className="h-px w-8 origin-left bg-gold-500/80 sm:w-10"
            />
            <span className="text-[10px] uppercase tracking-[0.28em] text-steel">
              Scroll to explore
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
