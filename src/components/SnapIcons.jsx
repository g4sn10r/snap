export const SnapIcons = {
  Text: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M4 6h16M12 6v14" />
    </svg>
  ),
  Solid: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="1" />
    </svg>
  ),
  Light: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M22 12h-3M5 12H2M19.07 4.93l-2.12 2.12M7.05 16.95l-2.12 2.12M19.07 19.07l-2.12-2.12M7.05 7.05L4.93 4.93" />
    </svg>
  ),
  Shape: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 3l9 18H3z" />
    </svg>
  ),
  Split: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M6 3l12 18M18 3L6 21" />
    </svg>
  ),
  Null: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" aria-hidden="true" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="1" />
    </svg>
  ),
  Camera: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="7" width="14" height="11" rx="1" />
      <path d="M17 10l4-2v8l-4-2" />
    </svg>
  ),
  Adj: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5 4v16M12 4v16M19 4v16" />
      <circle cx="5" cy="9" r="1.6" fill="currentColor" />
      <circle cx="12" cy="15" r="1.6" fill="currentColor" />
      <circle cx="19" cy="11" r="1.6" fill="currentColor" />
    </svg>
  ),
  Dup: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="7" width="12" height="12" rx="1" />
      <path d="M8 7V5a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-2" />
    </svg>
  ),
  Comp: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="4" y="4" width="16" height="4" />
      <rect x="4" y="10" width="16" height="4" />
      <rect x="4" y="16" width="16" height="4" />
    </svg>
  ),
  In: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M6 3v18M9 12h9M14 8l4 4-4 4" />
    </svg>
  ),
  Out: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M18 3v18M15 12H6M10 8l-4 4 4 4" />
    </svg>
  ),
};

export const SnapLogo = ({ size = 48, className = "", fill = "currentColor" }) => (
  <svg
    viewBox="0 0 48 48"
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke={fill}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M24 6 L24 42" strokeWidth={1.5} opacity={0.25} />
    <path d="M24 24 C24 13.7 32.3 5.5 42 5.5 C46.5 5.5 50.5 9.5 50.5 14 C50.5 18.5 46.5 22.5 42 22.5 C37.5 22.5 33.5 18.5 33.5 14 C33.5 9.5 37.5 5.5 42 5.5 C46.5 5.5 50.5 9.5 50.5 14 C50.5 18.5 46.5 22.5 42 22.5 C32.3 22.5 24 14.3 24 24 Z" />
    <circle cx="42" cy="14" r="2.5" fill={fill} />
  </svg>
);

export const SnapMonogram = ({ size = 32, className = "" }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 6 L16 26" strokeWidth={1} opacity={0.3} />
    <circle cx="16" cy="16" r="8" />
    <path d="M10 16 Q16 10 22 16 Q16 22 10 16" />
    <circle cx="22" cy="16" r="1.5" fill="currentColor" />
  </svg>
);