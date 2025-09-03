"use client";
import { X } from "lucide-react";

export default function ModalWrapper({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-lg bg-opacity-50 flex items-center justify-center p-2 md:p-4 z-99">
      <div className="relative bg-[#1f2937] rounded-lg overflow-y-auto noscrollbar max-w-2xl max-h-[80vh] md:max-h-[90vh] w-full p-6 border border-gray-700">
     
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <X className="h-5 w-5" />
        </button>

        <div onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
}
