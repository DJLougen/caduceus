interface IconProps {
  size?: number;
  className?: string;
}

// ---------------------------------------------------------------------------
// Scoring Dimension Icons
// ---------------------------------------------------------------------------

export function IconThinkingDepth({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Brain outline */}
      <path d="M12 2C9 2 7 4 7 6.5C7 5 5.5 4 4 5s-1 3.5 0 5c-1.5 1-2 3-1 4.5S5 17 6.5 17c0 1.5 1.5 3 3.5 3h4c2 0 3.5-1.5 3.5-3c1.5 0 3.5-.5 4.5-2s.5-3.5-1-4.5c1-1.5 1-3.5 0-5s-2.5-1-4 0C17 4 15 2 12 2z" />
      {/* Neural connections */}
      <path d="M12 6v4" />
      <path d="M10 8h4" />
      <circle cx="9" cy="13" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="16" r="0.5" fill="currentColor" stroke="none" />
      <path d="M9 13l3 3" />
      <path d="M15 13l-3 3" />
    </svg>
  );
}

export function IconSelfCorrection({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Circular arrow looping back */}
      <path d="M9 3l-3 3 3 3" />
      <path d="M6 6h8a5 5 0 0 1 0 10H9" />
      <path d="M13 19l-3-3 3-3" />
    </svg>
  );
}

export function IconVerification({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Clipboard */}
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 3h6v2H9z" />
      {/* Checkmark */}
      <path d="M9 13l2 2 4-4" />
    </svg>
  );
}

export function IconToolDiversity({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Swiss army knife / multi-tool fan */}
      <path d="M12 20V12" />
      <path d="M12 12l-6-8" />
      <path d="M12 12l-2-9" />
      <path d="M12 12l2-9" />
      <path d="M12 12l6-8" />
      {/* Handle */}
      <rect x="10" y="12" width="4" height="8" rx="1" />
    </svg>
  );
}

export function IconErrorRecovery({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Broken chain links being reconnected */}
      <ellipse cx="8" cy="12" rx="4" ry="5" transform="rotate(-30 8 12)" />
      <ellipse cx="16" cy="12" rx="4" ry="5" transform="rotate(30 16 12)" />
      {/* Reconnection spark */}
      <path d="M11 10l2 4" />
      <path d="M13 10l-2 4" />
    </svg>
  );
}

export function IconEfficiency({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Lightning bolt */}
      <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  );
}

export function IconProactiveness({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Eye looking ahead */}
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
      {/* Forward arrow */}
      <path d="M17 6l3-1" />
      <path d="M20 5l-1 3" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Casual Arena Benchmark Icons
// ---------------------------------------------------------------------------

export function IconPixelArt({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Grid canvas */}
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
      {/* Filled pixels */}
      <rect x="3" y="3" width="6" height="6" fill="currentColor" opacity={0.3} />
      <rect x="9" y="9" width="6" height="6" fill="currentColor" opacity={0.3} />
      <rect x="15" y="15" width="6" height="6" fill="currentColor" opacity={0.3} />
    </svg>
  );
}

export function IconReverseEngineer({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Magnifying glass */}
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
      {/* f(x) inside */}
      <text
        x="8"
        y="13"
        fontSize="6"
        fill="currentColor"
        stroke="none"
        fontFamily="monospace"
        fontStyle="italic"
      >
        fx
      </text>
    </svg>
  );
}

export function IconWebDesign({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Browser window */}
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <line x1="2" y1="8" x2="22" y2="8" />
      {/* Browser dots */}
      <circle cx="5.5" cy="5.5" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="8.5" cy="5.5" r="0.75" fill="currentColor" stroke="none" />
      <circle cx="11.5" cy="5.5" r="0.75" fill="currentColor" stroke="none" />
      {/* Layout blocks */}
      <rect x="4" y="10" width="7" height="4" rx="0.5" />
      <rect x="13" y="10" width="7" height="4" rx="0.5" />
      <rect x="4" y="16" width="16" height="3" rx="0.5" />
    </svg>
  );
}

