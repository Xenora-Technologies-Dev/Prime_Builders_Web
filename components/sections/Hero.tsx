"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HERO_CONTENT } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { HeroVisualFallback } from "@/components/3d/HeroVisualFallback";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseRef.current.x = nx;
      mouseRef.current.y = -ny;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [isMobile, prefersReducedMotion]);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      if (!prefersReducedMotion) {
        gsap.fromTo(
          textRef.current?.querySelectorAll("[data-hero-reveal]") ?? [],
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.11,
            ease: "power3.out",
            delay: 0.1,
          },
        );

        gsap.to("[data-scroll-line]", {
          scaleX: 1.4,
          transformOrigin: "left center",
          duration: 1.7,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // Subtle text parallax vs scroll / mouse
      if (!isMobile && !prefersReducedMotion && textRef.current) {
        gsap.to(textRef.current, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=120%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          setScrollProgress(self.progress);

          // Fade text slightly as we dive into the architecture
          if (textRef.current && !prefersReducedMotion) {
            gsap.set(textRef.current, {
              opacity: 1 - self.progress * 0.55,
              x: -self.progress * 24,
            });
          }
        },
      });
    },
    {
      scope: sectionRef,
      dependencies: [prefersReducedMotion, isMobile],
    },
  );

  const use3D = mounted && !isMobile && !prefersReducedMotion;

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] overflow-hidden bg-navy-950"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 md:left-[38%] md:right-0">
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
        className="pointer-events-none absolute inset-0 hero-scrim-mobile md:hero-scrim"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[50%] bg-gradient-to-r from-navy-950 via-navy-950/88 to-transparent md:block"
        aria-hidden
      />

      <div
        ref={textRef}
        className="relative z-10 container-site flex w-full flex-col justify-end pb-14 pt-[calc(var(--spacing-nav)+2.25rem)] md:justify-center md:pb-20 md:pt-[calc(var(--spacing-nav)+2.5rem)]"
        style={
          !isMobile
            ? {
                transform: `translate3d(${mouseRef.current.x * -6}px, ${mouseRef.current.y * -4}px, 0)`,
              }
            : undefined
        }
      >
        <div className="max-w-xl lg:max-w-2xl">
          <p data-hero-reveal className="eyebrow mb-4 text-gold-400">
            {HERO_CONTENT.brandLabel}
          </p>

          <p
            data-hero-reveal
            className="mb-6 text-[11px] font-medium uppercase tracking-[0.28em] text-steel"
          >
            {HERO_CONTENT.categoryLabel}
          </p>

          <h1
            id="hero-heading"
            className="font-display text-[clamp(2.6rem,7.2vw,5.75rem)] leading-[0.95] text-warm-white"
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
            className="mt-7 max-w-md text-base leading-relaxed text-warm-white/70 md:text-lg"
          >
            {HERO_CONTENT.supporting}
          </p>

          <div
            data-hero-reveal
            className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:items-center"
          >
            <Button
              href={HERO_CONTENT.primaryCta.href}
              variant="primary"
              dataCursor="EXPLORE"
            >
              {HERO_CONTENT.primaryCta.label}
            </Button>
            <Button
              href={HERO_CONTENT.secondaryCta.href}
              variant="secondary"
              dataCursor="BUILD"
            >
              {HERO_CONTENT.secondaryCta.label}
            </Button>
          </div>

          <div
            data-hero-reveal
            className="mt-14 hidden items-center gap-4 md:flex"
            aria-hidden
          >
            <span
              data-scroll-line
              className="h-px w-10 origin-left bg-gold-500/80"
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
