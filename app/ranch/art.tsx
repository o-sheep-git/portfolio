/* もこもこ牧場の手描きSVGパーツ。
   ひつじカウンター(/sheep)とおなじ世界の、ひるまの牧場です */

export function SheepSvg({ width = 46 }: { width?: number }) {
  return (
    <svg
      viewBox="0 0 120 92"
      width={width}
      height={(width / 120) * 92}
      aria-hidden="true"
    >
      {/* あし */}
      <g stroke="#4d4038" strokeWidth="5" strokeLinecap="round">
        <line x1="42" y1="62" x2="39" y2="84" />
        <line x1="56" y1="65" x2="56" y2="86" />
        <line x1="74" y1="62" x2="77" y2="84" />
      </g>
      {/* もこもこの体 */}
      <g fill="#f6f1e3">
        <circle cx="38" cy="46" r="17" />
        <circle cx="56" cy="52" r="18" />
        <circle cx="74" cy="46" r="17" />
        <circle cx="46" cy="33" r="15" />
        <circle cx="66" cy="33" r="15" />
        <circle cx="56" cy="27" r="14" />
      </g>
      {/* しっぽ */}
      <circle cx="24" cy="42" r="7" fill="#f6f1e3" />
      {/* かお */}
      <g>
        <ellipse cx="93" cy="36" rx="13" ry="12" fill="#5c4c43" />
        <ellipse
          cx="83"
          cy="28"
          rx="6"
          ry="3.5"
          fill="#5c4c43"
          transform="rotate(-30 83 28)"
        />
        <circle cx="92" cy="22" r="8" fill="#f6f1e3" />
        <circle cx="96" cy="35" r="1.8" fill="#20232e" />
        <circle cx="99" cy="41" r="1.2" fill="#8a776c" />
      </g>
    </svg>
  );
}

export function ChickSvg({ width = 30 }: { width?: number }) {
  return (
    <svg
      viewBox="0 0 90 92"
      width={width}
      height={(width / 90) * 92}
      aria-hidden="true"
    >
      {/* あし */}
      <g stroke="#e0913d" strokeWidth="4" strokeLinecap="round">
        <line x1="38" y1="70" x2="36" y2="87" />
        <line x1="53" y1="70" x2="55" y2="87" />
      </g>
      {/* からだ */}
      <circle cx="45" cy="48" r="27" fill="#f8da55" />
      {/* はね */}
      <ellipse cx="29" cy="52" rx="10" ry="14" fill="#eec93f" />
      {/* あたまの毛 */}
      <path d="M42 22 q3 -8 8 -6 q-2 2 -1 5 q4 -4 8 -1 q-4 1 -5 5z" fill="#eec93f" />
      {/* くちばし */}
      <path d="M71 44 l10 4 -10 5z" fill="#e0913d" />
      {/* め */}
      <circle cx="60" cy="40" r="2.4" fill="#20232e" />
      {/* ほっぺ */}
      <circle cx="63" cy="50" r="3.5" fill="#f0ac66" opacity="0.75" />
    </svg>
  );
}

export function SunSvg({ width = 54 }: { width?: number }) {
  return (
    <svg viewBox="0 0 72 72" width={width} height={width} aria-hidden="true">
      <g stroke="#f3cf6d" strokeWidth="4" strokeLinecap="round" opacity="0.85">
        <line x1="36" y1="6" x2="36" y2="14" />
        <line x1="36" y1="58" x2="36" y2="66" />
        <line x1="6" y1="36" x2="14" y2="36" />
        <line x1="58" y1="36" x2="66" y2="36" />
        <line x1="15" y1="15" x2="21" y2="21" />
        <line x1="51" y1="51" x2="57" y2="57" />
        <line x1="15" y1="57" x2="21" y2="51" />
        <line x1="51" y1="21" x2="57" y2="15" />
      </g>
      <circle cx="36" cy="36" r="17" fill="#f6d47c" />
    </svg>
  );
}

export function CloudSvg({ width = 110 }: { width?: number }) {
  return (
    <svg
      viewBox="0 0 120 44"
      width={width}
      height={(width / 120) * 44}
      aria-hidden="true"
    >
      <g fill="#ffffff" opacity="0.92">
        <ellipse cx="34" cy="28" rx="26" ry="13" />
        <ellipse cx="64" cy="21" rx="30" ry="15" />
        <ellipse cx="93" cy="30" rx="22" ry="11" />
      </g>
    </svg>
  );
}

export function HutSvg({ width = 74 }: { width?: number }) {
  return (
    <svg
      viewBox="0 0 110 92"
      width={width}
      height={(width / 110) * 92}
      aria-hidden="true"
    >
      {/* かべ */}
      <rect x="22" y="44" width="66" height="42" rx="5" fill="#efe0bd" />
      {/* やね */}
      <path d="M6 48 L55 10 L104 48 Z" fill="#c47f5a" />
      <rect x="14" y="44" width="82" height="8" rx="4" fill="#a9714f" />
      {/* とびら */}
      <rect x="38" y="60" width="18" height="26" rx="8" fill="#8a6a52" />
      {/* まるまど */}
      <circle cx="72" cy="66" r="6" fill="#cfe3ef" stroke="#a9714f" strokeWidth="2.5" />
    </svg>
  );
}

