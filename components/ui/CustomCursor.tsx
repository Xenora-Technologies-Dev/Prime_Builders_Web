"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useIsDesktop, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Subtle branded cursor label for desktop interactions.
 */
export function CustomCursor() {
  const isDesktop = useIsDesktop();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 400, damping: 35 });
  const springY = useSpring(y, { stiffness: 400, damping: 35 });

  useEffect(() => {
    if (!isDesktop || prefersReducedMotion) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.(
        "[data-cursor]",
      ) as HTMLElement | null;
      if (target?.dataset.cursor) {
        setLabel(target.dataset.cursor);
        setVisible(true);
      } else {
        setVisible(false);
        setLabel(null);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [isDesktop, prefersReducedMotion, x, y]);

  if (!isDesktop || prefersReducedMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden mix-blend-difference md:block"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
    >
      <div
        className={[
          "flex h-16 w-16 items-center justify-center rounded-full border border-gold-500/50 bg-navy-950/40 text-[9px] font-semibold uppercase tracking-[0.2em] text-gold-400 backdrop-blur-sm transition-opacity duration-200",
          visible ? "opacity-100 scale-100" : "opacity-0 scale-75",
        ].join(" ")}
      >
        {label}
      </div>
    </motion.div>
  );
}
