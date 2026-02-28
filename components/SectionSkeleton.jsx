"use client";

export default function SectionSkeleton({ height = 200 }) {
  return (
    <div
      className="w-full rounded-lg bg-[#1a2741] overflow-hidden relative"
      style={{ minHeight: height }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_1.2s_infinite]"></div>
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
