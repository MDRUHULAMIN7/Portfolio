"use client";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercent(Math.round(scrolled));

      setVisible(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Calculate the circumference for the progress circle
  const radius = 28; // Adjust based on your button size
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <>
      {visible && (
        <div className="fixed bottom-4 right-4 flex flex-col items-center z-50">
          <div className="relative">
            {/* Progress Circle SVG */}
            <svg
              className="absolute inset-0 w-full h-full transform -rotate-90"
              width="64"
              height="64"
            >
              {/* Background circle */}
              <circle
                cx="32"
                cy="32"
                r={radius}
                stroke="rgb(56 189 248 / 0.3)"
                strokeWidth="2"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="32"
                cy="32"
                r={radius}
                stroke="rgb(56 189 248)"
                strokeWidth="2"
                fill="none"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-300 ease-out"
                strokeLinecap="round"
              />
            </svg>
            
            {/* Button */}
            <button
              onClick={scrollToTop}
              className="bg-gray-900 text-cyan-400 p-3 sm:p-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-cyan-400/50 relative z-10"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
          
          <span className="mt-2 text-xs md:text-sm text-cyan-400 font-mono">
            {scrollPercent}%
          </span>
        </div>
      )}
    </>
  );
}