"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "secondary-light" | "ghost";

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  disabled?: boolean;
  dataCursor?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gold-500 text-navy-950 hover:bg-gold-400 focus-visible:ring-gold-300",
  secondary:
    "border border-gold-500 text-warm-white hover:bg-gold-500 hover:text-navy-950 focus-visible:ring-gold-400",
  "secondary-light":
    "border border-navy-800/30 text-navy-900 hover:border-gold-500 hover:bg-gold-500 hover:text-navy-950 focus-visible:ring-gold-500",
  ghost:
    "text-warm-white/90 hover:text-gold-400 focus-visible:ring-gold-400",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
  ariaLabel,
  disabled = false,
  dataCursor,
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center gap-2 px-7 py-3.5",
    "rounded-[2px] text-[11px] font-semibold uppercase tracking-[0.22em]",
    "transition-colors duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950",
    "disabled:cursor-not-allowed disabled:opacity-50",
    variants[variant],
    className,
  ].join(" ");

  const content = (
    <motion.span
      className="inline-flex items-center gap-2"
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.985 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
        data-cursor={dataCursor}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      data-cursor={dataCursor}
    >
      {content}
    </button>
  );
}
