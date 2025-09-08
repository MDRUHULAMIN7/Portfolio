
"use client";
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

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

  return (
    <>
      {visible && (
        <div className="fixed bottom-4 right-4 flex flex-col items-center z-50">
          <button
            onClick={scrollToTop}
            className="bg-gray-900 border-2 border-cyan-400 text-cyan-400 p-2 sm:p-4 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-cyan-400/50"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="w-5 h-5 " />

          </button>
          <span className="mt-2 text-xs md:text-sm text-cyan-400 font-mono">
            {scrollPercent}%
          </span>
        </div>
      )}
    </>
  );
}