"use client";
import { X } from "lucide-react";
import ProjectSlide from "@/app/projects/_components/ProjectSlide";
import { useEffect } from "react";

export default function ExperienceModal({ exp, onClose }) {
      useEffect(() => {
    if (exp) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [exp]);

  if (!exp) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center mx-2">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>

      {/* Modal content */}
      <div className="relative bg-gray-900 rounded-xl shadow-lg max-w-3xl h-[80vh] w-full sm:p-6 p-3 noscrollbar overflow-y-auto">
        {/* Close button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-cyan-400 rounded-lg hover:text-cyan-600"
          >
            <X className="w-6 sm:w-7 h-6 sm:h-7" />
          </button>
        </div>

        <h2 className="text-xl font-bold text-left text-white mb-2">
          {exp.designation} @ {exp.company}
        </h2>
        <p className="text-sm text-gray-400 mb-4">
          {exp.type} ·{" "}
          {new Date(exp.startDate).toLocaleDateString()} –{" "}
          {exp.endDate
            ? new Date(exp.endDate).toLocaleDateString()
            : "Present"}
        </p>

        <p className="text-gray-200 mb-4 text-left">
          {exp.opinion}
        </p>

        {/* Images */}
        <div className="w-[100%] md:w-[80%] h-72 md:h-80">
          <p className="text-lg text-left text-cyan-400 mb-3">Memories..</p>
          {exp.images?.length > 0 && (
            <ProjectSlide images={exp.images} />
          )}
        </div>
      </div>
    </div>
  );
}
