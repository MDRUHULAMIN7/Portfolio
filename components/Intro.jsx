"use client";

import { useEffect, useState } from "react";

export default function Intro({ onFinish }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish && onFinish();
    }, 1200);
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!show) return null;

  return (
    <div className="intro-overlay">
      <div className="book-stage">
        <div className="book-left" />
        <div className="book-right" />
        <div className="intro-content">
          <h1 className="intro-title">Md. Ruhul Amin</h1>
          <p className="intro-sub">Frontend Developer</p>
        </div>
      </div>

      <style jsx>{`
        .intro-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 1000;
          background: radial-gradient(
            1200px circle at 50% 50%,
            #0f1b2d 0%,
            #0d1622 60%,
            #0b1320 100%
        .book-stage {
          position: relative;
          width: min(800px, 88vw);
          height: min(360px, 42vh);
          perspective: 1000px;
        }
        .book-left,
        .book-right {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          backface-visibility: hidden;
          will-change: transform;
          border-radius: 12px;
        }
        .book-left {
          left: 0;
          transform-origin: left center;
          background: linear-gradient(
            135deg,
            rgba(34, 211, 238, 0.25),
            rgba(59, 130, 246, 0.15)
          );
          border-right: 1px solid rgba(255, 255, 255, 0.06);
          animation: bookOpenLeft 900ms ease-out forwards 120ms;
        }
        .book-right {
          right: 0;
          transform-origin: right center;
          background: linear-gradient(
            225deg,
            rgba(34, 211, 238, 0.25),
            rgba(59, 130, 246, 0.15)
          );
          border-left: 1px solid rgba(255, 255, 255, 0.06);
          animation: bookOpenRight 900ms ease-out forwards 120ms;
        }
        .intro-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #e5e7eb;
          user-select: none;
        }
        .intro-title {
          font-size: clamp(28px, 6vw, 42px);
          font-weight: 800;
          letter-spacing: 0.6px;
          margin: 0;
          background: linear-gradient(90deg, #22d3ee, #60a5fa);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          transform: translateY(4px);
          opacity: 0;
          animation: titleReveal 700ms ease-out forwards 280ms;
        }
        .intro-sub {
          font-size: clamp(14px, 3.5vw, 18px);
          margin-top: 8px;
          color: #cbd5e1;
          opacity: 0;
          transform: translateY(6px);
          animation: subReveal 700ms ease-out forwards 380ms;
        }
        @keyframes bookOpenLeft {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(-92deg);
          }
        }
        @keyframes bookOpenRight {
          0% {
            transform: rotateY(0deg);
          }
          100% {
            transform: rotateY(92deg);
          }
        }
        @keyframes titleReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes subReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
