"use client";
import { useRef, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const EducationCard = ({ edu }) => {
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const [transform, setTransform] = useState("none");
  const [hoverPos, setHoverPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    AOS.init({ duration: 300, once: false });
  }, []);
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

    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    );
  };

  const handleMouseLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl p-6 lg:p-10 overflow-hidden border border-gray-700 bg-[#1a1a1a] shadow-md transition-transform duration-300"
      style={{
        transform,
        transition: "transform 0.3s ease-out",
      }}
    >
      <div
        className="absolute inset-0 z-0 pointer-events-none transition-all duration-700 ease-out"
        style={{
          background: `radial-gradient(circle at ${hoverPos.x}% ${hoverPos.y}%, 	rgba(59,130,246,0.2), transparent 60%)`,
        }}
      />

      <div data-aos="fade-up" className="relative z-10">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg  md:text-3xl  font-bold text-gray-200">
            {edu.title}
          </h3>
          <span className="text-sm px-3 py-2 rounded-full bg-cyan-700 text-gray-200 shadow">
            {edu.result}
          </span>
        </div>

        <p className="text-lg text-gray-300 mb-3">
          {edu.Institute} <span className="text-white ">({edu.stage})</span>
        </p>

        <hr className="border-[#2c3e57] mb-3 text-lg" />

        <p className="text-base text-gray-300 leading-relaxed">
          {edu.description}
        </p>
      </div>
    </div>
  );
};

export default EducationCard;
