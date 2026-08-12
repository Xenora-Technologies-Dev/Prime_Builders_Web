type ProjectIconName = "school" | "house" | "supermarket";

interface ProjectIconProps {
  name: ProjectIconName;
  className?: string;
}

function SchoolIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M8 28 L32 14 L56 28"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M32 14 V8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M32 8 H40" stroke="currentColor" strokeWidth="1.6" />
      <path d="M40 8 L40 12 L36 10 Z" fill="currentColor" />
      <rect x="14" y="28" width="36" height="24" stroke="currentColor" strokeWidth="1.6" />
      <path d="M26 52 V40 H38 V52" stroke="currentColor" strokeWidth="1.6" />
      <rect x="18" y="34" width="6" height="6" stroke="currentColor" strokeWidth="1.4" />
      <rect x="40" y="34" width="6" height="6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 52 H54" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function HouseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M10 30 L32 12 L54 30"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M18 32 V52 H46 V32" stroke="currentColor" strokeWidth="1.6" />
      <path d="M28 52 V40 H36 V52" stroke="currentColor" strokeWidth="1.6" />
      <rect x="24" y="22" width="6" height="6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 52 H56" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function SupermarketIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M14 22 H50 L47 40 H17 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M20 22 V16 H28" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="22" cy="48" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="42" cy="48" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M18 40 V45" stroke="currentColor" strokeWidth="1.6" />
      <path d="M46 40 V45" stroke="currentColor" strokeWidth="1.6" />
      <path d="M24 28 H40" stroke="currentColor" strokeWidth="1.4" />
      <path d="M22 34 H38" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

const ICONS: Record<ProjectIconName, typeof SchoolIcon> = {
  school: SchoolIcon,
  house: HouseIcon,
  supermarket: SupermarketIcon,
};

export function ProjectIcon({ name, className = "h-16 w-16" }: ProjectIconProps) {
  const Icon = ICONS[name];
  return <Icon className={className} />;
}

interface ProjectIconFrameProps {
  name: ProjectIconName;
  label: string;
}

export function ProjectIconFrame({ name, label }: ProjectIconFrameProps) {
  return (
    <div
      className="relative overflow-hidden bg-navy-950 ring-1 ring-gold-500/25"
      role="img"
      aria-label={label}
    >
      <span className="pointer-events-none absolute inset-0 z-10 border border-gold-500/35" />
      <span className="pointer-events-none absolute inset-[7px] z-10 border border-warm-white/15" />
      <span className="pointer-events-none absolute left-3 top-3 z-10 h-3 w-3 border-l border-t border-gold-500" />
      <span className="pointer-events-none absolute right-3 top-3 z-10 h-3 w-3 border-r border-t border-gold-500" />
      <span className="pointer-events-none absolute bottom-3 left-3 z-10 h-3 w-3 border-b border-l border-gold-500" />
      <span className="pointer-events-none absolute bottom-3 right-3 z-10 h-3 w-3 border-b border-r border-gold-500" />

      <div className="relative flex aspect-[16/11] items-center justify-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 55% 50% at 50% 45%, rgba(198,146,46,0.22) 0%, transparent 70%)",
          }}
        />
        <ProjectIcon
          name={name}
          className="relative h-16 w-16 text-gold-400 sm:h-[4.5rem] sm:w-[4.5rem]"
        />
      </div>
    </div>
  );
}
