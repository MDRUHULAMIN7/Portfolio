'use client';

import { useEffect, useState } from 'react';

function Loading() {
  return (
    <div className="z-50 flex items-center justify-center bg-[#0d1622] h-screen">
      <div className="flex gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-cyan-400 shadow-[0_0_15px_5px_#00ffff] animate-bounce"
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '0.8s',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function DelayedContent({ children,time }) {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    },time || 0); 

    return () => clearTimeout(timer);
  }, []);

  if (showLoading) return <Loading />;
  return <>{children}</>;
}
