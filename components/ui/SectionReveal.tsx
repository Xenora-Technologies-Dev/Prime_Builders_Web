"use client";

import { useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { gsap, useGSAP, MOTION } from "@/lib/motion";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionReveal({ children, className = "" }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (!ref.current) return;
      const targets = ref.current.querySelectorAll("[data-reveal]");
      if (!targets.length) return;

      if (prefersReducedMotion) {
        gsap.set(targets, { clearProps: "all", opacity: 1, y: 0 });
        return;
      }

      // Keep content readable if ScrollTrigger is late: start slightly visible
      gsap.set(targets, { opacity: 0.001, y: 16 });

      gsap.to(targets, {
        y: 0,
        opacity: 1,
        duration: MOTION.revealDuration,
        stagger: MOTION.revealStagger,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "play none none none",
          once: true,
        },
        // Failsafe: if never triggered within a beat, still show content
        onStart: undefined,
      });

      // Failsafe reveal so sections never stay “stuck” invisible
      const failsafe = window.setTimeout(() => {
        targets.forEach((el) => {
          const style = window.getComputedStyle(el);
          if (Number.parseFloat(style.opacity) < 0.2) {
            gsap.to(el, { opacity: 1, y: 0, duration: 0.35, overwrite: "auto" });
          }
        });
      }, 1800);

      return () => window.clearTimeout(failsafe);
    },
    { scope: ref, dependencies: [prefersReducedMotion], revertOnUpdate: true },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
