"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Jump = { id: number };

const stars = [
  { left: "8%", top: "6%", size: 3, delay: "0s" },
  { left: "22%", top: "14%", size: 2, delay: "1.2s" },
  { left: "35%", top: "5%", size: 2, delay: "2.1s" },
  { left: "48%", top: "11%", size: 3, delay: "0.6s" },
  { left: "62%", top: "4%", size: 2, delay: "1.8s" },
  { left: "88%", top: "16%", size: 2, delay: "0.3s" },
  { left: "12%", top: "22%", size: 2, delay: "2.6s" },
  { left: "42%", top: "20%", size: 2, delay: "1.5s" },
  { left: "70%", top: "24%", size: 3, delay: "0.9s" },
  { left: "93%", top: "7%", size: 2, delay: "2.3s" },
  { left: "28%", top: "30%", size: 2, delay: "0.4s" },
  { left: "55%", top: "28%", size: 2, delay: "1.1s" },
  { left: "80%", top: "33%", size: 2, delay: "2.8s" },
  { left: "5%", top: "36%", size: 2, delay: "1.7s" },
  { left: "16%", top: "45%", size: 2, delay: "0.8s" },
  { left: "90%", top: "44%", size: 2, delay: "2.0s" },
];

function SheepSvg() {
  return (
    <svg viewBox="0 0 120 92" width="82" height="63" aria-hidden="true">
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
        <ellipse cx="83" cy="28" rx="6" ry="3.5" fill="#5c4c43" transform="rotate(-30 83 28)" />
        <circle cx="92" cy="22" r="8" fill="#f6f1e3" />
        <circle cx="96" cy="35" r="1.8" fill="#20232e" />
        <circle cx="99" cy="41" r="1.2" fill="#8a776c" />
      </g>
    </svg>
  );
}

function FenceSvg() {
  return (
    <svg viewBox="0 0 130 72" width="118" height="65" aria-hidden="true">
      <g fill="#6e5847">
        <rect x="10" y="4" width="9" height="68" rx="4" />
        <rect x="60" y="4" width="9" height="68" rx="4" />
        <rect x="110" y="4" width="9" height="68" rx="4" />
        <rect x="0" y="18" width="130" height="8" rx="4" fill="#7d6552" />
        <rect x="0" y="42" width="130" height="8" rx="4" fill="#7d6552" />
      </g>
    </svg>
  );
}

const JUMP_DURATION_MS = 2800;

export function SheepCounter() {
  const [count, setCount] = useState(0);
  const [jumps, setJumps] = useState<Jump[]>([]);
  const nextId = useRef(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const handleCount = useCallback(() => {
    setCount((c) => c + 1);
    const id = nextId.current++;
    setJumps((js) => [...js, { id }]);
    timers.current.push(
      setTimeout(() => {
        setJumps((js) => js.filter((j) => j.id !== id));
      }, JUMP_DURATION_MS + 200),
    );
  }, []);

  return (
    <div className="sheep-screen">
      {/* よぞら */}
      {stars.map((s, i) => (
        <span
          key={i}
          className="star"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
          }}
        />
      ))}
      <svg className="moon" viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
        <path
          d="M46 6a26 26 0 1 0 12 34A22 22 0 0 1 46 6z"
          fill="#f3e3ac"
        />
      </svg>

      {/* カウンター */}
      <div className="counter" aria-live="polite">
        <p className="counter-label">きょう こえたひつじ</p>
        <p className="counter-number">
          {count}
          <span className="counter-unit">ひき</span>
        </p>
      </div>

      {/* 丘と柵とひつじ */}
      <div className="hill hill-back" />
      <div className="hill hill-front" />
      <div className="fence">
        <FenceSvg />
      </div>
      {jumps.map((j) => (
        <div key={j.id} className="sheep-track">
          <div className="sheep-jump">
            <SheepSvg />
          </div>
        </div>
      ))}

      {/* ボタン */}
      <div className="controls">
        <button type="button" className="count-button" onClick={handleCount}>
          ひつじを数える
        </button>
        <p className="controls-note">そっと押して、ひつじを見送りましょう</p>
      </div>

      <style jsx>{`
        .sheep-screen {
          position: fixed;
          inset: 0;
          z-index: 50;
          overflow: hidden;
          background: linear-gradient(#0d1230 0%, #161c44 55%, #232a56 100%);
          color: #f2ead9;
          user-select: none;
        }
        .star {
          position: absolute;
          border-radius: 9999px;
          background: #e9e2c8;
          animation: twinkle 3.4s ease-in-out infinite;
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.25;
          }
          50% {
            opacity: 0.9;
          }
        }
        .moon {
          position: absolute;
          top: 7%;
          right: 10%;
          filter: drop-shadow(0 0 14px rgba(243, 227, 172, 0.45));
        }
        .counter {
          position: absolute;
          top: 21%;
          left: 0;
          right: 0;
          text-align: center;
        }
        .counter-label {
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          opacity: 0.7;
        }
        .counter-number {
          margin-top: 0.4rem;
          font-size: 3.4rem;
          font-weight: 700;
          line-height: 1;
        }
        .counter-unit {
          margin-left: 0.3rem;
          font-size: 1.1rem;
          font-weight: 400;
          opacity: 0.8;
        }
        .hill {
          position: absolute;
          left: -20%;
          width: 140%;
          border-radius: 50% 50% 0 0 / 100% 100% 0 0;
        }
        .hill-back {
          bottom: 14%;
          height: 22%;
          background: #1f2650;
        }
        .hill-front {
          bottom: 0;
          height: 24%;
          background: #272f5e;
        }
        .fence {
          position: absolute;
          bottom: 21%;
          left: 50%;
          transform: translateX(-50%);
          line-height: 0;
        }
        .sheep-track {
          position: absolute;
          bottom: 22%;
          left: 0;
          line-height: 0;
          animation: sheep-run 2.8s linear forwards;
          will-change: transform;
          pointer-events: none;
        }
        @keyframes sheep-run {
          from {
            transform: translateX(-100px);
          }
          to {
            transform: translateX(105vw);
          }
        }
        .sheep-jump {
          animation: sheep-jump 2.8s ease-in-out forwards;
        }
        @keyframes sheep-jump {
          0%,
          8%,
          16%,
          24%,
          32% {
            transform: translateY(0);
          }
          4%,
          12%,
          20%,
          28% {
            transform: translateY(-4px);
          }
          50% {
            transform: translateY(-86px) rotate(-7deg);
          }
          68%,
          76%,
          84%,
          92%,
          100% {
            transform: translateY(0);
          }
          72%,
          80%,
          88%,
          96% {
            transform: translateY(-4px);
          }
        }
        .controls {
          position: absolute;
          bottom: 6%;
          left: 0;
          right: 0;
          text-align: center;
        }
        .count-button {
          padding: 1.1rem 3.2rem;
          border-radius: 9999px;
          background: #f2ead9;
          color: #262d55;
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          box-shadow: 0 6px 22px rgba(0, 0, 0, 0.35);
          touch-action: manipulation;
          transition: transform 0.12s ease, box-shadow 0.12s ease;
        }
        .count-button:active {
          transform: scale(0.95);
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.35);
        }
        .controls-note {
          margin-top: 0.9rem;
          font-size: 0.75rem;
          letter-spacing: 0.12em;
          opacity: 0.55;
        }
        @media (prefers-reduced-motion: reduce) {
          .star {
            animation: none;
            opacity: 0.6;
          }
          .sheep-track {
            animation-duration: 1.2s;
          }
          .sheep-jump {
            animation-duration: 1.2s;
          }
        }
      `}</style>
    </div>
  );
}
