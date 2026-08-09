"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionReveal({ children, className = "" }: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !ref.current) return;

      gsap.fromTo(
        ref.current.querySelectorAll("[data-reveal]"),
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: ref, dependencies: [prefersReducedMotion] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
