"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import LoadingUi from "./loadings/LoadingUi";

export default function ModalWrapper({ isOpen, onClose, children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);
 useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; //
    };
  }, [isOpen]);
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-lg bg-opacity-50 flex items-center justify-center p-2 md:p-4 z-[99]"
      onClick={onClose} 
    >
      <div
        className="relative bg-[#1f2937] rounded-lg overflow-y-auto noscrollbar max-w-2xl lg:max-w-5xl max-h-[80vh] md:max-h-[90vh] w-full sm:p-6 border border-gray-700"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Content */}
        {isLoading ? <LoadingUi /> : children}
      </div>
    </div>
  );
}
