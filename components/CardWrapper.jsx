'use client';
import { useRef, useState, useEffect } from 'react';

export default function CardWrapper({ children, hoverGradient = 'rgba(59,130,246,0.2)' ,className}) {

  const cardRef = useRef(null);
  const rectRef = useRef(null);
  const [transform, setTransform] = useState('none');
  const [hoverPos, setHoverPos] = useState({ x: 10, y: 10 });

  useEffect(() => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  }, []);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e) => {
    const rect = rectRef.current || cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 80;
    const y = ((e.clientY - rect.top) / rect.height) * 80;
    setHoverPos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = e.clientX - rect.left - centerX;
    const deltaY = e.clientY - rect.top - centerY;

    const rotateX = (-deltaY / centerY) * 4;
    const rotateY = (deltaX / centerX) * 4;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform('none');
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-2xl ${className} overflow-hidden border border-gray-700 bg-[#1a1a1a] shadow-md transition-transform duration-300`}

      style={{ transform, transition: 'transform 0.3s ease-out', willChange: 'transform' }}
    >
      {/* Radial hover effect */}
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(circle at ${hoverPos.x}% ${hoverPos.y}%, ${hoverGradient}, transparent 60%)`,
        }}
      />
      {/* Actual content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
