'use client';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

const SkillCard = ({skill,index}) => {
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
      className="group relative rounded-2xl  lg:p-8 overflow-hidden border border-gray-700 bg-[#1a1a1a] shadow-md transition-transform duration-300"
      style={{
        transform,
        transition: 'transform 0.3s ease-out',
      }}
    >

      <div
        className="absolute inset-0 z-0 pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(circle at ${hoverPos.x}% ${hoverPos.y}%, ${skill?.bgHover}	`,
        }}
      />

       <div
  key={skill.id}
  data-aos="zoom-in"
  data-aos-delay={index * 100}
  className={`relative   transition-all duration-300 `}
>
 
    <Image

      height={200}
      width={300}
      src={skill.icon}
      alt={`${skill.title} icon`}
      className="w-18 h-18 object-contain mx-auto mb-4 drop-shadow-md"
    />
    <h3 className={`${skill.color} text-center text-xl font-semibold tracking-wider uppercase`}>
      {skill.title}
    </h3>
  </div>

    </div>
  )
}

export default SkillCard