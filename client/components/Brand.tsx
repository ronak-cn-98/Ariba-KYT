import { getAssetPath } from "@/lib/getAssetPath";

interface LogoProps {
  className?: string;
}

export function CloudNexusLogo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <img
      src={getAssetPath("/assets/cloudnexus-logo.png")}
      alt="CloudNexus logo"
      className={className}
    />
  );
}

export function AribaLogo({ className = "h-8 w-auto" }: LogoProps) {
  return (
    <svg viewBox="0 0 240 56" className={className} fill="none" aria-label="Ariba logo">
      <path
        d="M15 44L37 14L59 44"
        stroke="#8d929a"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 38L37 27L50 38"
        stroke="#8d929a"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 44L25 29L43 44"
        stroke="#8d929a"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <path
        d="M32 44L50 29L68 44"
        stroke="#8d929a"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <text
        x="86"
        y="38"
        fill="#f3f4f6"
        fontSize="27"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="300"
        letterSpacing="0.34em"
      >
        ARIBA
      </text>
      <text
        x="220"
        y="22"
        fill="#f3f4f6"
        fontSize="9"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="500"
      >
        ®
      </text>
    </svg>
  );
}

export function BrandLockup() {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 shadow-[0_0_24px_rgba(34,211,238,0.12)]">
        <CloudNexusLogo className="h-7 w-7" />
      </div>
      <div className="hidden sm:block h-7 w-px bg-white/10" />
      <div className="flex min-w-0 items-center gap-2">
        <AribaLogo className="h-6 w-auto max-w-[120px]" />
        <span
          className="hidden sm:inline-flex items-center rounded-md border border-cyan-400/20 bg-cyan-400/10 px-1.5 py-0.5 text-[10px] font-medium font-mono text-cyan-400"
        >
          DevOps
        </span>
      </div>
    </div>
  );
}
