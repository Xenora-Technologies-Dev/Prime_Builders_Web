"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS } from "@/lib/constants";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 isolate",
        "transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-b border-gold-500/25 bg-[rgba(4,26,53,0.92)] backdrop-blur-xl"
          : "border-b border-transparent bg-navy-950/55 backdrop-blur-sm md:bg-navy-950/25 md:backdrop-blur-[2px]",
      ].join(" ")}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-navy-950"
      >
        Skip to content
      </a>

      <div className="h-[var(--spacing-nav)] overflow-hidden">
        <nav
          className="container-site grid h-full grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-4 lg:gap-6"
          aria-label="Primary"
        >
          {/* Logo — visible after scroll; hero carries the large opening mark */}
          <div
            className={[
              "flex h-full min-w-0 items-center py-2.5 transition-all duration-500",
              scrolled || open
                ? "translate-y-0 opacity-100"
                : "pointer-events-none -translate-y-1 opacity-0",
            ].join(" ")}
          >
            <Logo priority variant="header" />
          </div>

          {/* Center nav — desktop only */}
          <ul className="hidden min-w-0 items-center justify-center gap-6 xl:gap-9 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href} className="shrink-0">
                  <a
                    href={link.href}
                    className={[
                      "eyebrow relative whitespace-nowrap py-1 transition-colors duration-300",
                      isActive
                        ? "text-gold-400"
                        : "text-warm-white/70 hover:text-gold-400",
                    ].join(" ")}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {link.label}
                    <span
                      className={[
                        "absolute inset-x-0 -bottom-1 mx-auto h-px w-full origin-center bg-gold-500 transition-transform duration-300",
                        isActive ? "scale-x-100" : "scale-x-0",
                      ].join(" ")}
                      aria-hidden
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div className="flex items-center justify-end gap-2">
            <div className="hidden lg:block">
              <Button
                href="#contact"
                variant="secondary"
                className="whitespace-nowrap px-5 py-2.5"
                dataCursor="BUILD"
              >
                Start a Conversation
              </Button>
            </div>

            <button
              type="button"
              className="relative z-50 flex h-10 w-10 shrink-0 items-center justify-center lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((prev) => !prev)}
            >
              <span className="sr-only">Menu</span>
              <span className="flex w-5 flex-col gap-1.5">
                <motion.span
                  className="block h-px w-full bg-warm-white"
                  animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  className="block h-px w-full bg-warm-white"
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-px w-full bg-warm-white"
                  animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </span>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-0 top-[var(--spacing-nav)] z-40 overflow-y-auto bg-navy-900/98 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex min-h-full flex-col justify-center gap-2 px-8 pb-24">
              {NAV_LINKS.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <a
                    href={link.href}
                    className="block py-3 font-display text-4xl text-warm-white transition-colors hover:text-gold-400"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-8"
              >
                <Button
                  href="#contact"
                  variant="primary"
                  onClick={() => setOpen(false)}
                >
                  Start a Conversation
                </Button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
