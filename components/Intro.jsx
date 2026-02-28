"use client";

import { useEffect } from "react";

export default function Intro({ onFinish }) {
  const visibleMs = 1500;
  const exitMs = 500;
  useEffect(() => {
    const root = document.documentElement;
    try {
      if (
        localStorage.getItem("intro_seen_v3") === "1" ||
        localStorage.getItem("intro_seen_v2") === "1"
      ) {
        root.dataset.intro = "0";
        return;
      }
    } catch (e) {}

    if (root.dataset.intro !== "1") root.dataset.intro = "1";

    const timer = setTimeout(() => {
      try {
        localStorage.setItem("intro_seen_v3", "1");
        localStorage.setItem("intro_seen_v2", "1");
      } catch (e) {}
      root.dataset.intro = "0";
      onFinish?.();
    }, visibleMs + exitMs);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="intro-overlay" aria-hidden="true">
      <div className="grid" />

      {/* Curtains */}
      <div className="curtain curtain-top" />
      <div className="curtain curtain-bottom" />

      <div className="stage">
        {/* SVG mark */}
        <svg className="mark" viewBox="0 0 48 48" fill="none">
          <polygon
            className="mark-diamond"
            points="24,4 44,24 24,44 4,24"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <polygon
            className="mark-inner"
            points="24,13 35,24 24,35 13,24"
            strokeWidth="1.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle className="mark-dot" cx="24" cy="24" r="2" />
        </svg>

        <div className="rule" />

        <h1 className="name">
          <span className="name-text">Md. Ruhul Amin</span>
          <span className="name-shimmer" />
        </h1>

        <p className="role">
          <span className="role-dash" />
          <span className="role-label">Frontend Developer</span>
          <span className="role-dash" />
        </p>

        {/* Progress bar */}
        <div className="track">
          <div className="fill" />
          <div className="fill-glow" />
        </div>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;600&family=DM+Mono:wght@300&display=swap");

        /* ─── Overlay ─── */
        .intro-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #082233;
          animation: exitBreath ${exitMs}ms cubic-bezier(0.4, 0, 0.6, 1) forwards ${visibleMs}ms;
          will-change: opacity, transform;
        }

        /* ─── Subtle grid ─── */
        .grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(ellipse 60% 55% at 50% 50%, black, transparent);
          pointer-events: none;
        }

        /* ─── Curtains — exit only ─── */
        .curtain {
          position: absolute;
          left: 0;
          width: 100%;
          height: 50.5%;
          background: #06080f;
          z-index: 10;
          will-change: transform;
        }
        .curtain-top {
          top: 0;
          transform: translateY(-100%);
          animation: curtainExitTop ${exitMs}ms cubic-bezier(0.76, 0, 0.24, 1) forwards ${visibleMs}ms;
        }
        .curtain-bottom {
          bottom: 0;
          transform: translateY(100%);
          animation: curtainExitBottom ${exitMs}ms cubic-bezier(0.76, 0, 0.24, 1) forwards ${visibleMs}ms;
        }

        /* ─── Stage ─── */
        .stage {
          position: relative;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ─── Geometric mark ─── */
        .mark {
          width: 52px;
          height: 52px;
          margin-bottom: 26px;
          overflow: visible;
        }
        .mark-diamond {
          stroke: rgba(125, 211, 252, 0.75);
          fill: none;
          stroke-dasharray: 162;
          stroke-dashoffset: 162;
          animation: drawStroke 800ms cubic-bezier(0.22, 1, 0.36, 1) forwards 160ms;
        }
        .mark-inner {
          stroke: rgba(125, 211, 252, 0.32);
          fill: none;
          stroke-dasharray: 112;
          stroke-dashoffset: 112;
          animation: drawStroke 650ms cubic-bezier(0.22, 1, 0.36, 1) forwards 460ms;
        }
        .mark-dot {
          fill: #7dd3fc;
          opacity: 0;
          animation: dotAppear 300ms ease-out forwards 960ms;
        }

        /* ─── Rule ─── */
        .rule {
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(125,211,252,0.4), transparent);
          margin-bottom: 28px;
          animation: expandRule 650ms cubic-bezier(0.22, 1, 0.36, 1) forwards 680ms;
        }

        /* ─── Name ─── */
        .name {
          position: relative;
          overflow: hidden;
          margin: 0 0 18px;
          padding: 0 6px;
          font-family: "Cormorant Garamond", Georgia, serif;
          font-size: clamp(34px, 6.5vw, 62px);
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #dde6f0;
          line-height: 1.15;
          display: inline-block;
        }
        .name-text {
          display: block;
          opacity: 0;
          transform: translateY(20px);
          animation: slideUp 620ms cubic-bezier(0.22, 1, 0.36, 1) forwards 760ms;
        }
        .name-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            108deg,
            transparent 30%,
            rgba(255,255,255,0.22) 50%,
            transparent 70%
          );
          transform: translateX(-110%);
          animation: sweep 750ms ease-out forwards 1320ms;
        }

        /* ─── Role ─── */
        .role {
          display: flex;
          align-items: center;
          gap: 14px;
          margin: 0 0 42px;
          font-family: "DM Mono", "Courier New", monospace;
          font-size: clamp(10px, 1.9vw, 13px);
          font-weight: 300;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: #8ba0b8;
          opacity: 0;
          transform: translateY(10px);
          animation: slideUp 520ms ease-out forwards 920ms;
        }
        .role-dash {
          display: inline-block;
          width: 20px;
          height: 1px;
          background: rgba(125, 211, 252, 0.55);
          flex-shrink: 0;
        }
        .role-label {
          color: #8ba0b8;
        }

        /* ─── Progress track ─── */
        .track {
          position: relative;
          width: 110px;
          height: 1px;
          background: rgba(255,255,255,0.06);
          border-radius: 999px;
          opacity: 0;
          animation: fadeIn 250ms ease-out forwards 420ms;
        }
        .fill {
          position: absolute;
          inset: 0;
          width: 0%;
          background: linear-gradient(90deg, #38bdf8, #818cf8);
          border-radius: 999px;
          animation: fillProgress 2000ms cubic-bezier(0.4, 0, 0.2, 1) forwards 420ms;
        }
        .fill-glow {
          position: absolute;
          top: 50%;
          left: 0%;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #7dd3fc;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 8px 3px rgba(125, 211, 252, 0.55);
          opacity: 0;
          animation: glowMove 2000ms cubic-bezier(0.4, 0, 0.2, 1) forwards 420ms;
        }

        /* ─── Keyframes ─── */
        @keyframes curtainExitTop { to { transform: translateY(-120%); } }
        @keyframes curtainExitBottom { to { transform: translateY(120%); } }
        @keyframes drawStroke {
          to { stroke-dashoffset: 0; }
        }
        @keyframes dotAppear {
          from { opacity: 0; transform: scale(0.4); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes expandRule {
          to { width: clamp(200px, 34vw, 340px); }
        }
        @keyframes slideUp {
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes sweep {
          to { transform: translateX(230%); }
        }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        @keyframes fillProgress {
          to { width: 100%; }
        }
        @keyframes glowMove {
          0%   { opacity: 0;   left: 0%;   }
          8%   { opacity: 1;               }
          90%  { opacity: 1;               }
          100% { opacity: 0;   left: 100%; }
        }

        /* ─── Smooth exit ─── */
        @keyframes exitBreath {
          0%   { opacity: 1; transform: scale(1);     }
          25%  { opacity: 1; transform: scale(1.012); }
          100% { opacity: 0; transform: scale(1.045); pointer-events: none; }
        }

        /* ─── Reduced motion ─── */
        @media (prefers-reduced-motion: reduce) {
          .intro-overlay,
          .curtain-top, .curtain-bottom,
          .mark-diamond, .mark-inner, .mark-dot,
          .rule, .name-text, .name-shimmer,
          .role, .fill, .fill-glow {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
            stroke-dashoffset: 0 !important;
            width: 300px;
          }
        }
      `}</style>
    </div>
  );
}
