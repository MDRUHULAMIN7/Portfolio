'use client';
import { useRef, useState, useEffect } from 'react';

const ServiceCard = ({ title, description, icon,index }) => {
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const [transform, setTransform] = useState('none');
  const [hoverPos, setHoverPos] = useState({ x: 50, y: 50 });


  useEffect(() => {
    if (iconRef.current && cardRef.current) {
      const iconRect = iconRef.current.getBoundingClientRect();
      const cardRect = cardRef.current.getBoundingClientRect();

      const iconCenterX = iconRect.left + iconRect.width / 4;
      const iconCenterY = iconRect.top + iconRect.height / 4;

      const x = ((iconCenterX - cardRect.left) / cardRect.width) * 100;
      const y = ((iconCenterY - cardRect.top) / cardRect.height) * 100;

      setHoverPos({ x, y });
    }
  }, []);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setHoverPos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = e.clientX - rect.left - centerX;
    const deltaY = e.clientY - rect.top - centerY;

    const rotateX = (-deltaY / centerY) * 8;
    const rotateY = (deltaX / centerX) * 8;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  };

  return (
    <div
     

      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl p-6 overflow-hidden border border-gray-700 bg-[#1a1a1a] shadow-md transition-transform duration-300"
      style={{
        transform,
        transition: 'transform 1s ease-out',
      }}
    >

      <div
        className="absolute inset-0 z-0 pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(circle at ${hoverPos.x}% ${hoverPos.y}%, 	rgba(59,130,246,0.2), transparent 60%)`,
        }}
      />

      {/* Content */}
      <div
   
 data-aos="zoom-in"
  data-aos-delay={200}

       className="relative z-10">
        <div ref={iconRef} className="mb-4">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-lg text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
