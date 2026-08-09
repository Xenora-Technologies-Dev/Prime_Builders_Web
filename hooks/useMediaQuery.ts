"use client";

import { useEffect, useState } from "react";

/**
 * Mobile-first: assume compact viewport until measured.
 * Prevents desktop-only pin/3D from flashing onto phones.
 */
export function useMediaQuery(
  query: string,
  defaultMatches = false,
): boolean {
  const [matches, setMatches] = useState(defaultMatches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setMatches(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)", false);
}

/** True for phones/tablets in portrait-ish widths — default true until known */
export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 1023px)", true);
}

/** True once we are on a definite desktop viewport */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)", false);
}

export function useIsTouch(): boolean {
  return useMediaQuery("(hover: none), (pointer: coarse)", true);
}