export function IconDataDetective({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Spreadsheet / table */}
      <rect x="2" y="3" width="15" height="15" rx="2" />
      <line x1="2" y1="8" x2="17" y2="8" />
      <line x1="2" y1="13" x2="17" y2="13" />
      <line x1="9" y1="3" x2="9" y2="18" />
      {/* Magnifying glass overlaid */}
      <circle cx="18" cy="18" r="3.5" />
      <path d="M21 21l-1.5-1.5" strokeWidth={2} />
    </svg>
  );
}

export function IconCrossword({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Crossword grid */}
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      {/* Black squares */}
      <rect x="3" y="3" width="6" height="6" fill="currentColor" opacity={0.25} />
      <rect x="15" y="9" width="6" height="6" fill="currentColor" opacity={0.25} />
      <rect x="3" y="15" width="6" height="6" fill="currentColor" opacity={0.25} />
    </svg>
  );
}

export function IconCodeGolf({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Code brackets </> */}
      <path d="M8 7l-5 5 5 5" />
      <path d="M16 7l5 5-5 5" />
      {/* Flag */}
      <line x1="12" y1="3" x2="12" y2="10" />
      <path d="M12 3h4l-1 2 1 2h-4" fill="currentColor" opacity={0.3} />
    </svg>
  );
}

export function IconRegex({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Forward slashes */}
      <path d="M6 4l2 16" />
      <path d="M16 4l2 16" />
      {/* Dot */}
      <circle cx="11" cy="14" r="1" fill="currentColor" stroke="none" />
      {/* Star / asterisk */}
      <path d="M11 6v4" strokeWidth={1.5} />
      <path d="M9 8h4" strokeWidth={1.5} />
      <path d="M9.6 6.6l2.8 2.8" strokeWidth={1.5} />
      <path d="M12.4 6.6l-2.8 2.8" strokeWidth={1.5} />
    </svg>
  );
}

export function IconExplainSimple({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Speech bubble */}
      <path d="M21 12c0 4-4.03 7-9 7a10.5 10.5 0 0 1-3.37-.55L3 20l1.3-3.9C3.48 14.82 3 13.45 3 12c0-4 4.03-7 9-7s9 3 9 7z" />
      {/* Simple text lines */}
      <line x1="8" y1="10" x2="16" y2="10" />
      <line x1="8" y1="13" x2="13" y2="13" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Trace Step Type Icons
// ---------------------------------------------------------------------------

export function IconThought({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Thought cloud */}
      <path d="M17.5 10c0-3.59-2.46-6.5-5.5-6.5S6.5 6.41 6.5 10c0 .34.03.67.08 1A3.5 3.5 0 0 0 4 14.5 3.5 3.5 0 0 0 7.5 18h9a3.5 3.5 0 0 0 3.5-3.5c0-1.48-.92-2.74-2.22-3.25.15-.39.22-.81.22-1.25z" />
      {/* Thought bubbles */}
      <circle cx="8" cy="20" r="1" />
      <circle cx="5" cy="22" r="0.5" />
    </svg>
  );
}

export function IconToolCall({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Terminal window */}
      <rect x="3" y="4" width="18" height="16" rx="2" />
      {/* Prompt */}
      <path d="M7 12l3-3-3-3" />
      {/* Cursor */}
      <line x1="13" y1="15" x2="17" y2="15" />
    </svg>
  );
}

export function IconError({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Circle */}
      <circle cx="12" cy="12" r="9" />
      {/* X */}
      <path d="M15 9l-6 6" />
      <path d="M9 9l6 6" />
    </svg>
  );
}

export function IconRecovery({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Circular retry arrow */}
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}

export function IconVerify({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Circle */}
      <circle cx="12" cy="12" r="9" />
      {/* Checkmark */}
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Misc Icons
// ---------------------------------------------------------------------------

export function IconLock({ size = 20, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Lock body */}
      <rect x="5" y="11" width="14" height="10" rx="2" />
      {/* Shackle */}
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      {/* Keyhole */}
      <circle cx="12" cy="16" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
