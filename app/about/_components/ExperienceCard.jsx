"use client";
import { useState } from "react";
import Image from "next/image";
import CardWrapper from "@/components/CardWrapper";
import ProjectSlide from "@/app/projects/_components/ProjectSlide";
import { X } from "lucide-react";

export default function ExperienceCard({ experiences }) {
  const [selectedExp, setSelectedExp] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        {experiences.map((exp) => (
          <CardWrapper key={exp.id} className="relative">
          
            {/* Header */}
            <div className="flex items-center gap-x-2 sm:gap-4 p-2 sm:p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="w-20 h-20 rounded-full border-2 border-gray-500 shadow-md overflow-hidden flex-shrink-0">
                <Image
                  src={exp.logo}
                  alt={exp.company}
                  width={56}
                  height={56}
                  className="object-cover rounded-full mx-auto p-2"
                />
              </div>
              <div className="">
                <h2 className="font-bold sm:text-lg text-gray-900 dark:text-white">
                  {exp.designation}
                </h2>
                <p className="text-gray-500 dark:text-gray-300 text-sm">
                  {exp.company} · <span className="italic">{exp.type}</span>
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 py-4 text-left">
              <span
                className={`inline-block px-3 py-1 text-xs rounded-full font-medium mb-3
                  ${
                    exp.status === "Ongoing"
                      ? "bg-cyan-400 text-white"
                      : exp.status === "Completed"
                      ? "bg-green-400 text-white"
                      : "bg-red-400 text-white"
                  }`}
              >
                {exp.status}
              </span>

              <div className="text-gray-400 text-xs mb-3">
                {new Date(exp.startDate).toLocaleDateString()} –{" "}
                {exp.endDate
                  ? new Date(exp.endDate).toLocaleDateString()
                  : "Present"}
              </div>

              <p className="text-gray-700 text-left dark:text-gray-200 text-sm leading-relaxed mb-4">
                {exp.opinion}
              </p>

              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedExp(exp)}
                  className="px-4 py-2  text-cyan-400 text-sm  hover:text-cyan-600 transition"
                >
                  Explore More
                </button>
              </div>
            </div>
          </CardWrapper>
        ))}
      </div>

      {/* Custom Modal */}
      {selectedExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center mx-2">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedExp(null)}
          ></div>
    {/* Close button */}
          
          {/* Modal content */}
          <div className="relative bg-gray-900 rounded-xl shadow-lg max-w-3xl h-[80vh] w-full sm:p-6 p-3 noscrollbar  overflow-y-auto "> 
              <div className="flex justify-end">
              <button
                onClick={() => setSelectedExp(null)}
                className=" text-cyan-400 rounded-lg hover:text-cyan-600"

              >
                <X className="w-6 sm:w-7 h-6 sm:h-7"  />

              </button>
            </div>
            <h2 className="text-xl font-bold text-left text-white mb-2">
              {selectedExp.designation} @ {selectedExp.company}
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              {selectedExp.type} ·{" "}
              {new Date(selectedExp.startDate).toLocaleDateString()} –{" "}
              {selectedExp.endDate
                ? new Date(selectedExp.endDate).toLocaleDateString()
                : "Present"}
            </p>

            <p className="text-gray-200 mb-4 text-left">
              {selectedExp.opinion}
            </p>
  <div className="  w-[100%] md:w-[80%] h-72 md:h-80 ">


            {/* Images */}
            <p className="text-lg text-left text-cyan-400 mb-3">Memories..</p>
            {selectedExp.images?.length > 0 && (
            
                <ProjectSlide images={selectedExp?.images} />
            
            )}
  
              </div>
          
          </div>
        </div>
      )}
    </>
  );
}
