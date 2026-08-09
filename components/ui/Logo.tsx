import Image from "next/image";
import Link from "next/link";
import { COMPANY } from "@/lib/constants";

interface LogoProps {
  className?: string;
  priority?: boolean;
  variant?: "header" | "footer" | "hero";
}

/**
 * Official Prime Plus logo — artwork unchanged.
 * - hero: large opening lockup
 * - header: compact nav lockup
 * - footer: mid-size lockup
 */
export function Logo({
  className = "",
  priority = false,
  variant = "header",
}: LogoProps) {
  const configs = {
    hero: {
      sizes: "(max-width: 640px) 168px, (max-width: 1024px) 210px, 240px",
      imageClass:
        "block h-auto w-[168px] object-contain sm:w-[200px] md:w-[220px] lg:w-[240px]",
      shellClass: "bg-warm-white p-2 sm:p-2.5 ring-1 ring-gold-500/20",
    },
    header: {
      sizes: "(max-width: 640px) 80px, (max-width: 1024px) 96px, 110px",
      imageClass:
        "block h-[48px] w-auto object-contain sm:h-[54px] md:h-[58px] lg:h-[62px]",
      shellClass:
        "bg-warm-white/95 p-1 ring-1 ring-gold-500/20 hover:ring-gold-500/40",
    },
    footer: {
      sizes: "(max-width: 768px) 140px, 152px",
      imageClass:
        "h-auto w-[120px] object-contain sm:w-[140px] md:w-[152px]",
      shellClass: "bg-warm-white p-1.5 ring-1 ring-gold-500/15",
    },
  } as const;

  const config = configs[variant];

  return (
    <Link
      href="/"
      className={[
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden",
        "transition-[box-shadow,ring-color,opacity] duration-300",
        config.shellClass,
        className,
      ].join(" ")}
      aria-label={`${COMPANY.shortName} — Home`}
    >
      <Image
        src="/images/logo.png"
        alt={`${COMPANY.legalName} logo`}
        width={927}
        height={840}
        priority={priority}
        sizes={config.sizes}
        className={config.imageClass}
      />
    </Link>
  );
}
