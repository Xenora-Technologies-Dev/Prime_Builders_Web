"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Shared timing — snappy enough to avoid “waiting for animation” feel */
export const MOTION = {
  heroDuration: 0.55,
  heroStagger: 0.05,
  revealDuration: 0.55,
  revealStagger: 0.06,
} as const;

export function refreshScrollTriggerSoon() {
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}

export { gsap, ScrollTrigger, useGSAP };
