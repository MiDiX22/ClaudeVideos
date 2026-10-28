import type { CSSProperties } from "react";

type IconProps = { size: number; color: string; style?: CSSProperties };

const Svg: React.FC<IconProps & { children: React.ReactNode; strokeWidth?: number }> = ({
  size,
  color,
  style,
  children,
  strokeWidth = 2,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
  >
    {children}
  </svg>
);

export const LockIcon: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <rect x="4" y="11" width="16" height="10" rx="1" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    <path d="M12 15v2" />
  </Svg>
);

export const UsbIcon: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <rect x="7" y="9" width="10" height="13" rx="1" />
    <path d="M9 9V3h6v6" />
    <path d="M11 5.5h0M13 5.5h0" />
  </Svg>
);

export const RestoreIcon: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M3 12a9 9 0 1 0 3-6.7" />
    <path d="M3 4v5h5" />
    <path d="M12 8v4l3 2" />
  </Svg>
);

export const BoltIcon: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
  </Svg>
);

export const RebootIcon: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M20 12a8 8 0 1 1-2.3-5.7" />
    <path d="M20 3v5h-5" />
  </Svg>
);

export const PinIcon: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" />
    <circle cx="12" cy="10" r="2.5" />
  </Svg>
);

export const CheckIcon: React.FC<IconProps> = (p) => (
  <Svg {...p} strokeWidth={3}>
    <path d="M4 12.5l5 5L20 6.5" />
  </Svg>
);

export const WrenchIcon: React.FC<IconProps> = (p) => (
  <Svg {...p}>
    <path d="M14.7 6.3a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.7-7.7a4 4 0 0 1-2-2z" />
  </Svg>
);
