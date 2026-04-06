"use client";

export function CaduceusLogo({ size = 32, className = "" }: { size?: number; className?: string }) {
  const h = size;
  const w = Math.round(size * 0.875);
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 56 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`glow-pulse ${className}`}
    >
      <defs>
        <linearGradient id="cad-gold" x1="12" y1="0" x2="44" y2="64">
          <stop stopColor="#F5D060" />
          <stop offset="1" stopColor="#D4A017" />
        </linearGradient>
      </defs>

      {/* Central staff */}
      <line x1="28" y1="14" x2="28" y2="60" stroke="url(#cad-gold)" strokeWidth="2.5" strokeLinecap="round" />

      {/* Staff base knob */}
      <circle cx="28" cy="61" r="2" fill="url(#cad-gold)" opacity="0.6" />

      {/* Left wing — multi-feather */}
      <path d="M27 14 Q22 8 10 4 Q16 9 20 13Z" fill="url(#cad-gold)" opacity="0.9" />
      <path d="M26 12 Q20 5 6 2 Q14 7 18 11Z" fill="url(#cad-gold)" opacity="0.7" />
      <path d="M25 11 Q18 3 4 1 Q12 6 17 10Z" fill="url(#cad-gold)" opacity="0.45" />

      {/* Right wing — multi-feather */}
      <path d="M29 14 Q34 8 46 4 Q40 9 36 13Z" fill="url(#cad-gold)" opacity="0.9" />
      <path d="M30 12 Q36 5 50 2 Q42 7 38 11Z" fill="url(#cad-gold)" opacity="0.7" />
      <path d="M31 11 Q38 3 52 1 Q44 6 39 10Z" fill="url(#cad-gold)" opacity="0.45" />

      {/* Left snake — sinusoidal crossing the staff at 3 points */}
      <path
        d="M28 55 C20 52, 16 48, 20 44 C24 40, 32 40, 36 36 C40 32, 36 28, 32 26 C28 24, 20 24, 18 20 C16 16, 22 14, 28 14"
        stroke="url(#cad-gold)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Right snake — mirror sinusoidal */}
      <path
        d="M28 55 C36 52, 40 48, 36 44 C32 40, 24 40, 20 36 C16 32, 20 28, 24 26 C28 24, 36 24, 38 20 C40 16, 34 14, 28 14"
        stroke="url(#cad-gold)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />

      {/* Snake heads — small dots at the top where they meet the staff */}
      <circle cx="25" cy="15" r="1.5" fill="url(#cad-gold)" />
      <circle cx="31" cy="15" r="1.5" fill="url(#cad-gold)" />

      {/* Top orb */}
      <circle cx="28" cy="10" r="4" fill="url(#cad-gold)" opacity="0.85" />
      <circle cx="28" cy="10" r="2" fill="#0A0A0A" opacity="0.3" />
    </svg>
  );
}