export function FenceSvg({ width = 88 }: { width?: number }) {
  return (
    <svg
      viewBox="0 0 130 72"
      width={width}
      height={(width / 130) * 72}
      aria-hidden="true"
    >
      <g fill="#8a6f58">
        <rect x="10" y="4" width="9" height="68" rx="4" />
        <rect x="60" y="4" width="9" height="68" rx="4" />
        <rect x="110" y="4" width="9" height="68" rx="4" />
        <rect x="0" y="18" width="130" height="8" rx="4" fill="#9b7f66" />
        <rect x="0" y="42" width="130" height="8" rx="4" fill="#9b7f66" />
      </g>
    </svg>
  );
}

/* ---- ここから下は、UIで使うちいさなアイコン ---- */

type IconProps = { size?: number };

export function CoinIcon({ size = 18 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="#f0c454" stroke="#cf9f3a" strokeWidth="2" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="10"
        fontWeight="700"
        fill="#8a6420"
      >
        G
      </text>
    </svg>
  );
}

export function GrassIcon({ size = 18 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <g stroke="#5f9e4c" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M7 20 C7 15 5 13 5.5 9" />
        <path d="M12 20 C12 14 12 12 12 7" />
        <path d="M17 20 C17 15 19 13 18.5 9" />
      </g>
    </svg>
  );
}

export function YarnIcon({ size = 18 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="#f6f1e3" stroke="#c9b8a4" strokeWidth="2" />
      <g stroke="#c9b8a4" strokeWidth="1.6" fill="none">
        <path d="M4.5 9.5 Q12 13.5 19.5 9.5" />
        <path d="M4.5 14.5 Q12 18.5 19.5 14.5" />
      </g>
    </svg>
  );
}

export function SheepFaceIcon({ size = 18 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <circle cx="12" cy="13.5" r="7.5" fill="#5c4c43" />
      <circle cx="6.5" cy="9.5" r="3" fill="#f6f1e3" />
      <circle cx="17.5" cy="9.5" r="3" fill="#f6f1e3" />
      <circle cx="12" cy="7" r="5.5" fill="#f6f1e3" />
      <circle cx="9.5" cy="14" r="1.1" fill="#20232e" />
      <circle cx="14.5" cy="14" r="1.1" fill="#20232e" />
    </svg>
  );
}

export function BrushIcon({ size = 22 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <rect x="2.5" y="9.5" width="9" height="5" rx="2.5" fill="#a9714f" />
      <rect x="10" y="7.5" width="10" height="8.5" rx="2.5" fill="#8a6f58" />
      <g stroke="#e8d5b5" strokeWidth="1.8" strokeLinecap="round">
        <line x1="12.5" y1="16.5" x2="12.5" y2="19.5" />
        <line x1="15.2" y1="16.5" x2="15.2" y2="19.5" />
        <line x1="17.9" y1="16.5" x2="17.9" y2="19.5" />
      </g>
    </svg>
  );
}

export function FenceIcon({ size = 22 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <rect x="5" y="4.5" width="3.6" height="15.5" rx="1.8" fill="#8a6f58" />
      <rect x="15.4" y="4.5" width="3.6" height="15.5" rx="1.8" fill="#8a6f58" />
      <rect x="2" y="8" width="20" height="3" rx="1.5" fill="#9b7f66" />
      <rect x="2" y="14" width="20" height="3" rx="1.5" fill="#9b7f66" />
    </svg>
  );
}

export function SignIcon({ size = 22 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <rect x="10.8" y="9" width="2.4" height="12" rx="1.2" fill="#8a6f58" />
      <rect
        x="4"
        y="3"
        width="16"
        height="9"
        rx="2"
        fill="#efe0bd"
        stroke="#a9714f"
        strokeWidth="1.6"
      />
      <path
        d="M12 6 c0.9 -1.5 3.1 -0.5 2.7 1 c-0.3 1.1 -1.8 2 -2.7 2.5 c-0.9 -0.5 -2.4 -1.4 -2.7 -2.5 c-0.4 -1.5 1.8 -2.5 2.7 -1z"
        fill="#d98cab"
      />
    </svg>
  );
}

export function HayIcon({ size = 22 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <path d="M4 19.5 a8 8 0 0 1 16 0z" fill="#e6c76e" />
      <g stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round" fill="none">
        <path d="M8 18.5 q0 -4 1.5 -6" />
        <path d="M12 18.5 q0 -5 0 -7" />
        <path d="M16 18.5 q0 -4 -1.5 -6" />
      </g>
    </svg>
  );
}

export function TreatIcon({ size = 22 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" fill="#e0aa64" stroke="#c48c48" strokeWidth="1.5" />
      <circle cx="9" cy="10" r="1.4" fill="#8a5a33" />
      <circle cx="14.5" cy="9.5" r="1.3" fill="#8a5a33" />
      <circle cx="10.5" cy="14.5" r="1.3" fill="#8a5a33" />
      <circle cx="15" cy="14" r="1.4" fill="#8a5a33" />
    </svg>
  );
}
