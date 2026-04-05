"use client";

export function CaduceusLogo({ size = 32, className = "" }: { size?: number; className?: string }) {
  const h = size;
  const w = Math.round(size * 0.75);
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 24 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`glow-pulse ${className}`}
    >
      <defs>
        <linearGradient id="cad-gold" x1="4" y1="0" x2="20" y2="32">
          <stop stopColor="#F5D060" />
          <stop offset="1" stopColor="#D4A017" />
        </linearGradient>
      </defs>
      {/* Staff */}
      <line x1="12" y1="8" x2="12" y2="30" stroke="url(#cad-gold)" strokeWidth="1.8" strokeLinecap="round" />
      {/* Wings */}
      <path d="M12 8 Q8 4 2 3 Q6 6 8.5 8Z" fill="url(#cad-gold)" opacity="0.85" />
      <path d="M12 8 Q16 4 22 3 Q18 6 15.5 8Z" fill="url(#cad-gold)" opacity="0.85" />
      {/* Left snake */}
      <path d="M12 26 Q6 23 8 19 Q10 15 6 13 Q3 11 6 9 Q9 7 12 8" stroke="url(#cad-gold)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* Right snake */}
      <path d="M12 26 Q18 23 16 19 Q14 15 18 13 Q21 11 18 9 Q15 7 12 8" stroke="url(#cad-gold)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* Orb */}
      <circle cx="12" cy="5.5" r="2.5" fill="url(#cad-gold)" opacity="0.9" />
    </svg>
  );
}
